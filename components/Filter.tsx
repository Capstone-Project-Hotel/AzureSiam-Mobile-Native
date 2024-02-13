import React from "react";
import { ScrollView, Text, View } from "react-native";
import useStore from "@/hooks/useStore";
import {
  Input,
  Icon,
  RangeDatepicker,
  CalendarRange,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { format } from "date-fns";

export default function Filter() {
  const { bookingDetail, setBookingDetail, currency } = useStore();

  const [range, setRange] = React.useState<CalendarRange<string>>({
    startDate: bookingDetail.startDate,
    endDate: bookingDetail.endDate,
  });

  const [selectedIndexForRoomTypes, setSelectedIndexForRoomTypes] =
    React.useState<IndexPath[]>([
      new IndexPath(0),
      new IndexPath(1),
      new IndexPath(2),
      new IndexPath(3),
      new IndexPath(4),
    ]);
  const [selectedIndexForRoomFeatures, setSelectedIndexForRoomFeatures] =
    React.useState<IndexPath[]>([]);

  const [selectedIndexForPrice, setSelectedIndexForPrice] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  return (
    <View>
      <ScrollView>
        {/* <Icon name="plus-circle-outline" /> */}
        {/* <Icon name="minus-circle-outline" /> */}
        <Text>Check-in date & Check-out date</Text>
        <RangeDatepicker
          range={range}
          onSelect={(nextRange: any) => {
            setRange(nextRange);

            if (nextRange.startDate && nextRange.endDate) {
              let startDate = new Date(nextRange.startDate);
              let endDate = new Date(nextRange.endDate);

              const formattedStartDate = startDate.toLocaleDateString("en-GB");
              const formattedEndDate = endDate.toLocaleDateString("en-GB");

              const updatedBookingDetail = {
                ...bookingDetail,
                startDate: startDate,
                endDate: endDate,
              };
              setBookingDetail(updatedBookingDetail);
            }
          }}
        />
        {/* <Icon name="minus-circle-outline" /> */}
        <Text>
          {format(bookingDetail.startDate, "dd/MM/yyyy")} -{" "}
          {format(bookingDetail.endDate, "dd/MM/yyyy")}
        </Text>
        <Text>Adults</Text>
        <Input
          keyboardType="numeric"
          placeholder="Adults"
          value={bookingDetail.adultNumber.toString()}
          onChangeText={(text) => {
            let updatedAdultNumber = parseInt(text);
            if (Number.isNaN(updatedAdultNumber)) {
              updatedAdultNumber = 1;
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
          value={
            bookingDetail.childrenNumber == 0
              ? ""
              : bookingDetail.childrenNumber.toString()
          }
          onChangeText={(text) => {
            let updatedChildrenNumber = parseInt(text);
            if (Number.isNaN(updatedChildrenNumber)) {
              updatedChildrenNumber = 1;
            }
            const updatedBookingDetail = {
              ...bookingDetail,
              childrenNumber: updatedChildrenNumber,
            };
            setBookingDetail(updatedBookingDetail);
          }}
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
        {/* {bookingDetail.codePromotion == "valid001" ? (
          <Text>Discount 20%</Text>
        ) : (
          <Text>No discount</Text>
        )} */}
        <Text>Room Type</Text>
        <Select
          multiSelect={true}
          selectedIndex={selectedIndexForRoomTypes}
          onSelect={(index: IndexPath[]) => setSelectedIndexForRoomTypes(index)}
        >
          <SelectItem title="Standard" />
          <SelectItem title="Deluxe" />
          <SelectItem title="Family" />
          <SelectItem title="Suite" />
          <SelectItem title="Executive" />
        </Select>
        <Text>Room Feature</Text>
        <Select
          multiSelect={true}
          selectedIndex={selectedIndexForRoomFeatures}
          onSelect={(index: IndexPath[]) =>
            setSelectedIndexForRoomFeatures(index)
          }
        >
          <SelectItem title="Balcony" />
          <SelectItem title="Dinner Plans" />
          <SelectItem title="Jacuzzi" />
        </Select>
        <Text>Price</Text>
        <Select
          selectedIndex={selectedIndexForPrice}
          onSelect={(index: IndexPath[]) => setSelectedIndexForPrice(index)}
        >
          <SelectItem title="Any price is acceptable" />
          <SelectItem title="Not exceeding {currency} 1,500" />
          <SelectItem title="Not exceeding {currency} 2,000" />
          <SelectItem title="Not exceeding {currency} 2,500" />
        </Select>
      </ScrollView>
    </View>
  );
}
