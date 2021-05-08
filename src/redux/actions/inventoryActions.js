export const GETTING_INVENTORY = "GETTING_INVENTORY";
export const GET_INVENTORY_FAILURE = "GET_INVENTORY_FAILURE";
export const GET_INVENTORY_SUCCESS = "GET_INVENTORY_SUCCESS";

const gettingInventory = () => ({
    type: GETTING_INVENTORY
});

const getInventoryFailure = () => ({
    type: GET_INVENTORY_FAILURE
})

const getInventorySuccess = () => ({
    type: GET_INVENTORY_SUCCESS,
    products: [
        {
            id: "0",
            name: "0",
            description: "0",
            quantity: "0",
            price: "0"
        },
        {
            id: "1",
            name: "1",
            description: "1",
            quantity: "1",
            price: "1"
        }
    ]
})

export const getInventory = () => (dispatch, getState) => {
    dispatch(gettingInventory())
    dispatch(getInventorySuccess())
}