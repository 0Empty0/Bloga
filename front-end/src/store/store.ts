import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './user/user-slice';
import { UserApi } from './user/user-api';

const store = configureStore({
  reducer: {
    users: UserSlice,
    [UserApi.reducerPath]: UserApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([UserApi.middleware])
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
