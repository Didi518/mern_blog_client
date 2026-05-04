import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './reducers/userReducers';

const userInfoFromStorage = localStorage.getItem('compte')
  ? JSON.parse(localStorage.getItem('compte'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage,
};

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: initialState,
  },
});
export default store;
