import Head from 'next/head';
import NewBookForm from '../components/NewBookForm';

export default function NewBookPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Add new book</title>
      </Head>
      <main>
        <NewBookForm />
      </main>
    </>
  );
}
