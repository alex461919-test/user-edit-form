/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAddUserMutation, useDeleteUserMutation, useUpdateUserMutation } from '../service/store';
import { User } from '../types';
import { getHumanViewError } from '../service/helpers';
import PhoneField from './edit-form-fields/Phone';
import FirstNameField from './edit-form-fields/FirstName';
import LastNameField from './edit-form-fields/LastName';
import SexField from './edit-form-fields/Sex';
import BirthdayField from './edit-form-fields/Birthday';
import AvatarField from './edit-form-fields/Avatar';
import EmailField from './edit-form-fields/Email';

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
  const formHook = useForm<User>({ defaultValues: { ...user } });
  const { handleSubmit, getValues } = formHook;

  const [fetchError, setFetchError] = React.useState<React.ReactNode>('');
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [modalVisible, setModalVisible] = React.useState(true);

  const userId = getValues().id;

  const handleSave: SubmitHandler<User> = data => {
    (userId ? updateUser(data) : addUser(data))
      .unwrap()
      .then(handleHide)
      .catch(e => {
        setFetchError(getHumanViewError(e));
      });
  };

  const handleDelete = () => {
    deleteUser(userId)
      .unwrap()
      .then(handleHide)
      .catch(e => {
        setFetchError(getHumanViewError(e));
      });
  };

  const handleHide = React.useCallback(() => {
    setModalVisible(false);
    setTimeout(onClose, 200);
  }, [onClose]);

  return (
    <Modal show={modalVisible} onHide={handleHide} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <Modal.Title>{userId ? 'Редактирование пользователя' : 'Новый пользователь'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form css={formStyle} onSubmit={handleSubmit(handleSave)}>
          <FirstNameField className="mb-3" formHook={formHook} />
          <LastNameField className="mb-3" formHook={formHook} />
          <SexField className="mb-3" formHook={formHook} />
          <BirthdayField className="mb-3" formHook={formHook} />
          <AvatarField className="mb-3" formHook={formHook} />
          <EmailField className="mb-3" formHook={formHook} />
          <PhoneField className="mb-3" formHook={formHook} />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {fetchError ? <div className="text-danger w-100 text-end mb-2">{fetchError}</div> : null}
        <Button size="sm" variant="secondary" type="button" onClick={handleHide}>
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
