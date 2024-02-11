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
          {bookingDetail.startDate.toString()} - {bookingDetail.endDate.toString()}
        </Text>
        <Text>Adults: {bookingDetail.adultNumber}</Text>
        <Text>Children: {bookingDetail.childrenNumber}</Text>
        <Text>Code Promotion: {bookingDetail.codePromotion}</Text>
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
