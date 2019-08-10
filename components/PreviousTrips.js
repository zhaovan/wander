import React, { Component } from "react";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import pfp from "../assets/images/corgi.jpg";
import london from "../assets/images/london.jpg";

export default class PreviousTrips extends Component {
  render() {
    return (
      <Content>
        <Card style={{ height: 350 }}>
          <CardItem>
            <Left>
              <Thumbnail source={pfp} />
              <Body>
                <Text>London</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={london}
              style={{ height: 200, width: null, flex: 1 }}
              onPress={() => alert("hello!")}
            />
          </CardItem>
        </Card>
      </Content>
    );
  }
}
