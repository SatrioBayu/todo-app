import { legacy_createStore as createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./user/userReducer";

const store = createStore(userReducer, compose(applyMiddleware(thunk)));

export default store;
