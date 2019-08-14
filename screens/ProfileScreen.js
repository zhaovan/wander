import React, { Component } from "react";
import { Card, CardItem, Body, Text, Tab, Tabs, View } from "native-base";
import PreviousTripsTab from "../components/PreviousTripsTab";
import Settings from "../components/Settings";
import { ScrollView } from "react-native-gesture-handler";

class ProfileScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Card transparent>
            <CardItem>
              <Body
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <Text>Hi Soha!</Text>
                <Text>View past trips or change your settings below!</Text>
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
