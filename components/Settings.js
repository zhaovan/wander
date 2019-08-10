import React, { Component } from "react";
import PreviousTrips from "./PreviousTrips";
import { View, TextInput, Image } from "react-native";
import { Card, Text, Body, CardItem } from "native-base";
import pfp from "../assets/images/profile-pic.png";

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isEditingName: false,
    isEditingPassword: false,
    username: "Potatoes",
    password: "*********"
  };

  render() {
    return (
      <Card transparent>
        <CardItem>
          <Body>
            <Image source={pfp} style={{ height: 150, width: 150 }} />
            {this.state.isEditingName ? (
              <TextInput
                value={this.state.username}
                onChangeText={value => this.setState({ username: value })}
                autoFocus
                onBlur={() => this.setState({ isEditingName: false })}
              />
            ) : (
              <Text onPress={() => this.setState({ isEditingName: true })}>
                Username: {this.state.username}
              </Text>
            )}
            {this.state.isEditingPassword ? (
              <TextInput
                value={this.state.password}
                onChangeText={value => this.setState({ password: value })}
                autoFocus
                onBlur={() => this.setState({ isEditingPassword: false })}
              />
            ) : (
              <Text onPress={() => this.setState({ isEditingPassword: true })}>
                Password: {this.state.password}
              </Text>
            )}
            <Text>Joined on: 8/9/19</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default Settings;
