import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import SearchBar from "../components/SearchBar";
import { MonoText } from "../components/StyledText";
import Trips from "../components/Trips";
import {
  H2,
  H3,
  H4,
  CardItem,
  Card,
  Header,
  Body,
  Button,
  H1,
  List,
  ListItem
} from "native-base";
import { TouchableHighlight } from "react-native-gesture-handler";

export function PastTripItinerary({ navigation }) {
  const city = navigation.getParam("city", "No City");
  const name = navigation.getParam("name", "No information available");
  const email = navigation.getParam("email", "No information available");
  const range = navigation.getParam("range", "No information available");
  const itinerary = navigation.getParam(
    "itinerary",
    "No information available"
  );
  const livingStreetAddress = navigation.getParam(
    "livingStreetAddress",
    "No information available"
  );
  const imageUrl = navigation.getParam("imageUrl", "No information available");
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <H2 style={{ textAlign: "center", margin: 30, color: "white" }}>{city}</H2>
        <Card transparent>
          <CardItem>
            <H1 style={{ textAlign: "center" }}>Travel Plans for {name}</H1>
          </CardItem>
          <CardItem>
            <Body>
              <H3>{range}</H3>
            </Body>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: imageUrl }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Text>You're staying at: </Text>
            <Text>{livingStreetAddress}</Text>
          </CardItem>
          <CardItem>
            <Text>Your plans for your trip:</Text>
          </CardItem>
          <CardItem>
            <View>
              {itinerary.map(({ name, types, vicinity }) => (
                <ListItem style={{ flexDirection: "column" }}>
                  <Text>Place: {name}</Text>
                  <Text>Type of Attraction: {types[0].toUpperCase()}</Text>
                  <Text>Address: {vicinity}</Text>
                </ListItem>
              ))}
            </View>
          </CardItem>
        </Card>
        <Button
          light
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text>Go Back</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

PastTripItinerary.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eb7070",
    textAlign: "center"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30,
    textAlign: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
