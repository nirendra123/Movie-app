export type Movie = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  production_companies?: ProductionCompany[];
};
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export type HomeStackParamList = {
  MainTabs: undefined;
  MovieDetails: { movieId: number };
};
