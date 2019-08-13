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

    const collection = await db.collection("users");
    let users = this.state.users;
    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        const { StartDate: startDate, EndDate: endDate } = doc.data();
        let begin = startDate.split(" ");
        let end = endDate.split(" ");
        const range = `${begin[1]} ${begin[0]} ${begin[2]} - ${end[1]} ${
          end[0]
        } ${end[2]}`;
        users = {
          name: doc.data().Name,
          email: doc.data().Email,
          startDate,
          endDate,
          itinerary: doc.data().Itinerary,
          livingName: doc.data().Living.Name,
          livingStreetAddress: doc.data().Living.StreetAddress,
          livingCity: doc.data().Living.City,
          livingState: doc.data().Living.State,
          livingZipCode: doc.data().Living.ZipCode,
          range
        };
        this.setState({ users });
      });
    });
  }

  render() {
    // start = start.getMonth() + 1 +'/'+ start.getDate() + '/' + start.getFullYear();
    // console.log(start);
    return (
      <Content>
        <TouchableWithoutFeedback
          onPress={() => this.props.navigation.navigate("Trips", { users })}
        >
          <Card style={{ height: 350 }}>
            <CardItem>
              <Left>
                <Thumbnail source={pfp} />
                <Body>
                  <Text>{this.state.users.livingCity}</Text>
                  <Text>{this.state.users.range}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={london}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
          </Card>
        </TouchableWithoutFeedback>
      </Content>
    );
  }
}
