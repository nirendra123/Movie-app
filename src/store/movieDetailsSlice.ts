import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../Navigation/types';

interface MovieState {
  movie: Movie | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  movie: null,
  loading: false,
  error: null,
};
const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    fetchMovieStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMovieSuccess(state, action: PayloadAction<Movie>) {
      state.movie = action.payload;
      state.loading = false;
    },
    fetchMovieFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearMovie(state) {
      state.movie = null;
      state.error = null;
      state.loading = false;
    },
  },
});
export const {
  fetchMovieStart,
  fetchMovieSuccess,
  fetchMovieFailure,
  clearMovie,
} = movieDetailsSlice.actions;

export default movieDetailsSlice.reducer;
