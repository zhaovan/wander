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
  Separator,
  Left,
  Thumbnail,
  Body
} from "native-base";
import { db } from "../config";
export function NewItinerary({ navigation }) {
  const city = navigation.getParam("city", "No City");

  const [address, setAddress] = useState("");
  const [nearbyLocations, setLocations] = useState();
  const [savedLocations, setSavedLocations] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
              onDateChange={add => setStartDate(add)}
              disabled={false}
            />
          </CardItem>
          <CardItem>
            <Text>Return:</Text>
            <DatePicker
              defaultDate={new Date()}
              minimumDate={new Date()}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{ color: "green" }}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={add => setEndDate(add)}
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
            <ListItem thumbnail>
              <TouchableOpacity>
                <Left>
                  <Thumbnail source={{ uri: icon }} />
                </Left>
                <Body style={{ display: "flex", flexDirection: "column" }}>
                  <Text>Name: {name}</Text>
                  <Text>Location: {vicinity}</Text>
                  <Text>Type of Point of Interest: {types[0]}</Text>
                </Body>
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
          ? nearbyLocations.map(({ name, vicinity, types, icon }) => (
              <ListItem thumbnail>
                <TouchableOpacity
                  onPress={e => {
                    setSavedLocations([
                      ...savedLocations,
                      { name, vicinity, types }
                    ]);
                  }}
                >
                  <Left>
                    <Thumbnail source={{ uri: icon }} />
                  </Left>
                  <Body style={{ display: "flex", flexDirection: "column" }}>
                    <Text>Name: {name}</Text>
                    <Text>Location: {vicinity}</Text>
                    <Text>Type of Point of Interest: {types[0]}</Text>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            ))
          : null}
        <Button
          transparent
          Text="Save This Itinerary"
          onPress={() =>
            pushData(city, address, savedLocations, startDate, endDate)
          }
        >
          <Text>Save this itinerary</Text>
        </Button>
        <Button transparent onPress={() => navigation.navigate("PlanStack")}>
          <Text>Go back!</Text>
        </Button>
      </ScrollView>
    </View>
  );
}

function pushData(city, address, savedLocations, startDate, endDate) {
  const addDoc = db
    .collection("users")
    .add({
      Name: "Soha",
      Email: "soha@fakeemail.com",
      Location: city,
      LivingAddress: address,
      Itinerary: savedLocations,
      StartDate: startDate,
      EndDate: endDate,
      ProfilePic:
        "https://www.petpremium.com/wp-content/uploads/ppbr/breeds/pembroke-welch-corgi_profile_350x400.jpg"
    })
    .then(ref => {
      console.log("Added document with ID: ", ref.id);
    });
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
