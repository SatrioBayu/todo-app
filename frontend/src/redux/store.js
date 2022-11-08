import { legacy_createStore as createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import listReducer from "./list/listReducer";
import todoReducer from "./todo/todoReducer";
import listsReducer from "./list/listsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
  todo: todoReducer,
  lists: listsReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
