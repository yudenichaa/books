import Head from 'next/head';
import BooksList from '../components/BooksList';

export default function HomePage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <main>
        <BooksList />
      </main>
    </>
  );
}
