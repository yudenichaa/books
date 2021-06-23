import Head from 'next/head';
import {
  GetStaticProps,
  GetStaticPropsResult,
  GetStaticPaths,
  GetStaticPathsResult,
} from 'next';
import { useRouter } from 'next/router';
import API from '../../libs/api';
import BookInfo from '../../components/BookInfo';
import LoadingIndicator from '../../components/LoadingIndicator';

interface IBookPage {
  book: Book | null;
}

export default function BookPage({ book }: IBookPage): JSX.Element {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading...</title>
        </Head>
        <main>
          <LoadingIndicator />
        </main>
      </>
    );
  }

  if (book) {
    return (
      <>
        <Head>
          <title>{book.title}</title>
        </Head>
        <main>
          <BookInfo book={book} />
        </main>
      </>
    );
  }

  return <h1>Something went wrong. Try reloading the page.</h1>;
}

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<IBookPage>> => {
  if (params?.id) {
    try {
      const book = await API.get(`books/${params.id}`);
      return {
        props: {
          book: book.data,
        },
        revalidate: 1,
      };
    } catch (error) {
      if (error?.response?.status === 404) return { notFound: true };
      return {
        props: {
          book: null,
        },
        revalidate: 1,
      };
    }
  }
  return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult> => {
  const books = await API.get('books');
  return {
    paths: books.data.map((book: Book) => ({
      params: {
        id: book.id,
      },
    })),
    fallback: true,
  };
};
