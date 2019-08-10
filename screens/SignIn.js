import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { 
    Header, 
    Body, 
    Card, 
    Container, 
    Content, 
    Button, 
    Form, 
    FormLabel, 
    FormInput,
    Item,
    Input, 
    CardItem, 
    Left, 
    Text } from "native-base";

import SearchBar from "../components/LocationSearchBar";

export default function SignIn() {
    return (
    <Container>
       <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          <Button>
            <Text>Sign In</Text>
          </Button>
          </Form>
        </Content>
    </Container>
    );
}

SignIn.navigationOptions = {
    header: null
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    }
});