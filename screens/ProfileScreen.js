import React from "react";
import { ExpoConfigView } from "@expo/samples";
import { Container, Header, Left, Body, Right, Title } from "native-base";
import PreviousTrips from "../components/PreviousTrips";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView>
      <PreviousTrips />
      <PreviousTrips />
      <PreviousTrips />
      <PreviousTrips />
    </ScrollView>
  );
}
