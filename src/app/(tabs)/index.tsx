import { ScrollView } from "react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { images } from "@/constants/images";
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
    fetchNextPage: fetchNextPageMovies,
  } = useInfiniteQuery({
    queryKey: ["top-rated-movies"],
    queryFn: ({ pageParam = 1 }) =>
      getMoviesOrTVShows({ query: "", type: "movie", page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const {
    data: tvShows,
    isLoading: isLoadingTVShows,
    error: errorTVShows,
    refetch: refetchTVShows,
    fetchNextPage: fetchNextPageTVShows,
  } = useInfiniteQuery({
    queryKey: ["top-rated-tv-shows"],
    queryFn: ({ pageParam = 1 }) =>
      getMoviesOrTVShows({ query: "", type: "tv", page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const {
    data: moviesAction,
    isLoading: isLoadingMoviesAction,
    error: errorMoviesAction,
    refetch: refetchMoviesAction,
    fetchNextPage: fetchNextPageMoviesAction,
  } = useInfiniteQuery({
    queryKey: ["top-rated-movies-action"],
    queryFn: ({ pageParam = 1 }) =>
      getMoviesOrTVShows({
        query: "",
        type: "movie",
        genre: Genre.Action,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });

  const {
    data: moviesAnimation,
    isLoading: isLoadingMoviesAnimation,
    error: errorMoviesAnimation,
    refetch: refetchMoviesAnimation,
    fetchNextPage: fetchNextPageMoviesAnimation,
  } = useInfiniteQuery({
    queryKey: ["top-rated-movies-animation"],
    queryFn: ({ pageParam = 1 }) =>
      getMoviesOrTVShows({
        query: "",
        type: "movie",
        genre: Genre.Animation,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
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

  const moviesResults = movies?.pages.flatMap((page) =>
    page.results.filter((item): item is Movie => "title" in item)
  ) as Movie[];

  const tvShowsResults = tvShows?.pages.flatMap((page) =>
    page.results.filter((item): item is TVSerie => "name" in item)
  ) as TVSerie[];

  const moviesActionResults = moviesAction?.pages.flatMap((page) =>
    page.results.filter((item): item is Movie => "title" in item)
  ) as Movie[];

  const moviesAnimationResults = moviesAnimation?.pages.flatMap((page) =>
    page.results.filter((item): item is Movie => "title" in item)
  ) as Movie[];

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
          moviesAndTVSeries={moviesResults}
          fetchNextPage={fetchNextPageMovies}
          isMovie
        />

        <ListMovies
          title="Most Popular TV Shows"
          moviesAndTVSeries={tvShowsResults}
          fetchNextPage={fetchNextPageTVShows}
          isMovie={false}
        />

        <ListMovies
          title="Most Popular Action Movies"
          moviesAndTVSeries={moviesActionResults}
          fetchNextPage={fetchNextPageMoviesAction}
          isMovie
        />

        <ListMovies
          title="Most Popular Animation Movies"
          moviesAndTVSeries={moviesAnimationResults}
          fetchNextPage={fetchNextPageMoviesAnimation}
          isMovie
        />
      </ScrollView>
    </Box>
  );
}
