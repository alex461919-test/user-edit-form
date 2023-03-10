import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import { Controller, UseFormReturn } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { User } from '../../types';

registerLocale('ru', ru);

const BirthdayField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    control,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label size="sm" className="required">
        День рождения
      </Form.Label>
      <Controller
        name="birthdate"
        control={control}
        rules={{ required: true }}
        render={({ field: fields }) => {
          const { value, ..._fields } = fields;
          return (
            <Form.Control
              as={DatePicker}
              size="sm"
              type="text"
              {...(errors.birthdate ? { isInvalid: true } : null)}
              {..._fields}
              selected={value ? new Date(value) : null}
              locale="ru"
              dateFormat="dd.MM.yyyy"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          );
        }}
      />
    </Form.Group>
  );
};

export default BirthdayField;
