import React from "react";
import { ScrollView, Text, View } from "react-native";
import useStore from "@/hooks/useStore";

export default function Filter() {
  const { bookingDetail, setBookingDetail } = useStore();
  return (
    <View>
      <ScrollView>
        <Text>Booking Detail</Text>

        <Text>Check-in date & Check-out date</Text>
        <Text>
          {bookingDetail.startDate} - {bookingDetail.endDate}
        </Text>
        <Text>Adults</Text>
        <Text>Children</Text>
        <Text>Code Promotion</Text>
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
        <Text>Not exceeding {currency} 1,500</Text>
        <Text>Not exceeding {currency} 2,000</Text>
        <Text>Not exceeding {currency} 2,500</Text>
      </ScrollView>
    </View>
  );
}
