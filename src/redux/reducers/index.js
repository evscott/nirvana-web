import { combineReducers } from "redux";
import inventory from "./inventory";


/** Combines all of the Redux reducers into a single state tree */
export default combineReducers({
    inventory,
});