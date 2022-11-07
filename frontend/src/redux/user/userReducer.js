const initialState = {
  loading: false,
  user: null,
  error: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
  }
};

export default userReducer;
