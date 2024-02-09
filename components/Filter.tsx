import { AppRegistry } from "react-native";
import React from "react";
import { InputItem } from "@ant-design/react-native";
import { ScrollView, Text, View } from "react-native";

export default function Filter() {
  return (
    <View>
      <ScrollView>
        <Text>Booking Detail</Text>
        <Text>Check-in date & Check-out date</Text>
        <Text>Adults</Text>
        <InputItem clear type="number" />
        <Text>Children</Text>
        <InputItem clear type="number" value="1" placeholder="number">
          Test
        </InputItem>
        <Text>Code Promotion</Text>
        <InputItem clear type="text" />
        <Text>Room Type</Text>
        <Text>Standard</Text>
        <Text>Deluxe</Text>
        <Text>Family</Text>
        <Text>Suite</Text>
        <Text>Executive</Text>
        <Text>Room Feature</Text>
        <Text>City View/Balcony</Text>
        <Text>Dinner Plans</Text>
        <Text>Jacuzzi</Text>
        <Text>Price</Text>
        <Text>Any price is acceptable</Text>
        <Text>Not exceeding THB 1,500</Text>
        <Text>Not exceeding THB 2,000</Text>
        <Text>Not exceeding THB 2,500</Text>
      </ScrollView>
    </View>
  );
}
