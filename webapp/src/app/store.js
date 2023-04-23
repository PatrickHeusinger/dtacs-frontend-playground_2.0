import { configureStore } from '@reduxjs/toolkit';
//import reducers from './reducers';
import mainPageSlice from './mainPageSlice';
// const initialState = loadState();

export const store = configureStore({
  reducer: {
    MainPage: mainPageSlice,
    // reducer: reducers,
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: {},
  //  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(apiSlice.middleware),
});