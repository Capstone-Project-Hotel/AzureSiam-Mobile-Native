import React from "react";
import { ScrollView, Text, View } from "react-native";
import useStore from "@/hooks/useStore";
import { Input, Icon, RangeDatepicker } from "@ui-kitten/components";

export default function Filter() {
  const { bookingDetail, setBookingDetail, currency } = useStore();

  const [range, setRange] = React.useState({});

  return (
    <View>
      <ScrollView>
        {/* <Icon name="plus-circle-outline" /> */}
        {/* <Icon name="minus-circle-outline" /> */}

        <Text>Check-in date & Check-out date</Text>
        <RangeDatepicker
          range={range}
          onSelect={(nextRange) => setRange(nextRange)}
        />
        {/* <Icon name="minus-circle-outline" /> */}
        <Text>
          {bookingDetail.startDate.toString()} -{" "}
          {bookingDetail.endDate.toString()}
        </Text>
        <Text>Adults</Text>
        <Input
          keyboardType="numeric"
          placeholder="Adults"
          value={bookingDetail.adultNumber.toString()}
          onChangeText={(text) => {
            let updatedAdultNumber = parseInt(text);
            if (Number.isNaN(updatedAdultNumber)) {
              updatedAdultNumber = 0;
            }
            const updatedBookingDetail = {
              ...bookingDetail,
              adultNumber: updatedAdultNumber,
            };
            setBookingDetail(updatedBookingDetail);
          }}
        />
        <Text>Children</Text>
        <Input
          keyboardType="numeric"
          placeholder="Children"
          value={bookingDetail.childrenNumber.toString()}
        />
        <Text>Code Promotion</Text>
        <Input
          placeholder="Code Promotion"
          keyboardType="default"
          value={bookingDetail.codePromotion}
          onChangeText={(text) => {
            let updatedCodePromotion = text;
            const updatedBookingDetail = {
              ...bookingDetail,
              codePromotion: updatedCodePromotion,
            };
            setBookingDetail(updatedBookingDetail);
          }}
        />
        {/* <Text>Room Type</Text>
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
        <Text>Not exceeding {currency} 2,500</Text> */}
      </ScrollView>
    </View>
  );
}
