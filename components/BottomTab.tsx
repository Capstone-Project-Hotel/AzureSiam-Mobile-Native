import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

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
  refProp,
}: {
  height?: number;
  contactUsHandler: Function;
  searchResultHandler: Function;
  refProp: any;
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
  const { t } = useTranslation();

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
  };

  const onModalClose = () => {
    setIsDatePickerVisible(false);
  };
  const styles = getStyles(height);
  return (
    <View style={styles.container}>
      <Modal
        visible={isDatePickerVisible}
        animationType="slide"
        transparent={false}
      >
        <AntDesign
          name="closecircleo"
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 24,
            paddingBottom: 8,
            paddingTop: 8,
          }}
          size={40}
          onPress={onModalClose}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          // keyboardVerticalOffset={100}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <View style={styles.calendarModalContainer}>
              {/* <AntDesign name="close" style={{alignSelf: "flex-end"}} size={40} onPress={onModalClose}/> */}
              {/* <Button onPress={onModalClose}>{t("return")}</Button> */}
              <View style={styles.customDateRange}>
                <CustomDateRange />
              </View>
              <View style={styles.lowestRemarkContainer}>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <Text style={styles.lowestLabelText}>
                    <Text style={styles.asterisk}>*</Text>
                    {t("lowest_price_remark")}
                  </Text>
                  <Text style={styles.lowestLabelText}>
                    <Text style={styles.asterisk}>*</Text>
                    {t("monday_and_friday_discount_remark")}
                  </Text>
                  <Text style={styles.lowestLabelText}>
                    <Text style={styles.asterisk}>*</Text>
                    {t("saturday_additional_cost_remark")}
                  </Text>
                </View>
              </View>
              <View style={styles.calendarModalLowerContainer}>
                {LineBreak}
                <View style={styles.calendarModalSection}>
                  <AppText styles={styles.section}>{t("guest")}</AppText>
                  <View style={styles.inputContainer}>
                    <AppText styles={styles.inputHeaderText}>
                      {t("adults")}
                    </AppText>
                    <TextInput
                      keyboardType="numeric"
                      value={bookingDetail.adultNumber.toString()}
                      onChangeText={(text) => {
                        setBookingDetail({
                          ...bookingDetail,
                          adultNumber: Number(text.replace(/[^0-9]/g, "")),
                        });
                      }}
                      placeholder="1"
                      maxLength={2}
                      onBlur={() => {
                        if (bookingDetail.adultNumber == 0) {
                          setBookingDetail({
                            ...bookingDetail,
                            adultNumber: 1,
                          });
                        }
                      }}
                    ></TextInput>
                    {/* <View style={styles.optionPicker}>
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
                    </View> */}
                  </View>
                  <View style={styles.inputContainer}>
                    <AppText styles={styles.inputHeaderText}>
                      {t("children")}
                    </AppText>
                    <TextInput
                      keyboardType="numeric"
                      value={bookingDetail.childrenNumber.toString()}
                      onChangeText={(text) => {
                        setBookingDetail({
                          ...bookingDetail,
                          childrenNumber: Number(text.replace(/[^0-9]/g, "")),
                        });
                      }}
                      placeholder="0"
                      maxLength={2}
                    ></TextInput>
                    {/* <View style={styles.optionPicker}>
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
                    </View> */}
                  </View>
                </View>
                {LineBreak}
                <View style={styles.calendarModalSection}>
                  <AppText styles={styles.section}>{t("have_code")}</AppText>
                  <View style={styles.inputContainer}>
                    <AppText styles={styles.inputHeaderText}>
                      {t("code")}
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
                  style={{ marginTop: 16 }}
                >
                  {t("confirm")}
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => {
            if (refProp) {
              refProp.scrollTo({ y: 0, animated: true });
            }
          }}
        >
          <AntDesign
            name="home"
            color={COLORS.PRIMARY}
            size={styles.tabItem.borderRadius}
          />
        </TouchableOpacity>
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
      marginBottom: 4,
    },
    inputContainer: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 4,
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
    lowestRemarkContainer: {
      paddingTop: 16,
      paddingLeft: 8,
      paddingRight: 8,
      paddingBottom: 4,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    asterisk: {
      color: "red",
      marginRight: 8,
    },
    lowestLabelText: {
      fontSize: 12,
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
