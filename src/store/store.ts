import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reviewReducer from '../store/reviewSlice';
const rootReducer = combineReducers({
  reviews: reviewReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
