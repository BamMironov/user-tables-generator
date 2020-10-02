import { useMemo, useReducer } from 'react';

import { User, List } from 'entity';

import { bindActionCreators } from 'utils';

const ADD = 'ADD';
const EDIT = 'EDIT';
const REMOVE = 'REMOVE';

function ActionCreators() {
  return {
    addUser: user => ({
      type: ADD,
      payload: user,
    }),
    editUser: user => ({
      type: EDIT,
      payload: user,
    }),
    removeUser: user => ({
      type: REMOVE,
      payload: user,
    }),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return state.add(action.payload)

    case EDIT: {
      let index = state.findIndex(user => user.id === action.payload.id);

      return state.setIn(index, action.payload)
    }

    case REMOVE: {
      let index = state.findIndex(user => user === action.payload);

      return state.remove(index)
    }

    default:
      throw new Error(`Unknown action has been invoked: ${action.type} in useUserList`)
  }
}

function useUserList(initialState = List()) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => (
    bindActionCreators(ActionCreators(), dispatch)
  ), []);

  return [state, actions]
}

export default useUserList