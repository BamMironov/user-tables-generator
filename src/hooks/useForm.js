import { useMemo, useReducer, useCallback, useState, useEffect } from 'react';

import { FormValidator } from 'validators';

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

function useForm(name = '', entity, scheme) {
  let [errors, setErrors] = useState({});
  let [isValid, setIsValid] = useState(true);

  const actionTypes = useMemo(() => ActionTypes(name), [name]);
  const [fields, dispatch] = useReducer(Reducer(actionTypes), State(entity));

  const validator = useMemo(() => new FormValidator(scheme), [scheme]);

  let actions = useMemo(() => (
    bindActionCreators(ActionCreators(actionTypes), dispatch)
  ), [actionTypes]);

  const validate = useCallback((data) => {
    return validator.validate(data)
      .then(() => {
        setErrors({});
        setIsValid(true);

        return true;
      })
      .catch(errors => {
        setErrors(errors);
        setIsValid(false);

        return false
      });
  }, [validator]);

  const submit = useCallback((callback) => {
    validate(fields).then((isValid) => {
      if (isValid) {
        callback(fields);
      }
    })
  }, [fields, validate]);

  useEffect(() => {
    if (!isValid) {
      validate(fields)
    }
  }, [fields, isValid, validate]);

  return {
    errors,
    fields,
    submit,
    isValid,
    ...actions,
  }
}

export default useForm;
