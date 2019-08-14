import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import SearchBar from "../components/LocationSearchBar";

export default function PlanScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <SearchBar navigation={navigation} />
    </ScrollView>
  );
}

PlanScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#eb7070"
  }
});
