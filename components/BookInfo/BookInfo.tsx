import styles from './book-info.module.scss';
import cn from 'classnames';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import API from '../../libs/api';

interface IBookComponent {
  book: Book;
}

export default function Book({ book }: IBookComponent): JSX.Element {
  const router = useRouter();

  const onRemoveBook = useCallback(() => {
    API.delete(`books/${book.id}`)
      .then(() => {
        router.push('/');
      })
      .catch(() => {
        alert('Something went wrong. Try again later.');
      });
  }, [book.id, router]);

  return (
    <div className={cn(styles['book-info'])}>
      <article>
        <h2 className={cn(styles['book-info__title'])}>{book.title}</h2>
        <p className={cn(styles['book-info__description'])}>
          {book.description}
        </p>
        <time
          dateTime={book.publicationYear.toString()}
          className={cn(styles['book-info__publication-year'])}
        >
          Publication year: {book.publicationYear}
        </time>
      </article>
      <button
        className={cn('button', 'button_remove')}
        type="button"
        onClick={onRemoveBook}
      >
        Remove book
      </button>
    </div>
  );
}
