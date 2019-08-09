import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ExpoLinksView } from "@expo/samples";
import SearchBar from "../components/LocationSearchBar";

export default function PlanScreen() {
  return (
    <ScrollView style={styles.container}>
      <SearchBar />
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
    backgroundColor: "#fff"
  }
});
