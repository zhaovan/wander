import React, { Component } from "react";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text
} from "native-base";

export default class SearchBar extends Component {
  render() {
    return (
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search for an upcoming trip!" />
        </Item>
      </Header>
    );
  }
}
