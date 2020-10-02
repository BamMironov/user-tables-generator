import React, {
  memo,
  useMemo,
  useState,
  useCallback,
} from 'react';

import cn from 'classnames'

import { useUserList } from 'hooks/user';

import { Table, Button } from 'components';

import { UserEditor } from 'containers/Users';

import { ReactComponent as CrossIcon } from 'assets/icons/btn_delete.svg';

import './UserList.scss';

function UserList({
  data,
  onCopy,
  canAdd,
  onRemove,
  className,
  onDeleteRow,
  onChange,
}) {
  let [selected, setSelected] = useState();
  let [isEditorOpen, toggleEditor] = useState(false);

  const onCloseEditor = useCallback(() => {
    setSelected(undefined);
    toggleEditor(false)
  }, []);

  const onSaveSuccess = user => {
    onChange(user, !!selected);
  }

  function onAdd() {
    toggleEditor(true);
  }

  function onEdit(user) {
    setSelected(user);
    toggleEditor(true);
  }

  const columns = useMemo(() => [
    {
      title: 'Name',
      dataField: 'name'
    },
    {
      title: 'Surname',
      dataField: 'surname'
    },
    {
      title: 'Age',
      dataField: 'age'
    },
    {
      title: 'City',
      dataField: 'city'
    },
    {
      dataField: '',
      formatter: (_, data) => (
        <div className="UserList-Buttons">
          <Button
            onClick={() => onEdit(data)}
            className="UserList-ListButton UserList-ListButton_color_blue"
          >
            Edit
          </Button>

          <Button
            onClick={() => onDeleteRow(data)}
            className="UserList-ListButton UserList-ListButton_color_red"
          >
            Delete
          </Button>
        </div>
      )
    }
  ], [onDeleteRow]);

  return (
    <div className={cn('UserList', className)}>
      <div className="UserList-ActionButtons">
        {canAdd && (
          <Button
            onClick={onAdd}
            className="UserList-ActionButton Button_theme_blue Button_size_small"
          >
            Add
          </Button>
        )}

        {data.length > 0 && (
          <Button
            onClick={onCopy}
            className="UserList-ActionButton Button_theme_blue Button_size_small"
          >
            Copy
          </Button>
        )}

        {onRemove && (
          <CrossIcon
            onClick={onRemove}
            className="UserList-RemoveIcon"
          />
        )}
      </div>

      <Table
        data={data}
        columns={columns}
        className="UserList-Table"
      />

      <UserEditor
        data={selected}
        isOpen={isEditorOpen}
        onClose={onCloseEditor}
        onSaveSuccess={onSaveSuccess}
      />
    </div>
  )
}

export default memo(UserList)
