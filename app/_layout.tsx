import { Stack } from "expo-router";
import "./globals.css"; // Import global styles
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ title: "Saved", headerShown: false }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{ title: "Movie Details", headerShown: false }}
      />
    </Stack>
  );
}
