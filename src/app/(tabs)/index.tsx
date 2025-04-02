import { ScrollView } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { images } from "@/constants/images";
import { SearchBar } from "@/components/SearchBar";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { ListMovies } from "@/components/ListMovies";

import { getMoviesOrTVShows } from "@/services/api";

import { values } from "@/constants/values";

import { Movie } from "@/types/movie";
import { TVSerie } from "@/types/tvSerie";
import { Genre } from "@/types/genre";

export default function Index() {
  const { isIOS } = values;

  const {
    data: movies,
    isLoading: isLoadingMovies,
    error: errorMovies,
    refetch: refetchMovies,
  } = useQuery({
    queryKey: ["top-rated-movies"],
    queryFn: () => getMoviesOrTVShows({ query: "", type: "movie" }),
  });

  const {
    data: tvShows,
    isLoading: isLoadingTVShows,
    error: errorTVShows,
    refetch: refetchTVShows,
  } = useQuery({
    queryKey: ["top-rated-tv-shows"],
    queryFn: () => getMoviesOrTVShows({ query: "", type: "tv" }),
  });

  const {
    data: moviesAction,
    isLoading: isLoadingMoviesAction,
    error: errorMoviesAction,
    refetch: refetchMoviesAction,
  } = useQuery({
    queryKey: ["top-rated-movies-action"],
    queryFn: () =>
      getMoviesOrTVShows({ query: "", type: "movie", genre: Genre.Action }),
  });

  const {
    data: moviesAnimation,
    isLoading: isLoadingMoviesAnimation,
    error: errorMoviesAnimation,
    refetch: refetchMoviesAnimation,
  } = useQuery({
    queryKey: ["top-rated-movies-animation"],
    queryFn: () =>
      getMoviesOrTVShows({ query: "", type: "movie", genre: Genre.Animation }),
  });

  if (
    isLoadingMovies ||
    isLoadingTVShows ||
    isLoadingMoviesAction ||
    isLoadingMoviesAnimation
  )
    return <Loading />;

  if (errorMovies)
    return <Error message="Failed to fetch movies" onRetry={refetchMovies} />;

  if (errorTVShows)
    return (
      <Error message="Failed to fetch tv shows" onRetry={refetchTVShows} />
    );

  if (errorMoviesAction)
    return (
      <Error
        message="Failed to fetch movies action"
        onRetry={refetchMoviesAction}
      />
    );

  if (errorMoviesAnimation)
    return (
      <Error
        message="Failed to fetch movies animation"
        onRetry={refetchMoviesAnimation}
      />
    );
  return (
    <Box className="flex-1 bg-antique">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Box className={`mx-5 mt-10 ${isIOS ? "mt-20" : "mt-5"}`}>
          <Image
            source={images.logo}
            alt="logo"
            resizeMode="contain"
            className="w-20 h-20 mx-auto"
          />
        </Box>

        <ListMovies
          title="Most Popular Movies"
          moviesAndTVSeries={movies?.results as Movie[]}
          isMovie
        />

        <ListMovies
          title="Most Popular TV Shows"
          moviesAndTVSeries={tvShows?.results as TVSerie[]}
          isMovie={false}
        />

        <ListMovies
          title="Most Popular Action Movies"
          moviesAndTVSeries={moviesAction?.results as Movie[]}
          isMovie
        />

        <ListMovies
          title="Most Popular Animation Movies"
          moviesAndTVSeries={moviesAnimation?.results as Movie[]}
          isMovie
        />
      </ScrollView>
    </Box>
  );
}
