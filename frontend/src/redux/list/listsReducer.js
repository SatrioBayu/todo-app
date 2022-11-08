const initialListsState = {
  loading: false,
  lists: null,
  error: "",
};

const listsReducer = (state = initialListsState, action) => {
  switch (action.type) {
    case "FETCH_ALL_LIST_SUCCESS":
      return {
        ...state,
        lists: action.payload,
        loading: false,
      };
    case "FETCH_ALL_LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_ALL_LIST_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listsReducer;
