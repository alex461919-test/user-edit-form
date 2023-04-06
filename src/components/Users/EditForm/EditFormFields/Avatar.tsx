import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { UseFormReturn } from 'react-hook-form';
import { User } from 'src/types';

const AvatarField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    register,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label size="sm">Аватарка</Form.Label>
      <Form.Control size="sm" type="text" {...register('avatar', { required: false })} {...(errors.avatar ? { isInvalid: true } : null)} />
    </Form.Group>
  );
};

export default AvatarField;
