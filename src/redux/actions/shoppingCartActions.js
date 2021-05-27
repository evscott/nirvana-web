export const UPDATE_SHOPPING_CART = "UPDATE_SHOPPING_CART";
export const EMPTY_SHOPPING_CART = "EMPTY_SHOPPING_CART";

const updateShoppingCart = (items) => ({
    type: UPDATE_SHOPPING_CART,
    items: items
})

export const emptyShoppingCart = () => ({
    type: EMPTY_SHOPPING_CART,
    items: [],
})

export const addToShoppingCart = (itemsToAdd) => (dispatch, getState) => {
    let state = getState();
    let items = state.shoppingCart.items.concat(itemsToAdd);
    dispatch(updateShoppingCart(items))
}

export const reduceFromShoppingCart = (item) => (dispatch, getState) => {
    let state = getState();

    let items = state.shoppingCart.items.map(a => ({...a}));
    for (let i = 0; i < items.length; i++) {
        if (items[i].name === item.name && items[i].denomination === item.denomination) {
            items.splice(i, 1)
            break;
        }
    }

    dispatch(updateShoppingCart(items))
}

export const removeFromShoppingCart = (item) => (dispatch, getState) => {
    let state = getState();
    let items = state.shoppingCart.items.map(a => ({...a}));

    for (let q = 0; q < item.quantity; q++) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].name === item.name && items[i].denomination === item.denomination) {
                items.splice(i, 1)
                break;
            }
        }
    }

    dispatch(updateShoppingCart(items))
}