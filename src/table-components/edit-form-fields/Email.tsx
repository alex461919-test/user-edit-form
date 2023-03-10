import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { User } from '../../types';

const EmailField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    register,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label size="sm" className="required">
        Email
      </Form.Label>
      <Form.Control
        size="sm"
        type="email"
        //    placeholder="Введите email"
        {...register('email', { required: true })}
        {...(errors.email ? { isInvalid: true } : null)}
      />
    </Form.Group>
  );
};

export default EmailField;
