import { legacy_createStore as createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";
import listReducer from "./list/listReducer";

const rootReducer = combineReducers({
  user: userReducer,
  list: listReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
