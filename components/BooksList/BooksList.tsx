import styles from './books-list.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import API from '../../libs/api';
import SearchForm from '../SearchForm';
import BookListItem from '../BooksListItem';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useRouter } from 'next/router';

export default function BooksList(): JSX.Element {
  const router = useRouter();
  const [books, setBooks] = useState<Book[] | null>(null);
  const [foundBooks, setFoundBooks] = useState<Book[]>([]);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [nothingFound, setNothingFound] = useState<boolean>(false);

  const onSearch = useCallback(
    (searchTerm) => {
      router.push(`/?s=${encodeURI(searchTerm)}`);
    },
    [router]
  );

  useEffect(() => {
    API.get('books')
      .then((books) => setBooks(books.data))
      .catch(() => setLoadingError(true));
  }, []);

  useEffect(() => {
    const searchTerm = router.query.s as string;
    if (!searchTerm) {
      setNothingFound(false);
      setFoundBooks([]);
      return;
    }
    if (books) {
      const searchTermRegExp = new RegExp(`(${searchTerm})`, 'gi');
      const foundBooks: Book[] = [];
      for (const book of books) {
        const bookDescription = book.description as string;
        const descriptionParts = bookDescription.split(searchTermRegExp);
        if (descriptionParts.length > 1) {
          const foundBook: Book = {
            ...book,
            highligtedDescription: (
              <p className={cn(styles['books-list__highlighted-text'])}>
                {descriptionParts.map((part, index) => {
                  if (part.toLowerCase() === searchTerm.toLowerCase()) {
                    return (
                      <mark
                        key={index}
                        className={cn(styles['books-list__mark'])}
                      >
                        {part}
                      </mark>
                    );
                  }
                  return <span key={index}>{part}</span>;
                })}
              </p>
            ),
          };
          foundBooks.push(foundBook);
        }
      }
      if (!foundBooks.length) {
        setNothingFound(true);
      } else {
        setFoundBooks(foundBooks);
        setNothingFound(false);
      }
    }
  }, [router.query.s, books]);

  if (loadingError) {
    return <h1>Something went wrong. Try reloading the page.</h1>;
  }

  if (books) {
    return (
      <div className={cn(styles['books-list'])}>
        <Link href="/">
          <a className={cn('button', styles['books-list__home-link'])}>Home</a>
        </Link>
        <Link href="new-book" shallow>
          <a className={cn('button', styles['books-list__new-book-link'])}>
            Add new book
          </a>
        </Link>
        <div className={cn(styles['books-list__search-form-container'])}>
          <SearchForm onSubmit={onSearch} />
        </div>
        <section>
          {nothingFound ? (
            <h1>Nothing found, try changing your search query.</h1>
          ) : foundBooks.length ? (
            foundBooks.map((book) => <BookListItem key={book.id} book={book} />)
          ) : books.length ? (
            books.map((book) => <BookListItem key={book.id} book={book} />)
          ) : (
            <h1>The library is empty.</h1>
          )}
        </section>
      </div>
    );
  }

  return <LoadingIndicator />;
}
