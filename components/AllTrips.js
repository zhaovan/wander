import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  View,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { db } from "../config";
import pfp from "../assets/images/corgi.jpg";
import london from "../assets/images/london.jpg";
import Moment from "react-moment";
import date from "date";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ebebeb"
  }
});

export default class Trips extends Component {
  state = {
    users: []
  };

  // Trying to pull snapshot of the data
  async componentDidMount() {
    const { users } = this.state;
    const collection = await db.collection("users");

    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        const { StartDate: startDate, EndDate: endDate } = doc.data();
        let begin = startDate.split(" ");
        let end = endDate.split(" ");
        const range = `${begin[1]} ${begin[0]} ${begin[2]} - ${end[1]} ${
          end[0]
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
              //   livingName: doc.data().Living.Name,
              livingStreetAddress: doc.data().LivingAddress,
              //   livingCity: doc.data().Living.City,
              //   livingState: doc.data().Living.State,
              //   livingZipCode: doc.data().Living.ZipCode,
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
          .filter(({ startDate }) =>
            moment(Date.now()).isSameOrBefore(new Date(startDate))
          )
          .map(({ city, name, email, itinerary, livingStreetAddress, range, imageUrl, profilePic }) => (
            <TouchableWithoutFeedback
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
              <Card style={{ height: 350 }}>
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
          ))}
      </Content>
    );
  }
}
