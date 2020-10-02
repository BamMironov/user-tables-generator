export function bindActionCreators(actions, dispatch) {
  return Object.keys(actions).reduce((result, key) => {
    let action = result[key];

    result[key] = (...args) => dispatch(action(...args));

    return actions;
  }, actions)
}
