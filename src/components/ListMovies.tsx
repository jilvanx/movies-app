import { FlatList } from "react-native";

import { Box } from "./ui/box";
import { MovieCard } from "./MovieCard";
import { Text } from "./ui/text";
import { Movie } from "@/types/movie";
import { TVSerie } from "@/types/tvSerie";

import { values } from "@/constants/values";

interface ListMoviesProps {
  moviesAndTVSeries: Movie[] | TVSerie[];
  isMovie: boolean;
  title: string;
}

export const ListMovies = ({
  moviesAndTVSeries,
  isMovie,
  title,
}: ListMoviesProps) => {
  const { screenWidth } = values;

  return (
    <Box className="flex-1 px-5 mt-5">
      <Text className="text-lg text-violet font-bold mb-3">{title}</Text>
      <FlatList<Movie | TVSerie>
        data={moviesAndTVSeries}
        renderItem={({ item }) => (
          <MovieCard {...(item as Movie)} isMovie={isMovie} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        snapToAlignment="start"
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToOffsets={[...Array(moviesAndTVSeries.length)].map(
          (_, index) => index * (screenWidth * 0.8 - 20) + (index - 1) * 20
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};
