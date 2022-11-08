const initialListState = {
  loading: true,
  list: null,
  error: "",
};

const listReducer = (state = initialListState, action) => {
  switch (action.type) {
    case "FETCH_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        list: action.payload,
      };
    case "FETCH_LIST_REQUEST":
      return {
        ...state,
      };
    case "FETCH_LIST_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "ADD_LIST_REQUEST":
      return {
        ...state,
      };
    case "ADD_LIST_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "EDIT_LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_LIST_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "DELETE_LIST_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_LIST_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default listReducer;
