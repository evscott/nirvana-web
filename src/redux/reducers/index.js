import { combineReducers } from "redux";
import inventory from "./inventory";
import shoppingCart from "./shoppingCart";


/** Combines all of the Redux reducers into a single state tree */
export default combineReducers({
    inventory,
    shoppingCart
});