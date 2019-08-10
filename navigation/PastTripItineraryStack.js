import PTI from "../screens/PastTripItinerary";
import { createStackNavigator } from "react-navigation";
import { Platform } from "react-native";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

export const PastTripItineraryStack = createStackNavigator(
  {
    PastTripItinerary: PTI
  },
  config
);

PastTripItineraryStack.path = "";
