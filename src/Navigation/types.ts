export type Movie = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
};
export type HomeStackParamList = {
  MainTabs: undefined;
  MovieDetails: { item: Movie };
};
