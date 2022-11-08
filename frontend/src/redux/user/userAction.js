import axios from "axios";

const fetchUserSuccess = (user) => {
  return {
    type: "FETCH_USER_SUCCESS",
    payload: user,
  };
};

const fetchUserRequest = () => {
  return {
    type: "FETCH_USER_REQUEST",
  };
};

const fetchUserFailed = (error) => {
  return {
    type: "FETCH_USER_FAILED",
    payload: error,
  };
};

const loginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

const loginFailed = () => {
  return {
    type: "LOGIN_FAILED",
  };
};

const logoutRequest = () => {
  return {
    type: "LOGOUT_REQUEST",
  };
};

const logoutSuccess = (user) => {
  return {
    type: "LOGOUT_SUCCESS",
    payload: user,
  };
};

const fetchUser = (identifier) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest);
    try {
      const user = await axios.get("https://fsw-todo-backend.herokuapp.com/profile", {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      localStorage.setItem("token", user.data.data.noIdentifier);
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      dispatch(fetchUserFailed(error.message));
    }
  };
};

const login = (data) => {
  return async (dispatch) => {
    dispatch(loginRequest);
    try {
      const user = await axios.post("https://fsw-todo-backend.herokuapp.com/login", data);
      // console.log(user.data.user.noIdentifier);
      localStorage.setItem("token", user.data.user.noIdentifier);
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};

const logout = (user) => {
  return async (dispatch) => {
    dispatch(logoutRequest);
    dispatch(logoutSuccess(user));
  };
};

export { login, logout, fetchUser };
