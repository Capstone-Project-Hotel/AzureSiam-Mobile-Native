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
import { COLORS } from "@/constants";

export default function Filter({ t }: any) {
  const { bookingDetail, setBookingDetail, currency } = useStore();

  const [range, setRange] = React.useState<CalendarRange<string>>({
    startDate: bookingDetail.startDate,
    endDate: bookingDetail.endDate,
  });

  const [selectedIndexForRoomTypes, setSelectedIndexForRoomTypes] =
    React.useState<IndexPath | IndexPath[]>([
      new IndexPath(0),
      new IndexPath(1),
      new IndexPath(2),
      new IndexPath(3),
      new IndexPath(4),
    ]);
  const [selectedIndexForRoomFeatures, setSelectedIndexForRoomFeatures] =
    React.useState<IndexPath | IndexPath[]>([]);

  const [selectedIndexForPrice, setSelectedIndexForPrice] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));

  return (
    <View
      style={{
        backgroundColor: COLORS.SECONDARY,
        paddingVertical: 20,
        paddingLeft: 10,
      }}
    >
      <ScrollView>
        {/* <Icon name="plus-circle-outline" /> */}
        {/* <Icon name="minus-circle-outline" /> */}
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {t("booking_detail")}
        </Text>
        {/* <Text style={{ color: "white" }}>Check-in date & Check-out date</Text> */}
        <RangeDatepicker
          style={{ width: 250 }}
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
        {/* <Text>
          {format(bookingDetail.startDate, "dd/MM/yyyy")} -{" "}
          {format(bookingDetail.endDate, "dd/MM/yyyy")}
        </Text> */}
        <View style={{ display: "flex", flexDirection: "row", columnGap: 20 }}>
          <View>
            <Text style={{ color: "white" }}>{t("adults")}</Text>
            <Input
              style={{ width: 150 }}
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
          </View>
          <View>
            <Text style={{ color: "white" }}>{t("children")}</Text>
            <Input
              style={{ width: 150 }}
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
          </View>
        </View>
        <Text style={{ color: "white" }}>{t("code")}</Text>
        <Input
          style={{ width: 200 }}
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
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {t("room_type")}
        </Text>
        <Select
          style={{ width: 400 }}
          multiSelect={true}
          selectedIndex={selectedIndexForRoomTypes}
          onSelect={(index: IndexPath[] | IndexPath) =>
            setSelectedIndexForRoomTypes(index)
          }
        >
          <SelectItem title="Standard" />
          <SelectItem title="Deluxe" />
          <SelectItem title="Family" />
          <SelectItem title="Suite" />
          <SelectItem title="Executive" />
        </Select>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {t("room_feature")}
        </Text>
        <Select
          style={{ width: 300 }}
          multiSelect={true}
          selectedIndex={selectedIndexForRoomFeatures}
          onSelect={(index: IndexPath[] | IndexPath) =>
            setSelectedIndexForRoomFeatures(index)
          }
        >
          <SelectItem title="Balcony" />
          <SelectItem title="Dinner Plans" />
          <SelectItem title="Jacuzzi" />
        </Select>
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {t("price")}
        </Text>
        <Select
          style={{ width: 300 }}
          selectedIndex={selectedIndexForPrice}
          onSelect={(index: IndexPath[] | IndexPath) =>
            setSelectedIndexForPrice(index)
          }
        >
          <SelectItem title="Any price is acceptable" />
          <SelectItem title="Not exceeding THB 1,500" />
          <SelectItem title="Not exceeding THB 2,000" />
          <SelectItem title="Not exceeding THB 2,500" />
        </Select>
      </ScrollView>
    </View>
  );
}
