import { combineReducers } from "redux";
import AppReducer from "./app/AppReducer";

const combined = combineReducers({
  appReducer: AppReducer,
});

const rootReducer = (state, action) => {
  return combined(state, action);
};

export default rootReducer;