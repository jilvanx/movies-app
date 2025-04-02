import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { Loading } from "@/components/Loading";
import { RadioType } from "@/components/RadioType";
import { Error } from "@/components/Error";

import { images } from "@/constants/images";
import { values } from "@/constants/values";

import { getMoviesOrTVShows } from "@/services/api";

import { Movie } from "@/types/movie";
import { TVSerie } from "@/types/tvSerie";

const Search = () => {
  const { isIOS } = values;

  const [search, setSearch] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["search-movies", search],
    queryFn: () => getMoviesOrTVShows({ query: search, type, page: 1 }),
    enabled: Boolean(search),
  });

  const handleTypeChange = (type: "movie" | "tv") => {
    setType(type);
    setSearch("");
    if (search.trim().length > 0) {
      refetch();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (search.trim()) {
        await refetch();
      } else {
        setSearch("");
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <Box className="flex-1 bg-antique">
      <Box className={`mx-5 mt-10 ${isIOS ? "mt-20" : "mt-5"}`}>
        <Image
          source={images.logo}
          alt="logo"
          resizeMode="contain"
          className="w-20 h-20 mx-auto"
        />
      </Box>
      <FlatList<Movie | TVSerie>
        className="px-5"
        data={data?.results as Movie[] | TVSerie[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard {...item} isMovie={type === "movie"} compact />
        )}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <Box className="my-5 items-center gap-2">
              <SearchBar value={search} onChangeText={setSearch} />
              <RadioType type={type} setType={handleTypeChange} />
            </Box>

            {isLoading && (
              <Box className="my-10">
                <Loading />
              </Box>
            )}

            {error && (
              <Error message="Failed to fetch movies" onRetry={refetch} />
            )}

            {!isLoading &&
              !error &&
              search.trim() &&
              data?.results?.length! > 0 && (
                <Text className="text-xl text-vi font-bold">
                  Search Results for
                  <Text className="text-accent">{` ${search}`}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !isLoading && !error ? (
            <Box className="mt-10 px-5">
              <Text className="text-center text-violet">
                {search.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </Box>
          ) : null
        }
      />
    </Box>
  );
};

export default Search;
