import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants";
import CustomDateRange from "./CustomDateRange";
import useStore from "@/hooks/useStore";
import { Button, Input } from "@ui-kitten/components";
import AppText from "./AppText";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-gesture-handler";

const BOTTOM_BAR_HEIGHT = 40;
const TAB_ITEM_RADIUS = 30;
const LineBreak = (
  <View
    style={{
      height: 2,
      backgroundColor: COLORS.BACKGROUND_1,
      marginVertical: 16,
    }}
  />
);

export default function BottomTab({
  height,
  contactUsHandler,
  searchResultHandler,
}: {
  height?: number;
  contactUsHandler: Function;
  searchResultHandler: Function;
}) {
  const {
    bookingDetail,
    setBookingDetail,
    setCardType,
    setGuests,
    setPaymentDetail,
    setSpecialReq,
  } = useStore();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const onClickCalendar = () => {
    setIsDatePickerVisible(true);
  };

  const handleNewBooking = () => {
    const emptyGuest: Guest = {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      country: "",
      city: "",
      zipCode: "",
      address: "",
      id: "",
      idType: "",
    };

    setGuests([emptyGuest]);

    const emptyPaymentDetail: PaymentDetail = {
      cardHolderName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    };

    setPaymentDetail(emptyPaymentDetail);

    const emptyBookingDetail: BookingDetail = {
      startDate: "",
      endDate: "",
      adultNumber: 1,
      childrenNumber: 0,
      codePromotion: "",
      standardRoomNumber: 0,
      deluxeRoomNumber: 0,
      familyRoomNumber: 0,
      suiteRoomNumber: 0,
      executiveRoomNumber: 0,
      packageOne: false,
      packageTwo: false,
      isCheckedPDPA: false,
      bookingId: "",
      showStandard: true,
      showDeluxe: true,
      showFamily: true,
      showSuite: true,
      showExecutive: true,
      showOnlyBalcony: false,
      showOnlyDinnerPlan: false,
      showOnlyJacuzzi: false,
      showBelowOption1: false,
      showBelowOption2: false,
      showBelowOption3: false,
    };

    setBookingDetail(emptyBookingDetail);
    setCardType("");
    setSpecialReq("");
    console.log("new store");
  };

  const onModalClose = () => {
    setIsDatePickerVisible(false);
  };
  const styles = getStyles(height);
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={100}
        // style={{flex:1}}
      >
        <Modal
          visible={isDatePickerVisible}
          animationType="slide"
          transparent={false}
        >
          <View style={styles.calendarModalContainer}>
            <Button onPress={onModalClose}>Dismiss</Button>
            <View style={styles.customDateRange}>
              <CustomDateRange />
            </View>
            <View style={styles.calendarModalLowerContainer}>
              {LineBreak}
              <View style={styles.calendarModalSection}>
                <AppText styles={styles.section}>Guest</AppText>
                <View style={styles.inputContainer}>
                  <AppText styles={styles.inputHeaderText}>Adults</AppText>
                  <View style={styles.optionPicker}>
                    <Picker
                      selectedValue={bookingDetail.adultNumber}
                      onValueChange={(itemValue, itemIndex) =>
                        setBookingDetail({
                          ...bookingDetail,
                          adultNumber: itemValue,
                        })
                      }
                    >
                      <Picker.Item label="0" value={0} />
                      <Picker.Item label="1" value={1} />
                      <Picker.Item label="2" value={2} />
                      <Picker.Item label="3" value={3} />
                      <Picker.Item label="4" value={4} />
                    </Picker>
                  </View>
                </View>
                <View style={styles.inputContainer}>
                  <AppText styles={styles.inputHeaderText}>Children</AppText>
                  <View style={styles.optionPicker}>
                    <Picker
                      selectedValue={bookingDetail.childrenNumber}
                      onValueChange={(itemValue, itemIndex) =>
                        setBookingDetail({
                          ...bookingDetail,
                          childrenNumber: itemValue,
                        })
                      }
                    >
                      <Picker.Item label="0" value={0} />
                      <Picker.Item label="1" value={1} />
                      <Picker.Item label="2" value={2} />
                      <Picker.Item label="3" value={3} />
                      <Picker.Item label="4" value={4} />
                    </Picker>
                  </View>
                </View>
              </View>
              {LineBreak}
              <View style={styles.calendarModalSection}>
                <AppText styles={styles.section}>Have a code?</AppText>
              </View>
              {LineBreak}
              <View style={styles.calendarModalSection}>
                <AppText styles={styles.section}>Guest</AppText>
                <View style={styles.inputContainer}>
                  <AppText styles={styles.inputHeaderText}>
                    Code Promotion
                  </AppText>
                  <TextInput
                    value={bookingDetail.codePromotion}
                    onChangeText={(text) => {
                      setBookingDetail({
                        ...bookingDetail,
                        codePromotion: text,
                      });
                    }}
                    placeholder="enter"
                    maxLength={10}
                  ></TextInput>
                </View>
              </View>
              <Button
                onPress={() => {
                  searchResultHandler();
                  onModalClose();
                }}
              >
                Confirm
              </Button>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      <View style={styles.tabContainer}>
        <View style={styles.tabItem}>
          <AntDesign
            name="home"
            color={COLORS.PRIMARY}
            onPress={() => {}}
            size={styles.tabItem.borderRadius}
          />
        </View>
        <Pressable
          onPress={() => {
            onClickCalendar();
            handleNewBooking();
          }}
        >
          <View style={styles.tabItem}>
            <AntDesign
              name="calendar"
              color={COLORS.PRIMARY}
              size={styles.tabItem.borderRadius}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            contactUsHandler();
          }}
        >
          <View style={styles.tabItem}>
            <AntDesign
              name="contacts"
              color={COLORS.PRIMARY}
              size={styles.tabItem.borderRadius}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (height: number | undefined) => {
  const bottomBarHeight = height ?? BOTTOM_BAR_HEIGHT;
  const tabItemRadius = height ? height - 10 : TAB_ITEM_RADIUS;
  return StyleSheet.create({
    container: {
      backgroundColor: COLORS.PRIMARY,
      height: bottomBarHeight,
      marginTop: 0,
      paddingTop: 0,
    },
    tabContainer: {
      backgroundColor: "transparent",
      // position: "absolute",
      top: -(bottomBarHeight / 2),
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    tabItem: {
      width: tabItemRadius * 2,
      height: tabItemRadius * 2,
      borderRadius: tabItemRadius,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    tabIcon: {},
    calendarModalContainer: {
      flexDirection: "column",
      // paddingHorizontal: 8,
    },
    customDateRange: {
      alignItems: "center",
    },
    calendarModalLowerContainer: {
      paddingHorizontal: 24,
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
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "red",
//     height: BOTTOM_BAR_HEIGHT,
//     marginTop: 0,
//     paddingTop: 0,
//   },
//   tabContainer: {
//     backgroundColor: "transparent",
//     // position: "absolute",
//     top: -(BOTTOM_BAR_HEIGHT / 2),
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
//   tabItem: {
//     width: TAB_ITEM_RADIUS * 2,
//     height: TAB_ITEM_RADIUS * 2,
//     borderRadius: TAB_ITEM_RADIUS, // halve width&height
//     backgroundColor: "white",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   tabIcon: {

//   }
// });
