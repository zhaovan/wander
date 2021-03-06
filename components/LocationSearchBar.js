import React from "react";
import { Header, Icon, Text } from "native-base";

import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

var city = "";

const GooglePlacesInput = ({ navigation }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search for a city to travel to!"
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="auto" // true/false/undefined
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        city = data.description;
        navigation.navigate("NewItineraryScreen", { city: city });
        console.log("Redirected!");
      }}
      // getDefaultValue={() => ""}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: "AIzaSyDptpVBCUtpS0B15wsxjCePizp31_lSVuQ",
        language: "en", // language of the results
        types: "(cities)" // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: "100%"
        },
        description: {
          fontWeight: "bold",
          color: "black",
          paddingLeft: 25
        },
        container: {
          backgroundColor: "white"
        }
      }}
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: "distance",
        types: "food"
      }}
      filterReverseGeocodingByTypes={[
        "locality",
        "administrative_area_level_3"
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200}
      renderLeftButton={() => (
        <Icon name="ios-search" style={{ marginTop: 6, marginLeft: 5 }} />
      )}
    />
  );
};

function LocationSearchBar({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text style={{ paddingTop: 10 }}>
          To start a new trip, add your city of interest!
        </Text>
      </Header>
      <GooglePlacesInput navigation={navigation} />
    </View>
  );
}

export default LocationSearchBar;
