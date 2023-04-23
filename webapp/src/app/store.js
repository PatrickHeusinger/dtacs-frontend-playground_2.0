import { configureStore } from '@reduxjs/toolkit';
import reducers from './reducers';



// const initialState = loadState();

export const store = configureStore({
    reducer: reducers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
  //  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(apiSlice.middleware),
});