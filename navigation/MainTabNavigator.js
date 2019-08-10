import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import PlanScreen from "../screens/PlanScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SignIn from "../screens/SignIn";
import PastTripItinerary from "../screens/PastTripItinerary";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

HomeStack.path = "";

const PlanStack = createStackNavigator(
  {
    Plan: PlanScreen
  },
  config
);

PlanStack.navigationOptions = {
  tabBarLabel: "Plan a Trip!",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  )
};

PlanStack.path = "";

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-contact" : "md-person"}
    />
  )
};

ProfileStack.path = "";

const tabNavigator = createBottomTabNavigator(
  {
    PlanStack: {
      screen: PlanStack
    },
    HomeStack: {
      screen: HomeStack
    },
    ProfileStack: {
      screen: ProfileStack
    }
  },
  { initialRouteName: "HomeStack" }
);

tabNavigator.path = "";

export default tabNavigator;
