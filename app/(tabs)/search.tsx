import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import fetchMovies from "../services/api";
import { useFetch } from "../services/useFetch";

const Search = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies(searchQuery), false);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();

        // Call updateSearchCount only if there are results
        // if (movies?.length! > 0 && movies?.[0]) {
        //   await updateSearchCount(searchQuery, movies[0]);
        // }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1  bg-primary ">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      {loading && <ActivityIndicator size="large" color="#fff" />}

      <FlatList
        data={movies?.results || []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="mt-2 pb-32"
        scrollEnabled={false}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <View className="flex-1 image items-center justify-center px-5 pt-20">
              <Image
                source={icons.logo}
                className="w-12 h-10 mb-4"
                resizeMode="contain"
              />
            </View>
            <View className="mb-4">
              <SearchBar
                placeholder={"Search"}
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {movies?.results.length > 0 && !loading && (
              <Text className="text-white text-xl font-bold mt-4">
                Search Results for {""}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        )}
      />
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
};

export default Search;
