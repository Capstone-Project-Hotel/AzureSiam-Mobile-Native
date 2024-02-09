import { View, Text } from "react-native";
import useStore from "@/hooks/useStore";

export default function SummaryCard({ page }: { page: string }) {
  const { bookingDetail, currency } = useStore();
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
        <Text>Standard Room</Text>
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
    </View>
  );
}
