import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Details = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Details for moviedsdssssdsdsdsds ID: {id}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
