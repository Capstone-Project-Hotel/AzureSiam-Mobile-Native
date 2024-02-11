import { View, Text, TouchableOpacity } from "react-native";
import useStore from "@/hooks/useStore";
import { Button } from "@ui-kitten/components";

export default function SummaryCard({
  page,
  confirmBooking,
}: {
  page: string;
  confirmBooking: Function;
}) {
  const { bookingDetail, setBookingDetail, currency } = useStore();
  return (
    <View>
      <Text>Booking Detail</Text>
      <Text>
        {bookingDetail.startDate} - {bookingDetail.endDate}
      </Text>
      <Text>2 night(s)</Text>
      <Text>
        {bookingDetail.adultNumber} adult(s), {bookingDetail.childrenNumber}{" "}
        children
      </Text>
      {bookingDetail.standardRoomNumber != 0 ? (
        <View>
          <Text>Standard Room {bookingDetail.standardRoomNumber} room(s)</Text>
          <Button
            onPress={() => {
              const updatedBookingDetail = {
                ...bookingDetail,
                standardRoomNumber: 0,
              };
              setBookingDetail(updatedBookingDetail);
            }}
          >
            remove
          </Button>
        </View>
      ) : (
        <Text>No Standard Room</Text>
      )}
      {bookingDetail.packageOne ? (
        <Text>Transportation [Package One]</Text>
      ) : (
        <Text>No Transportation [Package One]</Text>
      )}
      <Text>Sub Total</Text>
      <Text>{currency}</Text>
      <Text>Service Charge (10%)</Text>
      <Text>Texes + Fee (7%)</Text>
      <Text>{currency} 1,000 Total</Text>
      <TouchableOpacity
        onPress={() => {
          confirmBooking();
        }}
      >
        <Text style={{ height: 55 }}>
          Go To Reservation and Guest Detail Page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
