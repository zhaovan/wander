import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import SearchBar from "../components/SearchBar";
import { MonoText } from "../components/StyledText";
import {
  H2,
  CardItem,
  Card,
  Header,
  Button,
  DatePicker,
  ListItem,
  Separator
} from "native-base";
import { arrayExpression } from "@babel/types";

export function NewItinerary({ navigation }) {
  const city = navigation.getParam("city", "No City");

  const [address, setAddress] = useState("");
  const [nearbyLocations, setLocations] = useState();
  const [savedLocations, setSavedLocations] = useState([]);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <H2
          style={{
            textAlign: "center",
            margin: 30,
            backgroundColor: "#FFC0CB"
          }}
        >
          City your're traveling to: {city}
        </H2>
        <Card transparent>
          <CardItem>
            <Text>Please input your travel dates: Leave</Text>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </CardItem>
          <CardItem>
            <Text>Return:</Text>
            <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
            />
          </CardItem>
          <CardItem>
            <Text>Enter place of stay address: </Text>
            <TextInput
              placeholder="Enter here!"
              value={address}
              onChangeText={add => setAddress(add)}
            />
          </CardItem>
        </Card>
        <Button
          light
          rounded
          style={{ textAlign: "center" }}
          onPress={async () => {
            const mapResult = await fetch(
              `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=geometry,photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyDptpVBCUtpS0B15wsxjCePizp31_lSVuQ`
            );
            const mapData = await mapResult.json();
            const { location } = mapData.candidates[0].geometry;
            const nearbyResult = await fetch(
              `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
                location.lat
              },${
                location.lng
              }&rankby=distance&key=AIzaSyDptpVBCUtpS0B15wsxjCePizp31_lSVuQ`
            );
            const nearbyData = await nearbyResult.json();
            const { results } = nearbyData;
            console.log(nearbyData);
            setLocations(results);
          }}
        >
          <Text primary>Search for a locations near your hotel!</Text>
        </Button>
        <Separator bordered style={{ flex: 1 }}>
          <Text>Locations in Itinerary:</Text>
        </Separator>
        {savedLocations ? (
          savedLocations.map(({ name, vicinity, types }) => (
            <ListItem style={{ display: "flex", flexDirection: "column" }}>
              <TouchableOpacity>
                <Text>Name: {name}</Text>
                <Text>Location: {vicinity}</Text>
                <Text>Type of Point of Interest: {types[0]}</Text>
              </TouchableOpacity>
            </ListItem>
          ))
        ) : (
          <Text>Click on a location to add it here</Text>
        )}
        <Separator bordered>
          <Text>Possible locations to go to:</Text>
        </Separator>
        {nearbyLocations
          ? nearbyLocations.map(({ name, vicinity, types }) => (
              <ListItem style={{ display: "flex", flexDirection: "column" }}>
                <TouchableOpacity
                  onPress={e => {
                    setSavedLocations([
                      ...savedLocations,
                      { name, vicinity, types }
                    ]);
                  }}
                >
                  <Text>Name: {name}</Text>
                  <Text>Location: {vicinity}</Text>
                  <Text>Type of Point of Interest: {types[0]}</Text>
                </TouchableOpacity>
              </ListItem>
            ))
          : null}
        <Button transparent onPress={() => navigation.navigate("HomeStack")}>
          <Text>Save this itinerary</Text>
        </Button>
        <Button transparent onPress={() => navigation.navigate("PlanStack")}>
          <Text>Go back!</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

NewItinerary.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
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
