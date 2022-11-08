const initialTodoState = {
  loading: false,
  error: "",
};

const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case "ADD_TODO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TODO_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    case "EDIT_TODO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_TODO_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    case "DELETE_TODO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_TODO_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
