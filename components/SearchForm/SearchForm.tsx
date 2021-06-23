import styles from './search-form.module.scss';
import cn from 'classnames';
import { useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const searchTermValidationSchema = Yup.object({
  term: Yup.string().trim().label('Term').required(),
});

const searchFormInitialValues = {
  term: '',
};

interface ISearchForm {
  onSubmit: (term: string) => void;
}

export default function SearchForm({ onSubmit }: ISearchForm): JSX.Element {
  const onFormSubmit = useCallback((values) => onSubmit(values.term.trim()), [
    onSubmit,
  ]);

  return (
    <Formik
      initialValues={searchFormInitialValues}
      validationSchema={searchTermValidationSchema}
      onSubmit={onFormSubmit}
    >
      <Form className={cn(styles['search-form'])}>
        <div className={cn(styles['search-form__term-input-container'])}>
          <Field className={cn('input')} name="term" type="text" />
          <button
            className={cn('button', styles['search-form__submit-button'])}
            type="submit"
          >
            Search book
          </button>
        </div>
        <ErrorMessage
          className={cn('error-message', styles['search-form__error-message'])}
          component="p"
          name="term"
        />
      </Form>
    </Formik>
  );
}
