import React, { Component } from "react";
import { Image, TouchableWithoutFeedback } from "react-native";
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body
} from "native-base";
import { db } from "../config";

export default class CurrentTrip extends Component {
  state = {
    users: []
  };

  // Trying to pull snapshot of the data
  async componentDidMount() {
    const collection = await db.collection("users");

    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        const { StartDate: startDate, EndDate: endDate } = doc.data();
        let begin = startDate.split(" ");
        let end = endDate.split(" ");
        const range = `${begin[0]} ${begin[1]} ${begin[2]} - ${end[0]} ${
          end[1]
        } ${end[2]}`;

        // console.log(doc.data());
        this.setState({
          users: [
            ...this.state.users,
            {
              name: doc.data().Name,
              email: doc.data().Email,
              startDate,
              endDate,
              itinerary: doc.data().Itinerary,
              livingStreetAddress: doc.data().LivingAddress,
              city: doc.data().Location,
              imageUrl: doc.data().ImageUrl,
              range,
              profilePic: doc.data().ProfilePic
            }
          ]
        });
      });
    });
  }

  render() {
    const { users } = this.state;
    const moment = require("moment");
    return (
      <Content>
        {users
          .filter(
            ({ startDate, endDate }) =>
              moment(Date.now()).isSameOrAfter(new Date(startDate)) &&
              moment(Date.now()).isSameOrBefore(new Date(endDate))
          )
          .map(
            ({
              city,
              name,
              email,
              itinerary,
              livingStreetAddress,
              range,
              imageUrl,
              profilePic
            }) => (
              <TouchableWithoutFeedback
                key={imageUrl}
                onPress={() => {
                  console.log(this.props);

                  this.props.navigation.navigate("PastTripScreen", {
                    city,
                    name,
                    email,
                    range,
                    itinerary,
                    livingStreetAddress,
                    imageUrl
                  });
                }}
              >
                <Card style={{ height: 350, backgroundColor: "#b6ffea" }}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: profilePic }} />
                      <Body>
                        <Text>{city}</Text>
                        <Text>{range}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{ uri: imageUrl }}
                      style={{ height: 200, width: null, flex: 1 }}
                    />
                  </CardItem>
                </Card>
              </TouchableWithoutFeedback>
            )
          )}
      </Content>
    );
  }
}
