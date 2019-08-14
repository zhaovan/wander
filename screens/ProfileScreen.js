import React, { Component } from "react";
import {
  Card,
  CardItem,
  Body,
  Text,
  Tab,
  Tabs,
  View,
  H2,
  H3
} from "native-base";
import PreviousTripsTab from "../components/PreviousTripsTab";
import Settings from "../components/Settings";
import { ScrollView } from "react-native-gesture-handler";

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#042f4b" }}>
        <ScrollView style={{ backgroundColor: "#042f4b" }}>
          <Card transparent>
            <CardItem style={{ backgroundColor: "#042f4b" }}>
              <Body
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <H2 style={{ color: "white" }}>Hi Soha!</H2>
                <H3 style={{ color: "white", textAlign: "center", margin: 5 }}>
                  View past trips or change your settings below!
                </H3>
              </Body>
            </CardItem>
          </Card>
          <Tabs>
            <Tab heading="Previous Trips">
              <PreviousTripsTab navigation={this.props.navigation} />
            </Tab>
            <Tab heading="Settings">
              <Settings />
            </Tab>
          </Tabs>
        </ScrollView>
      </View>
    );
  }
}

export default ProfileScreen;
