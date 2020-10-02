import { useMemo, useReducer } from 'react';

import { bindActionCreators } from 'utils';

function ActionTypes(entityName) {
  return {
    CHANGE_FIELD: `CHANGE_${entityName}_FORM_FIELD`,
  }
}

function ActionCreators(actionTypes) {
  const { CHANGE_FIELD } = actionTypes;

  return {
    changeField: (name, value) => ({
      type: CHANGE_FIELD,
      payload: { name, value }
    })
  }
}

function State(fields = {}) {
  return {
    ...fields,
  }
}

function Reducer(actionTypes) {
  return function reducer(state, action) {
    const { CHANGE_FIELD } = actionTypes;

    switch (action.type) {
      case CHANGE_FIELD: {
        const { name, value } = action.payload;

        return {
          ...state,
          [name]: value
        }
      }

      default:
        throw new Error(`Unknown action has been invoked: ${action.type} in useForm`)
    }
  }
}

function useForm(name = '', entity) {
  const actionTypes = useMemo(() => ActionTypes(name), [name]);
  const [fields, dispatch] = useReducer(Reducer(actionTypes), State(entity));

  let actions = useMemo(() => (
    bindActionCreators(ActionCreators(actionTypes), dispatch)
  ), [actionTypes]);

  return {
    fields,
    ...actions,
  }
}

export default useForm;
