import styles from './books-list-item.module.scss';
import cn from 'classnames';
import Link from 'next/link';

interface IBooksListItem {
  book: Book;
}

export default function BooksListItem({ book }: IBooksListItem): JSX.Element {
  return (
    <article className={cn(styles.book)}>
      <h2>
        <Link href={`book/${book.id}`} shallow>
          <a className={cn(styles.book__title)}>{book.title}</a>
        </Link>
      </h2>
      {book.highligtedDescription}
      <time
        dateTime={book.publicationYear.toString()}
        className={cn(styles['book__publication-year'])}
      >
        Publication year: {book.publicationYear}
      </time>
    </article>
  );
}
