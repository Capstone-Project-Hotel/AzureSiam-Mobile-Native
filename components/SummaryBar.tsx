import useStore from "@/hooks/useStore";
import { View, Text, TouchableOpacity } from "react-native";

export default function SummaryBar({
  reservationAndGuestDetailHandler,
  t,
}: {
  reservationAndGuestDetailHandler: Function;
  t: any;
}) {
  const { currency, bookingDetail, exchangeRate } = useStore();

  let reducedRate = 1;
  let mondayAndFridayNightCount = 0;
  let saturdayNightCount = 0;
  let dayDuration = 1;

  if (bookingDetail.codePromotion === "valid001") {
    reducedRate = 0.8;
  }

  let mondayAndFridaySale =
    200 *
    mondayAndFridayNightCount *
    (bookingDetail.standardRoomNumber +
      bookingDetail.deluxeRoomNumber +
      bookingDetail.familyRoomNumber +
      bookingDetail.suiteRoomNumber +
      bookingDetail.executiveRoomNumber) *
    reducedRate *
    exchangeRate;
  let saturdayAdditionalCost =
    200 *
    saturdayNightCount *
    (bookingDetail.standardRoomNumber +
      bookingDetail.deluxeRoomNumber +
      bookingDetail.familyRoomNumber +
      bookingDetail.suiteRoomNumber +
      bookingDetail.executiveRoomNumber) *
    reducedRate *
    exchangeRate;

  let subTotal =
    (1200 * bookingDetail.standardRoomNumber +
      1800 * bookingDetail.deluxeRoomNumber +
      2200 * bookingDetail.familyRoomNumber +
      2500 * bookingDetail.suiteRoomNumber +
      3000 * bookingDetail.executiveRoomNumber -
      mondayAndFridaySale +
      saturdayAdditionalCost) *
    dayDuration;
  reducedRate * exchangeRate;

  if (bookingDetail.packageOne === true)
    subTotal += 299 * reducedRate * exchangeRate;
  if (bookingDetail.packageTwo === true)
    subTotal += 499 * reducedRate * exchangeRate;

  const serviceCharge = subTotal / 10;
  const taxesAndFees = (subTotal / 100) * 7;

  let totalPrice = subTotal + serviceCharge + taxesAndFees;

  let totalRooms =
    bookingDetail.standardRoomNumber +
    bookingDetail.deluxeRoomNumber +
    bookingDetail.familyRoomNumber +
    bookingDetail.suiteRoomNumber +
    bookingDetail.executiveRoomNumber;

  let totalGuests = bookingDetail.adultNumber + bookingDetail.childrenNumber;

  return (
    <View>
      <Text>
        {currency} {totalPrice} {t("total")}
      </Text>
      <Text>
        {totalRooms} room(s) {totalGuests} guest(s)
      </Text>
      <TouchableOpacity onPress={() => reservationAndGuestDetailHandler()}>
        <Text style={{ height: 55 }}>Go To Next Page</Text>
      </TouchableOpacity>
    </View>
  );
}
