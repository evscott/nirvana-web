import {UPDATE_SHOPPING_CART} from "../actions/shoppingCartActions";

const initialState = {
    items: []
};

/**
 * Reducer for the shopping cart branch of the Redux state tree.
 *
 * @param state The current shopping cart
 * @param action The action to perform on the data
 */
export default function shoppingCart(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SHOPPING_CART:
            return {
                ...state,
                items: action.items,
            };
        default:
            return state;
    }
}