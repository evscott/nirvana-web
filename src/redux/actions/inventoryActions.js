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
    products: {
        shrooms: {
            denominations: [
                {
                    type: "3.5 grams",
                    price: 35.00,
                    amount: 10
                },
                {
                    type: "7 grams",
                    price: 65.00,
                    amount: 5
                },
                {
                    type: "1 ounce",
                    price: 200.00,
                    amount: 9
                }
            ],
        },
        acid: {
            denominations: [
                {
                    type: "3 tabs",
                    price: 30.00,
                    amount: 9
                },
                {
                    type: "7 tabs",
                    price: 60.00,
                    amount: 6
                },
                {
                    type: "sheet",
                    price: 1000.00,
                    amount: 2
                }
            ],
        },
    }
})

export const getInventory = () => (dispatch, getState) => {
    dispatch(gettingInventory())
    dispatch(getInventorySuccess())
}