import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { User } from 'src/types';

const FirstNameField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    register,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label size="sm" className="required">
        Имя
      </Form.Label>
      <Form.Control
        size="sm"
        type="text"
        //    placeholder="Введите имя"
        {...register('firstName', { required: true })}
        {...(errors.firstName ? { isInvalid: true } : null)}
      />
    </Form.Group>
  );
};

export default FirstNameField;
