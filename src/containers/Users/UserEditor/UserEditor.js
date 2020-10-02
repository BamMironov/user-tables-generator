import React, { memo } from 'react';

import { Modal } from 'components';
import { UserForm }  from 'containers/Users';

import './UserEditor.scss';

function UserEditor({ data, isOpen, onClose, onSaveSuccess }) {
  const onSubmit = fields => {
    onClose()
    onSaveSuccess(fields)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="UserEditor"
    >
      <UserForm
        data={data}
        onSubmit={onSubmit}
      />
    </Modal>
  )
}

export default memo(UserEditor);
