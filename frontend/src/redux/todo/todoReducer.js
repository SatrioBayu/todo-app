const initialTodoState = {
  loading: false,
  error: "",
};

const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    // ADD TODO ACTION TYPE
    case "ADD_TODO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_TODO_FAILED":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // EDIT TODO ACTION TYPE
    case "EDIT_TODO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "EDIT_TODO_FAILED":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    // DELETE TODO ACTION TYPE
    case "DELETE_TODO_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "DELETE_TODO_FAILED":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default todoReducer;
