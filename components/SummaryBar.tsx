import useStore from "@/hooks/useStore";
import { Button, Input } from "@ui-kitten/components";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import AppText from "./AppText";

const RoomNumberInput = ({
  roomType,
  value,
  onChange,
}: {
  roomType: string;
  value: number;
  onChange: Function;
}) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex">
      <View
      // className="text-[15px] mobile:text-[8px]"
      // onClick={handleDecrease}
      />

      <Input
        value={value.toString()}
        onChange={(newValue) => {
          const updatedValue = typeof newValue === "number" ? newValue : 1;
          onChange(updatedValue);
        }}
      />

      <View
      // className="text-[15px] mobile:text-[8px]"
      // onClick={handleIncrease}
      />
    </div>
  );
};

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

  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      {showModal ? (
        <Modal style={style.calendarModalLowerContainer}>
          <Button onPress={() => setShowModal(false)}>Dismiss</Button>
          <View>
            <View>
              <AppText>
                {bookingDetail.adultNumber} {t("adults")}{" "}
                {bookingDetail.childrenNumber} {t("children")}
              </AppText>

              <View>
                <AppText>Adults</AppText>
              </View>
              <View>
                <AppText>Children</AppText>
                <View></View>
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        <View>
          <Text>
            {currency} {totalPrice} {t("total")}
          </Text>
          <Text>
            {totalRooms} room(s) {totalGuests} guest(s)
          </Text>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text style={{ height: 55 }}>Show Modal</Text>
          </TouchableOpacity>
          <Button onPress={() => reservationAndGuestDetailHandler()}>
            <Text style={{ height: 55 }}>Confirm</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  calendarModalLowerContainer: {
    paddingHorizontal: 24,
    position: "absolute",
    top: 0,
  },
  calendarModalSection: {
    flexDirection: "column",
  },
  section: {
    fontSize: 16,
  },
  inputContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputHeaderText: {
    fontSize: 16,
  },
  inputTextArea: {},
  optionPicker: {
    width: 120,
    // height: 50,
    borderColor: "grey",
    borderWidth: 0.5,
  },
});
