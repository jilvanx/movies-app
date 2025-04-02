import { ExternalPathString, Link, RelativePathString } from "expo-router";
import { TouchableOpacity } from "react-native";

import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { Image } from "./ui/image";
import { StarRating } from "./StarRating";

import { Movie } from "@/types/movie";
import { TVSerie } from "@/types/tvSerie";

import { images } from "@/constants/images";
import { values } from "@/constants/values";

export const MovieCard = ({
  id,
  poster_path,
  vote_average,
  isMovie = true,
  compact = false,
  ...rest
}: (Movie | TVSerie) & {
  isMovie?: boolean;
  compact?: boolean;
}) => {
  const { screenWidth } = values;
  const title = isMovie ? (rest as Movie).title : (rest as TVSerie).name;
  const releaseDate = isMovie
    ? (rest as Movie).release_date
    : (rest as TVSerie).first_air_date;

  return (
    <Link href={isMovie ? `/movies/${id}` : `/tv/${id}`} asChild>
      {compact ? (
        <TouchableOpacity className="w-[30%]">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : images.noImage500x750,
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
            alt={title}
            testID="movie-poster"
          />

          <Text
            className="text-sm font-bold text-violet mt-2"
            numberOfLines={1}
          >
            {title}
          </Text>

          <StarRating rating={vote_average} />

          <Box className="flex-row mt-1">
            <Text className="text-xs text-violet ml-1 self-center font-medium">
              {releaseDate && releaseDate.split("-")[0]}
            </Text>
          </Box>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Box
            style={{
              width: screenWidth * 0.8 - 20,
              height: screenWidth,
            }}
            className="rounded-lg overflow-hidden mx-3"
          >
            <Image
              source={{
                uri: poster_path
                  ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                  : images.noImage500x750,
              }}
              alt={title}
              size="full"
              className="flex-1"
              testID="movie-poster"
            />
          </Box>
          <Box className="mx-3">
            <Text
              className="text-violet text-sm font-bold mt-2"
              numberOfLines={1}
            >
              {title}
            </Text>

            <StarRating rating={vote_average} />

            <Box className="flex-row mt-1">
              <Text className="text-xs text-violet ml-1 self-center">
                {releaseDate && releaseDate.split("-")[0]}
              </Text>
            </Box>
          </Box>
        </TouchableOpacity>
      )}
    </Link>
  );
};
