import { useMemo, useReducer } from 'react';

import { List, User } from 'entity';

import { bindActionCreators } from 'utils';

const COPY_LIST = 'COPY_LIST';
const REMOVE_LIST = 'REMOVE_LIST';

const ADD_IN_LIST = 'ADD_IN_LIST';
const EDIT_IN_LIST = 'EDIT_IN_LIST';
const REMOVE_ROW_IN_LIST = 'REMOVE_ROW_IN_LIST';

function ActionCreators() {
  return {
    copyList: list => ({
      type: COPY_LIST,
      payload: list
    }),
    removeList: index => ({
      type: REMOVE_LIST,
      payload: { index }
    }),
    editInList: (user, index) => ({
      type: EDIT_IN_LIST,
      payload: { user, index }
    }),
    removeRowInList: (user, index) => ({
      type: REMOVE_ROW_IN_LIST,
      payload: { user, index }
    }),
  }
}

function reducer(state, action) {
  switch (action.type) {
    case COPY_LIST:
      return state.add(action.payload);

    case REMOVE_LIST:
      return state.remove(action.payload.index);

    case EDIT_IN_LIST: {
      let targetList = state.get([action.payload.index]);

      let index = targetList.find(user => user.id === action.payload.user.id)

      return state.setIn(
        action.payload.index,
        targetList.setIn(index, action.payload.user)
      )
    }

    case REMOVE_ROW_IN_LIST: {
      let targetList = state.get([action.payload.index]);

      let index = targetList.find(user => user.id === action.payload.user.id)

      return state.setIn(
        action.payload.index,
        targetList.remove(index)
      )
    }

    default:
      throw new Error(`Unknown action has been invoked: ${action.type} in useUserManager`)
  }
}

function useUserManager(initialState = List()) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(() => bindActionCreators(ActionCreators(), dispatch), []);

  return [state.value(), actions];
}

export default useUserManager;
