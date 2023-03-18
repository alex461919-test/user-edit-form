import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { User } from '../../types';

const LastNameField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    register,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label size="sm" className="required">
        Фамилия
      </Form.Label>
      <Form.Control
        size="sm"
        type="text"
        //   placeholder="Введите фамилию"
        {...register('lastName', { required: true })}
        {...(errors.lastName ? { isInvalid: true } : null)}
      />
    </Form.Group>
  );
};

export default LastNameField;
