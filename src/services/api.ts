import axios from "axios";

import { Genre } from "@/types/genre";
import { ResponseMoviesAndTVSeries } from "@/types/response";
import { MovieDetails } from "@/types/movie";
import { TVSerieDetails } from "@/types/tvSerie";
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
    accept: "application/json",
  },
});

export const getMoviesOrTVShows = async ({
  query = "",
  type = "movie",
  genre = null,
  page = 1,
}: {
  query: string;
  type: "movie" | "tv";
  genre?: Genre | null;
  page: number;
}) => {
  const response = query
    ? await api.get(`/search/${type}?query=${encodeURIComponent(query)}`)
    : await api.get(
        `/discover/${type}?sort_by=popularity.desc&page=${page}${
          genre ? `&with_genres=${genre}` : ""
        }`
      );

  return response.data as ResponseMoviesAndTVSeries;
};

export const getMovieOrTVShowDetails = async ({
  id,
  type,
}: {
  id: string;
  type: "movie" | "tv";
}) => {
  const response = await api.get(`/${type}/${id}`);

  return response.data as MovieDetails | TVSerieDetails;
};
