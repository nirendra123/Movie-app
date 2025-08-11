import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reviewReducer from '../store/reviewSlice';
import watchlistReducer from '../store/watchlistSlice';
const rootReducer = combineReducers({
  reviews: reviewReducer,
  watchlist: watchlistReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
