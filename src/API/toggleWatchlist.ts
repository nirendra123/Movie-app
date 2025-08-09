import api from './axiosInstance';

export const accountId = '22106129';
export const sessionId = 'c9b2a44e85fe6367412cede5bdecc2b069e5d93f';

export async function toggleWatchlist(movieId: number, watchlist: boolean) {
  try {
    if (!sessionId) throw new Error('No session id ');
    const response = await api.post(
      `/account/${accountId}/watchlist`,
      {
        media_type: 'movie',
        media_id: movieId,
        watchlist,
      },
      {
        params: { session_id: sessionId },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error toggling watchlist:', error);
    throw error;
  }
}

export async function addMovieToWatchlist(movieId: number) {
  try {
    const data = await toggleWatchlist(movieId, true);

    console.log('add to watchlist:', data);
  } catch (err) {
    console.error('Failed to add:', err);
  }
}

export async function removeMovieFromWatchlist(movieId: number) {
  try {
    const data = await toggleWatchlist(movieId, false);
    console.log('Removed from watchlist:', data);
  } catch (err) {
    console.error('Failed to remove:', err);
  }
}

export async function getWatchlistMovies() {
  try {
    if (!sessionId) throw new Error('No session id');
    const response = await api.get(`/account/${accountId}/watchlist/movies`, {
      params: {
        session_id: sessionId,
        language: 'en-US',
        sort_by: 'created_at.asc',
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching watchlist movies:', error);
    return [];
  }
}
