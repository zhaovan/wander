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
import {
  H2,
  CardItem,
  Card,
  Picker,
  Form,
  Button,
  DatePicker,
  ListItem,
  Separator,
  Left,
  Thumbnail,
  Body,
  Icon
} from "native-base";
import { db } from "../config";
import { unsplash } from "../unsplash";
import { toJson } from "unsplash-js";

export function NewItinerary({ navigation }) {
  const city = navigation.getParam("city", "No City");
  const [photo, setPhoto] = useState("");
  const [address, setAddress] = useState("");
  const [nearbyLocations, setLocations] = useState();
  const [savedLocations, setSavedLocations] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selected, setSelected] = useState("");
  const typesOfPlaces = [
    "amusement_park",
    "aquarium",
    "art_gallery",
    "atm",
    "bakery",
    "bank",
    "bar",
    "beauty_salon",
    "book_store",
    "bowling_alley",
    "bus_station",
    "cafe",
    "campground",
    "casino",
    "church",
    "city_hall",
    "clothing_store",
    "convenience_store",
    "courthouse",
    "department_store",
    "doctor",
    "embassy",
    "florist",
    "furniture_store",
    "gas_station",
    "gym",
    "hair_care",
    "hardware_store",
    "hindu_temple",
    "hospital",
    "jewelry_store",
    "library",
    "liquor_store",
    "lodging",
    "meal_delivery",
    "meal_takeaway",
    "mosque",
    "movie_rental",
    "movie_theater",
    "museum",
    "night_club",
    "painter",
    "park",
    "pet_store",
    "police",
    "restaurant",
    "school",
    "shoe_store",
    "shopping_mall",
    "spa",
    "stadium",
    "store",
    "subway_station",
    "supermarket",
    "synagogue",
    "taxi_stand",
    "train_station",
    "transit_station",
    "zoo"
  ];
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
            color: "white",
            fontWeight: "700"
          }}
        >
          City you're traveling to: {city}
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
          <CardItem style={{ flexDirection: "row" }}>
            <Text>Filter by point of interest!</Text>
            <Form>
              <Picker
                note
                mode="dropdown"
                style={{ width: 200 }}
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={selected}
                onValueChange={location => {
                  console.log(location);
                  setSelected(location);
                }}
              >
                {typesOfPlaces.map(location => (
                  <Picker.Item
                    key={location}
                    label={location.toUpperCase()}
                    value={location}
                  />
                ))}
              </Picker>
            </Form>
          </CardItem>
        </Card>
        <Button
          light
          rounded
          style={{ textAlign: "center", margin: 10 }}
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
              }&rankby=distance&type=${selected}&key=AIzaSyDptpVBCUtpS0B15wsxjCePizp31_lSVuQ`
            );
            const nearbyData = await nearbyResult.json();
            const { results } = nearbyData;
            setLocations(results);
            unsplash.photos
              .getRandomPhoto({ query: city, orientation: "landscape" })
              .then(toJson)
              .then(json => {
                setPhoto(json.urls.full);
              });
          }}
        >
          <Text primary rounded style={{ position: "absolute", left: "18%" }}>
            Search for a location near your hotel!
          </Text>
        </Button>
        <Separator bordered style={{ flex: 1, height: 50, marginTop: 50 }}>
          <Text>Locations in Itinerary (tap to delete):</Text>
        </Separator>
        {savedLocations ? (
          savedLocations.map(({ name, vicinity, types, icon }) => (
            <View style={{ flex: 1 }}>
              <ListItem thumbnail style={{ margin: 5 }}>
                <TouchableOpacity
                  key={name}
                  onPress={() => {
                    setSavedLocations([
                      ...savedLocations.filter(place => place.name != name)
                    ]);
                  }}
                >
                  <Left>
                    <Thumbnail source={{ uri: icon }} />
                  </Left>
                  <Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center"
                    }}
                  >
                    <Text style={styles.descriptionText}>Name: {name}</Text>
                    <Text style={styles.descriptionText}>
                      Location: {vicinity}
                    </Text>
                    <Text style={styles.descriptionText}>
                      Type of Point of Interest: {types[0]}
                    </Text>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            </View>
          ))
        ) : (
          <Text>Click on a location to add it here</Text>
        )}
        <Separator style={{ height: 50, textAlignVertical: "center" }} bordered>
          <Text>Possible locations to go to:</Text>
        </Separator>
        {nearbyLocations
          ? nearbyLocations.map(({ name, vicinity, types, icon }) => (
              <ListItem
                key={vicinity}
                thumbnail
                style={{ flex: 1, textAlign: "center" }}
              >
                <TouchableOpacity
                  onPress={e => {
                    setSavedLocations([
                      ...savedLocations,
                      { name, vicinity, types, icon }
                    ]);
                  }}
                >
                  <Left>
                    <Thumbnail source={{ uri: icon }} />
                  </Left>
                  <Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={styles.descriptionText}>Name: {name}</Text>
                    <Text style={styles.descriptionText}>
                      Location: {vicinity}
                    </Text>
                    <Text style={styles.descriptionText}>
                      Type of Point of Interest: {types[0]}
                    </Text>
                  </Body>
                </TouchableOpacity>
              </ListItem>
            ))
          : null}
        <Button
          primary
          style={{ margin: 20 }}
          onPress={() => {
            pushData(city, address, savedLocations, startDate, endDate, photo);
            navigation.navigate("HomeStack");
          }}
        >
          <Text
            style={{ textAlign: "center", position: "absolute", left: "37%" }}
          >
            Save this itinerary
          </Text>
        </Button>
        <Button
          bordered
          info
          rounded
          style={{ margin: 10 }}
          onPress={() => navigation.navigate("PlanStack")}
        >
          <Text style={{ position: "absolute", left: "45%", color: "white" }}>
            Go back!
          </Text>
        </Button>
      </ScrollView>
    </View>
  );
}

function pushData(city, address, savedLocations, startDate, endDate, photo) {
  db.collection("users")
    .add({
      Name: "Soha",
      Email: "soha@fakeemail.com",
      Location: city,
      LivingAddress: address,
      Itinerary: savedLocations,
      StartDate: startDate.toString(),
      EndDate: endDate.toString(),
      ProfilePic:
        "https://www.petpremium.com/wp-content/uploads/ppbr/breeds/pembroke-welch-corgi_profile_350x400.jpg",
      ImageUrl: photo
    })
    .then(ref => {
      console.log("Added document with ID: ", ref.id);
    });
  alert("Your new trip has been created!");
}

NewItinerary.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#042f4b"
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
  descriptionText: {
    color: "white"
  }
});
