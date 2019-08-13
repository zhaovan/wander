import { createBrowserApp } from "@react-navigation/web";
import { createSwitchNavigator, createStackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import PastTripItineraryStack from "./PastTripItineraryStack";
import NewItineraryStack from "./NewItineraryStack";

const switchNavigator = createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  PastTrips: PastTripItineraryStack,
  NewTrips: NewItineraryStack
});
switchNavigator.path = "";

export default createBrowserApp(switchNavigator, { history: "hash" });
