const initialUserState = {
  loading: true,
  user: null,
  error: "",
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    // GET USER ACTION TYPE
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_USER_FAILED":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // LOGIN USER ACTION TYPE
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    // LOGOUT USER ACTION TYPE
    case "LOGOUT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOOUT_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
