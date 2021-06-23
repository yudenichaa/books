import styles from './new-book-form.module.scss';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import API from '../../libs/api';
import uniqid from 'uniqid';

const newBookValidationSchema = Yup.object({
  title: Yup.string().trim().label('Title').required(),
  description: Yup.string().trim().label('Description').required(),
  publicationYear: Yup.number()
    .label('Publication year')
    .required()
    .positive()
    .integer()
    .max(new Date().getFullYear()),
});

const newBookInitialValues = {
  title: '',
  description: '',
  publicationYear: '',
};

export default function NewBook(): JSX.Element {
  const router = useRouter();

  const onAddingNewBook = useCallback(
    (values) => {
      values.id = uniqid();
      API.post('books', values)
        .then(() => {
          router.push('/');
        })
        .catch(() => {
          alert('Something went wrong. Try again later.');
        });
    },
    [router]
  );

  return (
    <Formik
      initialValues={newBookInitialValues}
      validationSchema={newBookValidationSchema}
      onSubmit={onAddingNewBook}
    >
      <Form className={cn(styles.form)}>
        <section className={cn(styles.form__group)}>
          <label className={cn(styles.form__label)} htmlFor="title">
            Title:
          </label>
          <Field className={cn('input')} name="title" type="text" />
          <ErrorMessage
            className={cn('error-message', styles['form__error-message'])}
            component="p"
            name="title"
          />
        </section>
        <section className={cn(styles.form__group)}>
          <label className={cn(styles.form__label)} htmlFor="description">
            Description:
          </label>
          <Field
            className={cn('input')}
            as="textarea"
            rows="10"
            name="description"
          />
          <ErrorMessage
            className={cn('error-message', styles['form__error-message'])}
            component="p"
            name="description"
          />
        </section>
        <section className={cn(styles.form__group)}>
          <label className={cn(styles.form__label)} htmlFor="publicationYear">
            Publication year:
          </label>
          <Field
            className={cn('input')}
            name="publicationYear"
            type="number"
            min="1"
          />
          <ErrorMessage
            className={cn('error-message', styles['form__error-message'])}
            component="p"
            name="publicationYear"
          />
        </section>
        <button
          className={cn('button', styles['form__submit-button'])}
          type="submit"
        >
          Add book
        </button>
      </Form>
    </Formik>
  );
}
