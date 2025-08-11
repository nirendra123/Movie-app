import { combineReducers, configureStore } from '@reduxjs/toolkit';
import reviewReducer from '../store/reviewSlice';
import watchlistReducer from '../store/watchlistSlice';
import moviesDetailsReducer from './movieDetailsSlice';
const rootReducer = combineReducers({
  reviews: reviewReducer,
  watchlist: watchlistReducer,
  movieDetails: moviesDetailsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
