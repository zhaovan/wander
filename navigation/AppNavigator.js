import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import { PastTripItineraryStack } from "./PastTripItineraryStack";
import { NewItineraryStack } from "./NewItineraryStack";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    PastTrips: PastTripItineraryStack,
    NewTrips: NewItineraryStack
  })
);
