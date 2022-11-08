import axios from "axios";

// FETCH ALL LIST ACTION TYPE
const fetchAllListSuccess = (list) => {
  return {
    type: "FETCH_ALL_LIST_SUCCESS",
    payload: list,
  };
};

const fetchAllListRequest = () => {
  return {
    type: "FETCH_ALL_LIST_REQUEST",
  };
};

const fetchAllListFailed = (error) => {
  return {
    type: "FETCH_ALL_LIST_FAILED",
    payload: error,
  };
};

// FETCH ALL LIST ACTION
const fetchAllList = (identifier) => {
  return async (dispatch) => {
    try {
      dispatch(fetchAllListRequest);
      const list = await axios.get("https://fsw-todo-backend.herokuapp.com/list", {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchAllListSuccess(list));
    } catch (error) {
      dispatch(fetchAllListFailed(error.message));
    }
  };
};

export default fetchAllList;
