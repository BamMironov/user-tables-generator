import React, { useCallback } from 'react';

import cn from 'classnames';

import { useUserList } from 'hooks/user';

import { UserList } from 'containers/Users';

import './UserListTemplate.scss';

function UserListTemplate({ onCopy, className }) {
  let [state, actions] = useUserList();

  const onChange = (list, isEdit) => {
    let action = isEdit ? actions.editUser : actions.addUser;

    action(list);
  }

  const onDeleteRow = useCallback(user => {
    actions.removeUser(user);
  }, [actions]);

  return (
    <div className={cn('UserListTemplate', className)}>
      <UserList
        canAdd
        data={state.value()}
        onCopy={() => onCopy(state)}
        onChange={onChange}
        onDeleteRow={onDeleteRow}
      />
    </div>
  )
}

export default UserListTemplate;

