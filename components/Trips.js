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

  //trying to pull snapshot of the data
  async componentDidMount() {
    // var snapshot = await db.collection("users").get();
    // console.log(snapshot.docs);
    // snapshot = snapshot.docs;
    // let users = Object.values(snapshot);
    // console.log("users")
    // console.log(users);
    // this.setState({ users });

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

        console.log(doc.data());
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
            moment(Date.now()).isSameOrAfter(new Date(startDate))
          )
          .map(({ city, range, imageUrl, profilePic }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                this.props.navigation.navigate("PastTripScreen", {
                  city: city
                })
              }
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
