import axios from "axios";
import { fetchListById } from "../index";

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
