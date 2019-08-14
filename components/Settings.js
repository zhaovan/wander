import React, { Component } from "react";
import Trips from "./Trips";
import { View, TextInput, Image } from "react-native";
import { Card, Text, Body, CardItem } from "native-base";
import pfp from "../assets/images/profile-pic.png";
import { db } from "../config";

class Settings extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    isEditingName: false,
    isEditingPassword: false,
    username: "",
    password: "*********",
    email: "",
    profilePic: ""
  };

  async componentDidMount() {
    const { users } = this.state;
    const collection = await db.collection("users");

    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        // const { StartDate: startDate, EndDate: endDate } = doc.data();
        // let begin = startDate.split(" ");
        // let end = endDate.split(" ");
        // const range = `${begin[1]} ${begin[0]} ${begin[2]} - ${end[1]} ${
        //   end[0]
        // } ${end[2]}`;

        console.log(doc.data());
        this.setState({
          username: doc.data().Name,
          email: doc.data().Email,
          profilePic: doc.data().ProfilePic
        });
      });
    });
  }

  render() {
    return (
      <Card transparent>
        <CardItem>
          <Body>
            <Image
              source={{ uri: this.state.profilePic }}
              style={{ height: 150, width: 150 }}
            />
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
