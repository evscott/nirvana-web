import shoppingCart from "../reducers/shoppingCart";

export const UPDATE_SHOPPING_CART = "UPDATED_SHOPPING_CART";

const updateShoppingCart = (items) => ({
    type: UPDATE_SHOPPING_CART,
    items: items
})

export const addToShoppingCart = (itemsToAdd) => (dispatch, getState) => {
    let state = getState();
    let items = state.shoppingCart.items.concat(itemsToAdd);
    dispatch(updateShoppingCart(items))
}