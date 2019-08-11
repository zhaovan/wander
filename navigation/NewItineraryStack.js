import { NewItinerary } from "../screens/NewItinerary";
import { createStackNavigator } from "react-navigation";
import { Platform } from "react-native";

const config = Platform.select({
  web: { headerMode: "screen" },
  default: {}
});

export const NewItineraryStack = createStackNavigator(
  {
    NewItineraryScreen: NewItinerary
  },
  config
);

NewItineraryStack.path = "";
