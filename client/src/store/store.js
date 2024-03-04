import React, { useEffect } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PURGE,
    REGISTER,
    PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./cartSlice";
import authSlice from "./authSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const reducers = combineReducers({
    cart: productSlice,
    auth: authSlice
});


const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export let persistor = persistStore(store);