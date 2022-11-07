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

const fetchUser = (identifier) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest);
    try {
      const user = await axios.get("http://localhost:8000/profile", {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchUserSuccess(user));
    } catch (error) {
      dispatch(fetchUserFailed(error.message));
    }
  };
};

export default fetchUser;
