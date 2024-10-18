import { useId } from 'react';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { nanoid } from 'nanoid';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number must be at least 3 characters long')
    .max(50, 'Number cannot exceed 50 characters')
    .required('Number is required')
});

const initialValues = {
  name: '',
  number: ''
};

function ContactForm({ onAdd }) {
  const nameFieldId = useId();
  const numberFieldId = useId();

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number
    };

    onAdd(newContact);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={ContactSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formControl}>
          <label htmlFor={nameFieldId}>Name</label>

          <Field className={css.formInput} type="text" name="name" id={nameFieldId} />

          <ErrorMessage className={css.formError} name="name" component="span" />
        </div>

        <div className={css.formControl}>
          <label htmlFor={numberFieldId}>Number</label>

          <Field className={css.formInput} type="text" name="number" id={numberFieldId} />

          <ErrorMessage className={css.formError} name="number" component="span" />
        </div>

        <button className={css.submitBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
