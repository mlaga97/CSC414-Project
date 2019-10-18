function get(state, action) {
  return {
    ...state,
    [action.data.id]: action.data,
  };
}

export default get;
