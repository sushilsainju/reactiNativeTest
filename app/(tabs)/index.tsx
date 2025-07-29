import { icons } from "@/constants/icons";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 100 }}
        className="flex-1 w-full px-5"
      >
        <Image
          source={icons.logo}
          contentFit="contain"
          className="w-32 h-32 rounded-full mx-auto mb-5"
        />
        <Text className="text-primary text-2xl font-bold text-center mt-10">
          Welcome to the App!
        </Text>
        <Image
          source={icons.logo}
          className="w-32 h-32 rounded-full"
          contentFit="cover"
        />
        <Image
          source={icons.logo}
          contentFit="contain"
          style={{
            width: 256,
            height: 256,
            marginTop: 160,
            alignSelf: "center",
            backgroundColor: "black",
            borderRadius: 128,
          }}
        />
      </ScrollView>
    </View>
  );
}
