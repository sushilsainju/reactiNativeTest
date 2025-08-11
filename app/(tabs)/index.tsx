import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import SearchBar from "../components/SearchBar";

import MovieCard from "../components/MovieCard";
import TrendingCard from "../components/TrendingCard";
import { fetchMovies } from "../services/api";
import { getTrendingSearches } from "../services/appwrite";
import { useFetch } from "../services/useFetch";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    error,
    loading,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  const {
    data: trendingMovies,
    error: trendingError,
    loading: trendingLoading,
  } = useFetch(getTrendingSearches, true);

  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mx-auto mt-20 mb-5" />
        <View className="flex-1 mt-2">
          <SearchBar
            placeholder={"Search"}
            onPress={() => {
              router.push("/search");
            }}
          />

          <Text className="text-white font-semibold text-lg mt-6">
            Trending Movies
          </Text>
          {trendingMovies && trendingMovies.length > 0 && (
            <FlatList
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
              )}
              keyExtractor={(item) => item.movie_id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-2"
              contentContainerStyle={{ paddingRight: 20, gap: 20 }}
            />
          )}
          {loading && <ActivityIndicator size="large" color="#fff" />}
          {error && <Text>Error: {error.message}</Text>}
          {movies && (
            <View>
              <Text className="text-white font-semibold text-lg mt-2">
                Latest Movies
              </Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
