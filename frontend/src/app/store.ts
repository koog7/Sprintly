import storage from 'redux-persist/lib/storage';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer, persistStore} from 'redux-persist';
import {UserReducer} from "../features/auth/userSlice.ts";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {useDispatch, useSelector} from "react-redux";
import {HomeReducer} from "../features/home/homeSlice.ts";

const userPersistConfig = {
    key: 'sprintly:user',
    storage,
    whitelist: ['user'],
}

const rootReducer = combineReducers({
    User: persistReducer(userPersistConfig, UserReducer),
    Home: HomeReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();