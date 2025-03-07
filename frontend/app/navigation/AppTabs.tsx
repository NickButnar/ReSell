import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import HomeHeader from "../../components/HomeHeader";
import CreatePost from '../screens/CreatePost'
import React, { useState } from "react";


export default function AppTabs() {
  const Tab = createBottomTabNavigator();

  const [category, setCategory] = useState<string>('');
  const onDataChanged = (category: string) => {
    setCategory(category)
    console.log(category, 'category!!!!!!!!!!!!!!!')
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
    <Tab.Screen
      name="Home"
      component={() => <Home category={category} />}
      options={{
        header: () => <HomeHeader onCategoryChanged={onDataChanged} />,
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="home" size={size} color={color} />
        ),
      }}
    />

      <Tab.Screen
        name="Create post"
        component={CreatePost}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="plus" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
