import React from 'react';
import { Form, FormGroupProps } from 'react-bootstrap';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { Controller, UseFormReturn } from 'react-hook-form';
import { User } from '../../types';

const PhoneField: React.FC<FormGroupProps & { formHook: UseFormReturn<User, any> }> = ({ formHook, ...formGroupProps }) => {
  const {
    control,
    formState: { errors },
  } = formHook;
  return (
    <Form.Group {...formGroupProps}>
      <Form.Label size="sm" className="required">
        Телефон
      </Form.Label>
      <Controller
        name="phone"
        control={control}
        rules={{ required: true, pattern: /^\+380 \(\d\d\) \d\d\d-\d\d-\d\d$/ }}
        render={({ field }) => (
          <Form.Control
            as={PhoneMaskedInput}
            size="sm"
            type="text"
            mask={['+', '3', '8', '0', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
            {...field}
            {...(errors.phone ? { isInvalid: true } : null)}
          />
        )}
      />
    </Form.Group>
  );
};

const PhoneMaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>((PhoneMaskedInputProps, ref) => {
  const assignRef = React.useCallback(
    (element: HTMLInputElement | null) => {
      if (typeof ref === 'function') ref(element);
      if (ref !== null && typeof ref === 'object') ref.current = element;
    },
    [ref],
  );

  React.useEffect(() => () => assignRef(null), [assignRef]);

  return (
    <MaskedInput
      {...PhoneMaskedInputProps}
      render={(textMaskRef, props) => {
        return (
          <input
            {...props}
            ref={node => {
              if (node) {
                textMaskRef(node);
                assignRef(node);
              }
            }}
          />
        );
      }}
    />
  );
});
export default PhoneField;
