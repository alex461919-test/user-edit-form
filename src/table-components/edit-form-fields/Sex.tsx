import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { User } from '../../types';

const SexField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    register,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Check
        inline
        label="Муж."
        type="radio"
        value="male"
        {...register('sex', { required: true })}
        {...(errors.sex ? { isInvalid: true } : null)}
      />
      <Form.Check
        inline
        label="Жен."
        type="radio"
        value="female"
        {...register('sex', { required: true })}
        {...(errors.sex ? { isInvalid: true } : null)}
      />
    </Form.Group>
  );
};

export default SexField;
