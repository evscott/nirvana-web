import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// Allow functional actions using redux-thunk
const middleware = [thunk];

// Add persistence to root reducer which defaults to local storage in web
const persistConfig = {
    key: "root",
    storage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Add logging if we're not in production
if (process.env.NODE_ENV !== "production") middleware.push(createLogger());
const store = createStore(persistedReducer, applyMiddleware(...middleware));

// Add store to persistor
const persistor = persistStore(store);

export {store, persistor}