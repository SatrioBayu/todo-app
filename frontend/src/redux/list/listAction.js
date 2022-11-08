import axios from "axios";
import fetchAllList from "./listsAction";

// FETCH LIST ACTION TYPE
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

// ADD LIST ACTION TYPE
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

// EDIT LIST ACTION TYPE
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

// DELETE LIST ACTION TYPE
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

// FETCH LIST ACTION
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

// ADD LIST ACTION
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

// EDIT LIST ACTION
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

// DELETE LIST ACTION
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
