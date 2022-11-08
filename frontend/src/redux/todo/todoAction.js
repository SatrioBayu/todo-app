import axios from "axios";
import { fetchListById } from "../index";

// ADD TODO ACTION TYPE
const addTodoRequest = () => {
  return {
    type: "ADD_TODO_REQUEST",
  };
};

const addTodoFailed = (error) => {
  return {
    type: "ADD_TODO_FAILED",
    payload: error,
  };
};

// EDIT TODO ACTION TYPE
const editTodoRequest = () => {
  return {
    type: "EDIT_TODO_REQUEST",
  };
};

const editTodoFailed = (error) => {
  return {
    type: "EDIT_TODO_FAILED",
    payload: error,
  };
};

// DELETE TODO ACTION TYPE
const deleteTodoRequest = () => {
  return {
    type: "DELETE_TODO_REQUEST",
  };
};

const deleteTodoFailed = (error) => {
  return {
    type: "DELETE_TODO_FAILED",
    payload: error,
  };
};

// ADD TODO ACTION
const addTodo = (identifier, data) => {
  return async (dispatch) => {
    dispatch(addTodoRequest);
    try {
      await axios.post("https://fsw-todo-backend.herokuapp.com/todo", data, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchListById(data.listId, identifier));
    } catch (error) {
      dispatch(addTodoFailed(error.message));
    }
  };
};

// EDIT TODO ACTION
const editTodo = (id, identifier, data) => {
  return async (dispatch) => {
    dispatch(editTodoRequest);
    try {
      await axios.put(`https://fsw-todo-backend.herokuapp.com/todo/${id}`, data, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
      });
      dispatch(fetchListById(data.listId, identifier));
    } catch (error) {
      dispatch(editTodoFailed(error.message));
    }
  };
};

// DELETE TODO ACTION
const deleteTodo = (id, listId, identifier) => {
  return async (dispatch) => {
    dispatch(deleteTodoRequest);
    try {
      await axios.delete(`https://fsw-todo-backend.herokuapp.com/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${identifier}`,
        },
        data: {
          listId,
        },
      });
      dispatch(fetchListById(listId, identifier));
    } catch (error) {
      dispatch(deleteTodoFailed(error.message));
    }
  };
};

export { addTodo, editTodo, deleteTodo };
