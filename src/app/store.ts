import { configureStore } from '@reduxjs/toolkit';
import api from './api/apiSlice';
import bookReducer from '@/app/features/Books/bookSlice';
import userReducer from '@/app/features/user/userSlice';
const store = configureStore({
  reducer: {
    book: bookReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
