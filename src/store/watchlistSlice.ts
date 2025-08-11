import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WatchlistMovie = {
  id: number;
  poster_path: string;
};

interface WatchlistState {
  list: WatchlistMovie[];
}

const initialState: WatchlistState = {
  list: [],
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlistRedux(state, action: PayloadAction<WatchlistMovie[]>) {
      state.list = action.payload;
    },
    addMovieToWatchlistRedux(state, action: PayloadAction<number>) {
      state.list = state.list.filter(movie => movie.id !== action.payload);
    },
    removeFromWatchlistRedux(state, action: PayloadAction<number>) {
      state.list = state.list.filter(movie => movie.id !== action.payload);
    },
  },
});

export const {
  setWatchlistRedux,
  addMovieToWatchlistRedux,
  removeFromWatchlistRedux,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
