import { legacy_createStore as createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import listReducer from "./list/listReducer";
import todoReducer from "./todo/todoReducer";

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
  todo: todoReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
