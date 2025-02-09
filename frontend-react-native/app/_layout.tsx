import { Stack } from "expo-router";
// import { useAuth } from "../hooks/useAuth";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="+not-found"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
