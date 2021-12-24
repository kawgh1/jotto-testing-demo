import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import ReduxThunk from "redux-thunk";

export const middlewares = [ReduxThunk];

export default createStore(rootReducer, {}, applyMiddleware(...middlewares));
