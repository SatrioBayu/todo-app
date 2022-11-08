import axios from "axios";
import fetchAllList from "./listsAction";

const fetchListSuccess = (list) => {
  return {
    type: "FETCH_LIST_SUCCESS",
    payload: list,
  };
};

const fetchListRequest = () => {
  return {
    type: "FETCH_LIST_REQUEST",
  };
};

const fetchListFailed = (error) => {
  return {
    type: "FETCH_LIST_FAILED",
    payload: error,
  };
};

const addListRequest = () => {
  return {
    type: "ADD_LIST_REQUEST",
  };
};

const addListFailed = (error) => {
  return {
    type: "ADD_LIST_FAILED",
    payload: error,
  };
};

const editListRequest = () => {
  return {
    type: "EDIT_LIST_REQUEST",
  };
};

const editListFailed = (error) => {
  return {
    type: "EDIT_LIST_FAILED",
    payload: error,
  };
};

const deleteListRequest = () => {
  return {
    type: "DELETE_LIST_REQUEST",
  };
};

const deleteListFailed = (error) => {
  return {
    type: "DELETE_LIST_FAILED",
    payload: error,
  };
};

const fetchListById = (id, identifier) => {
  return async (dispatch) => {
    dispatch(fetchListRequest);
    try {
      const list = await axios.get(`https://fsw-todo-backend.herokuapp.com/list/${id}`, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchListSuccess(list));
    } catch (error) {
      dispatch(fetchListFailed(error.message));
    }
  };
};

const addList = (identifier, data) => {
  return async (dispatch) => {
    dispatch(addListRequest);
    try {
      const list = await axios.post("https://fsw-todo-backend.herokuapp.com/list", data, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchAllList(identifier));
    } catch (error) {
      dispatch(addListFailed(error.message));
    }
  };
};

const editList = (id, identifier, data) => {
  return async (dispatch) => {
    dispatch(editListRequest);
    try {
      const list = await axios.put(`https://fsw-todo-backend.herokuapp.com/list/${id}`, data, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchAllList(identifier));
    } catch (error) {
      dispatch(editListFailed(error.message));
    }
  };
};

const deleteList = (id, identifier) => {
  return async (dispatch) => {
    dispatch(deleteListRequest);
    try {
      const list = await axios.delete(`https://fsw-todo-backend.herokuapp.com/list/${id}`, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchAllList(identifier));
    } catch (error) {
      dispatch(deleteListFailed(error.message));
    }
  };
};

export { fetchListById, addList, editList, deleteList };
