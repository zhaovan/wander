import React, { Component } from "react";
import {
  Container,
  Card,
  CardItem,
  Body,
  Text,
  Header,
  Content,
  Tab,
  Tabs,
  View,
  H2,
  H3,
  Left,
  Right
} from "native-base";
import { Image } from "react-native";
import PreviousTripsTab from "../components/PreviousTripsTab";
import Settings from "../components/Settings";
import pfp from "../assets/images/profile-pic.png";

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card transparent>
          <CardItem>
            <Body style={{ display: "flex" }}>
              <Text>Hi Soha!</Text>
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
      </View>
    );
  }
}

export default ProfileScreen;
