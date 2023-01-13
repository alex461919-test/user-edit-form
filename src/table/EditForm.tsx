/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } from '../store';
import { User } from '../types';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

interface UserEditModalFormProps {
  user?: User;
  onClose?: () => void;
}

const formStyle = css`
  .required::after {
    content: ' *';
    color: var(--bs-danger);
  }
`;

function UserEditModalForm({ user, onClose = () => {} }: UserEditModalFormProps) {
  //
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<User>({ defaultValues: { phone: ' ', ...user } });

  const [error, setError] = React.useState('');
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const userId = getValues().id;

  const handleSave: SubmitHandler<User> = data => {
    (userId ? updateUser(data) : addUser(data))
      .unwrap()
      .then(onClose)
      .catch(error => {
        setError(error.message);
      });
  };

  const handleDelete = () => {
    deleteUser(userId)
      .unwrap()
      .then(onClose)
      .catch(error => {
        setError(error.message);
      });
  };

  return (
    <Modal show onHide={onClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{userId ? 'Редактирование пользователя' : 'Новый пользователь'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form css={formStyle} onSubmit={handleSubmit(handleSave)}>
          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
            <Form.Label size="sm" className="required">
              День рождения
            </Form.Label>
            <Controller
              name="birthdate"
              control={control}
              rules={{ required: true }}
              render={({ field: fields }) => {
                const { value, ..._fields } = { ...fields, selected: fields.value ? new Date(fields.value) : null };
                return (
                  <Form.Control
                    as={DatePicker}
                    size="sm"
                    type="text"
                    {...(errors.birthdate ? { isInvalid: true } : null)}
                    {..._fields}
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

          <Form.Group className="mb-3">
            <Form.Label size="sm">Аватарка</Form.Label>
            <Form.Control size="sm" type="text" {...register('avatar', { required: false })} {...(errors.avatar ? { isInvalid: true } : null)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label size="sm" className="required">
              Email адрес
            </Form.Label>
            <Form.Control
              size="sm"
              type="email"
              //    placeholder="Введите email"
              {...register('email', { required: true })}
              {...(errors.email ? { isInvalid: true } : null)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label size="sm" className="required">
              Телефон
            </Form.Label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Form.Control
                  as={MaskedInput}
                  size="sm"
                  type="text"
                  mask={['+', '3', '8', '0', ' ', '(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                  {...field}
                />
              )}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {error ? <div className="text-danger w-100 text-end mb-2">{error}</div> : null}
        <Button size="sm" variant="secondary" type="button" onClick={onClose}>
          Отмена
        </Button>
        {userId ? (
          <Button size="sm" variant="danger" type="button" onClick={handleDelete}>
            Удалить
          </Button>
        ) : null}
        <Button size="sm" variant="primary" type="button" onClick={handleSubmit(handleSave)}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserEditModalForm;

/*

          <DatePicker
            selected={startDate}
            onChange={date => {
              console.log(date);
              setStartDate(date);
            }}
          />
*/
