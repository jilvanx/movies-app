import { Movie } from "./movie";
import { TVSerie } from "./tvSerie";

export interface ResponseMoviesAndTVSeries {
  page: number;
  results: Movie[] | TVSerie[];
  total_pages: number;
  total_results: number;
}
