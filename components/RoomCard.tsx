import useStore from "@/hooks/useStore";
import { Button } from "@ui-kitten/components";
import { View, Text } from "react-native";

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
    // Create the updatedBookingDetail object with the new room number
    const updatedBookingDetail = {
      ...bookingDetail,
      [`${roomType}RoomNumber`]: 1,
    };
    // disable
    // console.log(updatedBookingDetail);

    // Set the updated bookingDetail
    setBookingDetail(updatedBookingDetail);
  };
  return (
    <View>
      <Text>{roomName}</Text>
      <Text>{maxGuest}</Text>
      <Text>{bedType}</Text>
      <Text>{roomSize}</Text>
      <Text>{roomPrice}</Text>
      <Button onPress={() => handleBookNowClick(roomType)}>
        {t("book_now")}
      </Button>
    </View>
  );
}
