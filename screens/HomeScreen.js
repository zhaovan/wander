import React from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { H2, H3, Header } from "native-base";
import AllTrips from "../components/AllTrips";
import CurrentTrip from "../components/CurrentTrip";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <H2
          style={{
            textAlign: "center",
            margin: 20,
            color: "white",
            paddingTop: 20
          }}
        >
          Welcome back, Soha!
        </H2>
        <View
          style={{
            backgroundColor: "#fbc99d",
            padding: 10,
            width: "98%",
            alignSelf: "center"
          }}
        >
          <H3 style={{ textAlign: "center", margin: 5, color: "black" }}>
            Current Trip
          </H3>
        </View>
        <CurrentTrip navigation={navigation} />
        <View
          style={{
            backgroundColor: "#cf455c",
            textAlignVertical: "center",
            padding: 10,
            width: "98%",
            alignSelf: "center"
          }}
        >
          <H3
            style={{
              textAlign: "center",
              margin: 5,
              color: "white"
            }}
          >
            Upcoming Trips
          </H3>
        </View>
        <AllTrips navigation={navigation} />
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#042f4b"
  },
  contentContainer: {
    paddingTop: 30
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
