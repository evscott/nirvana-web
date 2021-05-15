import {
    GETTING_INVENTORY,
    GET_INVENTORY_FAILURE,
    GET_INVENTORY_SUCCESS
} from "../actions/inventoryActions";

const initialState = {
    products: {
        shrooms: {
            denominations: []
        },
        acid: {
            denominations: []
        }
    }
};

/**
 * Reducer for the inventory branch of the Redux state tree.
 *
 * @param state The current inventory
 * @param action The action to perform on the data
 */
export default function inventory(state = initialState, action) {
    switch (action.type) {
        case GETTING_INVENTORY:
            return {
                ...state,
            };
        case GET_INVENTORY_FAILURE:
            return {
                ...state,
                products: action.products
            };
        case GET_INVENTORY_SUCCESS:
            return {
                ...state,
                products: action.products,
            };
        default:
            return state;
    }
}