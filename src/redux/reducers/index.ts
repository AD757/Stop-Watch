import timerReducer from "./timerReducer";
import { combineReducers } from "redux";
import logReducer from "./logReducer";

const allReducers = combineReducers({
  log: logReducer,
  timer: timerReducer
});

export default allReducers;
