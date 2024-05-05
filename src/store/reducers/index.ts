import { combineReducers } from "redux";
import jobReducer from "./jobs";

const rootReducer = combineReducers({
  jobs: jobReducer,
});

export default rootReducer;
