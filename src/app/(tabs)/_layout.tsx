import React from "react";
import { Tabs } from "expo-router";
import { colors } from "@/constants/colors";
import { Icon } from "@/components/ui/icon";
import { HomeIcon, SearchIcon } from "lucide-react-native";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors?.violet,
        },
        tabBarActiveTintColor: colors?.antique,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon as={HomeIcon} color={color} size="xl" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon as={SearchIcon} color={color} size="xl" />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
