import { Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { StarRating } from "@/components/StarRating";
import { MovieInfo } from "@/components/MovieInfo";

import { getMovieOrTVShowDetails } from "@/services/api";

import { MovieDetails } from "@/types/movie";

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const {
    data: movie,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieOrTVShowDetails({ id: id as string, type: "movie" }),
    select: (data) => data as MovieDetails,
  });

  if (isLoading)
    return (
      <SafeAreaView className="bg-antique flex-1">
        <Loading />
      </SafeAreaView>
    );

  if (error)
    return <Error message="Failed to fetch movie details" onRetry={refetch} />;

  return (
    <Box className="bg-antique flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Box>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
            alt={movie?.title ?? ""}
          />
        </Box>

        <Box className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-violet font-bold text-xl">{movie?.title}</Text>
          <Box className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm text-violet">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm text-violet">
              {movie?.runtime}m
            </Text>
          </Box>

          <Box className="flex-row items-center gap-x-1 mt-2">
            <StarRating rating={movie?.vote_average ?? 0} />

            <Text className="text-light-200 text-sm text-violet">
              ({movie?.vote_count} votes)
            </Text>
          </Box>

          <MovieInfo label="Overview" value={movie?.overview} />

          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default MovieDetailsScreen;
