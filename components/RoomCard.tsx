import { COLORS } from "@/constants";
import useStore from "@/hooks/useStore";
import { Button } from "@ui-kitten/components";
import { View, Text, Image } from "react-native";

export default function RoomCard({
  roomName,
  maxGuest,
  bedType,
  roomSize,
  roomPrice,
  roomImage,
  roomAmenities,
  roomDetail,
  roomType,
  //   isAvailable,
  //   disabledDate,
  t,
}: {
  roomName: string;
  maxGuest: number;
  bedType: string;
  roomSize: number;
  roomPrice: number;
  roomImage: string;
  roomAmenities: string[];
  roomDetail: string;
  roomType: string;
  //   isAvailable: boolean;
  //   disabledDate: string;
  t: any;
}) {
  const { bookingDetail, setBookingDetail, currency, exchangeRate } =
    useStore();

  const handleBookNowClick = (roomType: string) => {
    const updatedBookingDetail = {
      ...bookingDetail,
      [`${roomType}RoomNumber`]: 1,
    };
    setBookingDetail(updatedBookingDetail);
  };
  return (
    <View
      style={{
        backgroundColor: COLORS.BACKGROUND_1,
        borderRadius: 10,
        width: 350,
        padding: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 18 }}>{roomName}</Text>
          <Image
            source={{ uri: roomImage }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={{ marginRight: 20, marginTop: 20 }}>
          <Text>
            {t("maximum_guest")}: {maxGuest}
          </Text>
          <Text>
            {t("bed_type")}: {bedType}
          </Text>
          <Text>
            {t("size")}: {roomSize} m&sup2;
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          columnGap: 20,
        }}
      >
        <Text>
          {" "}
          {currency}{" "}
          {new Intl.NumberFormat("th-TH", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(roomPrice * exchangeRate)}
        </Text>
        <Button
          onPress={() => handleBookNowClick(roomType)}
          style={{ width: 120, height: 50 }}
        >
          {t("book_now")}
        </Button>
      </View>
    </View>
  );
}
