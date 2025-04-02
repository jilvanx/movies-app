import { Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { StarRating } from "@/components/StarRating";
import { MovieInfo } from "@/components/MovieInfo";

import { getMovieOrTVShowDetails } from "@/services/api";
import { TVSerieDetails } from "@/types/tvSerie";

const TVShowDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const {
    data: tvshow,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => getMovieOrTVShowDetails({ id: id as string, type: "tv" }),
    select: (data) => data as TVSerieDetails,
  });

  if (isLoading)
    return (
      <SafeAreaView className="bg-antique flex-1">
        <Loading />
      </SafeAreaView>
    );

  if (error)
    return (
      <Error message="Failed to fetch tv show details" onRetry={refetch} />
    );

  return (
    <Box className="bg-antique flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Box>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${tvshow?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
            alt={tvshow?.name ?? ""}
          />
        </Box>

        <Box className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-violet font-bold text-xl">{tvshow?.name}</Text>
          <Box className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-light-200 text-sm text-violet">
              {tvshow?.first_air_date?.split("-")[0]} •
            </Text>
            <Text className="text-light-200 text-sm text-violet">
              {tvshow?.episode_run_time?.[0]}m
            </Text>
          </Box>

          <Box className="flex-row items-center gap-x-1 mt-2">
            <StarRating rating={tvshow?.vote_average ?? 0} />

            <Text className="text-light-200 text-sm text-violet">
              ({tvshow?.vote_count} votes)
            </Text>
          </Box>

          <MovieInfo label="Overview" value={tvshow?.overview} />

          <MovieInfo
            label="Genres"
            value={tvshow?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />
        </Box>
      </ScrollView>
    </Box>
  );
};

export default TVShowDetailsScreen;
