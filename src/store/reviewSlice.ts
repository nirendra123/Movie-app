import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Review = {
  id: string;
  text: string;
  userId: string;
  rating?: number;
  movieId: string;

  createdAt: string;
};

interface ReviewState {
  list: Review[];
}

const initialState: ReviewState = {
  list: [],
};
const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviews(state, action: PayloadAction<Review[]>) {
      state.list = action.payload;
    },
    addReview(state, action: PayloadAction<Review>) {
      state.list.push(action.payload);
    },
  },
});
export const { setReviews, addReview } = reviewSlice.actions;

export default reviewSlice.reducer;
