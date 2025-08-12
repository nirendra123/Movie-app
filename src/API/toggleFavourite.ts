import axios from 'axios';
import api from './axiosInstance';

export const accountId = '22106129';
export const sessionId = 'c9b2a44e85fe6367412cede5bdecc2b069e5d93f';

export async function toggleFavorite(movieId: number, favorite: boolean) {
  try {
    if (!sessionId) throw new Error('No session id');
    const response = await api.post(
      `/account/${accountId}/favorite`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite,
      },
      {
        params: { session_id: sessionId },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error response data:', error.response?.data);
      console.error('Error status:', error.response?.status);
      console.error('Error headers:', error.response?.headers);
    } else {
      console.error('Non-Axios error:', error);
    }
    throw error;
  }
}

export async function getFavoriteMovies() {
  try {
    if (!sessionId) throw new Error('No session id');
    const response = await api.get(`/account/${accountId}/favorite/movies`, {
      params: {
        session_id: sessionId,
        language: 'en-US',
        sort_by: 'created_at.asc',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }
}

export async function getFavoriteStatus(movieId: number) {
  const response = await api.get(`/movie/${movieId}/account_states`, {
    params: { session_id: sessionId },
  });
  return response.data.favorite;
}
