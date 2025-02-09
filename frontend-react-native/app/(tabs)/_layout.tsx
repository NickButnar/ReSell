import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
        }}
      />
    </Tabs>
  )
}
