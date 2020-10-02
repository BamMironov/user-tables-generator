import React from 'react';

import { useUserManager } from 'hooks/user';

import { UserList, UserListTemplate } from 'containers/Users';

import './UserManager.scss';

function UserManager() {
  let [state, actions] = useUserManager();

  function onCopyList(list) {
    actions.copyList(list);
  }

  function onRemoveList(index) {
    actions.removeList(index);
  }

  function onChangeList(data, index) {
    actions.editInList(data, index);
  }

  function onDeleteRowInList(data, index) {
    actions.removeRowInList(data, index);
  }

  return (
    <div className="UserManager">
      <UserListTemplate
        onCopy={onCopyList}
        className="UserManager-UserListTemplate"
      />

      <div className="UserManager-UserLists">
        {state.map((list, index) => (
          <UserList
            canRemove
            key={index}
            data={list.value()}
            onChange={list => onChangeList(list, index)}
            onCopy={() => onCopyList(list)}
            onDeleteRow={list => onDeleteRowInList(list, index)}
            onRemove={() => onRemoveList(index)}
            className="UserManager-UserList"
          />
        ))}
      </div>
    </div>
  )
}

export default UserManager;
