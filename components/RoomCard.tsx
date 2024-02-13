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
  const { bookingDetail, setBookingDetail } = useStore();

  const handleBookNowClick = (roomType: string) => {
    const updatedBookingDetail = {
      ...bookingDetail,
      [`${roomType}RoomNumber`]: 1,
    };
    setBookingDetail(updatedBookingDetail);
  };
  return (
    <View style={{ backgroundColor: COLORS.BACKGROUND_1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 20 }}>{roomName}</Text>
          <Image
            source={{ uri: roomImage }}
            style={{ width: 100, height: 100 }}
          />
        </View>
        <View style={{ marginRight: 50, marginTop: 20 }}>
          <Text>{maxGuest}</Text>
          <Text>{bedType}</Text>
          <Text>{roomSize}</Text>
          <Text>{roomPrice}</Text>
        </View>
      </View>
      <Button
        onPress={() => handleBookNowClick(roomType)}
        style={{ width: 120, height: 50 }}
      >
        {t("book_now")}
      </Button>
    </View>
  );
}
