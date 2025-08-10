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
import fetchMovies from "../services/api";
import { useFetch } from "../services/useFetch";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    error,
    loading,
    refetch,
    reset,
  } = useFetch(fetchMovies, true);
  console.log("Movies ayo:", movies);
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
          {loading && <ActivityIndicator size="large" color="#fff" />}
          {error && <Text>Error: {error.message}</Text>}
          {movies && (
            <FlatList
              data={movies.results}
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
          )}
        </View>
      </ScrollView>
    </View>
  );
}
