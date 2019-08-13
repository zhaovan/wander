import React, { useState } from "react";
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
import { db } from '../config';
import pfp from "../assets/images/corgi.jpg";
import london from "../assets/images/london.jpg";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ebebeb'
  }
});

function AllTrips(props) {


    const collection = await db.collection('users');
    let users = this.state.users;
    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        users = {
          name: doc.data().Name,
          email: doc.data().Email,
          startDate: doc.data().StartDate,
          endDate: doc.data().EndDate,
          itinerary: doc.data().Itinerary,
          livingName: doc.data().Living.Name,
          livingStreetAddress: doc.data().Living.StreetAddress,
          livingCity: doc.data().Living.City,  
          livingState: doc.data().Living.State,
          livingZipCode: doc.data().Living.ZipCode
        };
        let date = users.startDate;
        console.log(date);
        this.setState({ users });
      });
    });
  

    return (
      <Content>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("Trips", { users })
          }
        >
          <Card style={{ height: 350 }}>
            <CardItem>
              <Left>
                <Thumbnail source={pfp} />
                <Body>
                  <Text>{this.state.users.livingCity}</Text>
                  <Text>{this.state.users.name}</Text>
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
