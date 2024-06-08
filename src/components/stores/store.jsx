import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'; 
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from '../slices/authSlice';

const persistConfig = {
    key: 'root',
    storage,
};


const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;