import useStore from "@/hooks/useStore";
import { Button, Input } from "@ui-kitten/components";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import AppText from "./AppText";
import { COLORS } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

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
    <View
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <TouchableOpacity onPress={handleDecrease}>
        <AntDesign name="minuscircle" size={16} color="black" />
      </TouchableOpacity>

      <Input
        size="small"
        value={value.toString()}
        keyboardType="number-pad"
        onChange={(newValue) => {
          const updatedValue = typeof newValue === "number" ? newValue : 1;
          onChange(updatedValue);
        }}
      />

      <TouchableOpacity onPress={handleIncrease}>
        <AntDesign name="pluscircle" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default function SummaryBar({
  reservationAndGuestDetailHandler,
  summaryBookingDetailHandler,
  isDisabledConfirm,
  page,
  t,
}: {
  reservationAndGuestDetailHandler: Function;
  summaryBookingDetailHandler: Function;
  isDisabledConfirm: boolean;
  page: String;
  t: any;
}) {
  const { bookingDetail, setBookingDetail, exchangeRate, currency } =
    useStore();

  let mondayAndFridayNightCount = 0;
  let saturdayNightCount = 0;
  let dayDuration = 1;

  // Assuming startDate and endDate are in the format dd-mm-yyyy
  // const startDateParts = bookingDetail.startDate.split("/");
  // const endDateParts = bookingDetail.endDate.split("/");

  // Creating Date objects with the specified format
  // const startDateFormat = new Date(
  // Date.UTC(
  //     parseInt(startDateParts[2]),
  //     parseInt(startDateParts[1]) - 1,
  //     parseInt(startDateParts[0]),
  //     0,
  //     0,
  //     0
  //   )
  // );
  // const endDateFormat = new Date(
  //   Date.UTC(
  //     parseInt(endDateParts[2]),
  //     parseInt(endDateParts[1]) - 1,
  //     parseInt(endDateParts[0]),
  //     0,
  //     0,
  //     0
  //   )
  // );

  // // Calculate the difference in milliseconds
  // const timeDifference = endDateFormat.getTime() - startDateFormat.getTime();

  // const dayDuration = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  let reducedRate = 1;

  if (bookingDetail.codePromotion === "valid001") {
    reducedRate = 0.8;
  }

  let totalRooms =
    bookingDetail.standardRoomNumber +
    bookingDetail.deluxeRoomNumber +
    bookingDetail.familyRoomNumber +
    bookingDetail.suiteRoomNumber +
    bookingDetail.executiveRoomNumber;

  let totalRoomPrice =
    1200 * bookingDetail.standardRoomNumber +
    1800 * bookingDetail.deluxeRoomNumber +
    2200 * bookingDetail.familyRoomNumber +
    2500 * bookingDetail.suiteRoomNumber +
    3000 * bookingDetail.executiveRoomNumber;

  let mondayAndFridaySale =
    200 * mondayAndFridayNightCount * totalRooms * exchangeRate * dayDuration;
  let saturdayAdditionalCost =
    200 * saturdayNightCount * totalRooms * exchangeRate * dayDuration;

  let subTotal =
    (totalRoomPrice * reducedRate * dayDuration +
      saturdayAdditionalCost -
      mondayAndFridaySale) *
    exchangeRate;

  if (bookingDetail.packageOne === true)
    subTotal += 299 * reducedRate * exchangeRate;
  if (bookingDetail.packageTwo === true)
    subTotal += 499 * reducedRate * exchangeRate;

  const serviceCharge = subTotal / 10;
  const taxesAndFees = (subTotal / 100) * 7;

  const totalGuests = bookingDetail.adultNumber + bookingDetail.childrenNumber;
  const totalPrice = subTotal + serviceCharge + taxesAndFees;

  const [showModal, setShowModal] = useState(false);

  let startDate = bookingDetail.startDate
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  let endDate = bookingDetail.endDate
    .toString()
    .split(" ")
    .slice(0, 4)
    .join(" ");

  // Create Date objects
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  const date1Ms = date1.getTime();
  const date2Ms = date2.getTime();

  // Calculate difference in milliseconds
  const diffInMs = date2Ms - date1Ms;

  // Convert milliseconds to days
  const msInDay = 1000 * 60 * 60 * 24;
  const diffInDays = diffInMs / msInDay;

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: COLORS.PRIMARY,
        bottom: 10,
      }}
    >
      {showModal ? (
        <Modal style={style.calendarModalLowerContainer}>
          <ScrollView style={{ paddingHorizontal: 12, paddingTop: 40 }}>
            <View>
              <View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AppText styles={{ fontSize: 28, fontWeight: "bold" }}>
                    {t("booking_summary")}
                  </AppText>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <AntDesign name="close" size={20} color="black" />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, height: 2, backgroundColor: "gray" }} />
                <View style={{ marginVertical: 8 }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <AntDesign name="calendar" size={24} color="black" />
                    <AppText styles={{ fontSize: 16 }}>
                      {" "}
                      {startDate} - {endDate}
                    </AppText>
                  </View>
                  <AppText styles={{ fontSize: 16, paddingLeft: 24 }}>
                    {diffInDays} night(s)
                  </AppText>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <Octicons name="person" size={24} color="black" />
                    <AppText styles={{ fontSize: 16 }}>
                      {" "}
                      {bookingDetail.adultNumber} {t("adults")}{" "}
                      {bookingDetail.childrenNumber} {t("children")}
                    </AppText>
                  </View>
                </View>
                {page == "search-result" ? (
                  <View>
                    <View
                      style={{ flex: 1, height: 2, backgroundColor: "gray" }}
                    />
                    <AppText styles={{ fontSize: 18 }}>
                      {t("edit_room")}
                    </AppText>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                        marginBottom: 5,
                      }}
                    >
                      {bookingDetail.standardRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <AppText
                                styles={{ fontSize: 14, fontWeight: "bold" }}
                              >
                                {t("std_title")}
                              </AppText>
                              <TouchableOpacity
                                onPress={() => {
                                  setBookingDetail({
                                    ...bookingDetail,
                                    standardRoomNumber: 0,
                                  });
                                }}
                              >
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: -3,
                                  }}
                                >
                                  <EvilIcons
                                    name="trash"
                                    size={24}
                                    color="black"
                                  />
                                  <AppText>{t("remove")}</AppText>
                                </View>
                              </TouchableOpacity>
                            </View>
                            <RoomNumberInput
                              roomType="Standard"
                              value={bookingDetail.standardRoomNumber}
                              onChange={(newValue: number) =>
                                setBookingDetail({
                                  ...bookingDetail,
                                  standardRoomNumber: newValue,
                                })
                              }
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              const updatedBookingDetail = {
                                ...bookingDetail,
                                standardRoomNumber: 0,
                              };
                              setBookingDetail(updatedBookingDetail);
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <AppText styles={{ fontSize: 12 }}>
                                {t("std_title")}{" "}
                                {bookingDetail.standardRoomNumber}{" "}
                                {t("room_per_night")}
                              </AppText>
                              <AppText styles={{ fontSize: 12 }}>
                                {currency}{" "}
                                {new Intl.NumberFormat("th-TH", {
                                  style: "decimal",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  bookingDetail.standardRoomNumber *
                                    1200 *
                                    reducedRate *
                                    exchangeRate
                                )}
                              </AppText>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      {bookingDetail.deluxeRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <AppText
                                styles={{ fontSize: 14, fontWeight: "bold" }}
                              >
                                {t("dlx_title")}
                              </AppText>
                              <TouchableOpacity
                                onPress={() => {
                                  setBookingDetail({
                                    ...bookingDetail,
                                    deluxeRoomNumber: 0,
                                  });
                                }}
                              >
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: -3,
                                  }}
                                >
                                  <EvilIcons
                                    name="trash"
                                    size={24}
                                    color="black"
                                  />
                                  <AppText>{t("remove")}</AppText>
                                </View>
                              </TouchableOpacity>
                            </View>
                            <RoomNumberInput
                              roomType="Deluxe"
                              value={bookingDetail.deluxeRoomNumber}
                              onChange={(newValue: number) =>
                                setBookingDetail({
                                  ...bookingDetail,
                                  deluxeRoomNumber: newValue,
                                })
                              }
                            />
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              const updatedBookingDetail = {
                                ...bookingDetail,
                                deluxeRoomNumber: 0,
                              };
                              setBookingDetail(updatedBookingDetail);
                            }}
                          >
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <AppText styles={{ fontSize: 12 }}>
                                {t("dlx_title")}{" "}
                                {bookingDetail.deluxeRoomNumber}{" "}
                                {t("room_per_night")}
                              </AppText>
                              <AppText styles={{ fontSize: 12 }}>
                                {currency}{" "}
                                {new Intl.NumberFormat("th-TH", {
                                  style: "decimal",
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  bookingDetail.deluxeRoomNumber *
                                    1800 *
                                    reducedRate *
                                    exchangeRate
                                )}
                              </AppText>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : null}
                      {bookingDetail.familyRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <AppText
                                styles={{ fontSize: 14, fontWeight: "bold" }}
                              >
                                {t("fml_title")}
                              </AppText>
                              <TouchableOpacity
                                onPress={() => {
                                  const updatedBookingDetail = {
                                    ...bookingDetail,
                                    familyRoomNumber: 0,
                                  };
                                  setBookingDetail(updatedBookingDetail);
                                }}
                              >
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: -3,
                                  }}
                                >
                                  <EvilIcons
                                    name="trash"
                                    size={24}
                                    color="black"
                                  />
                                  <AppText>{t("remove")}</AppText>
                                </View>
                              </TouchableOpacity>
                            </View>
                            <RoomNumberInput
                              roomType="Family"
                              value={bookingDetail.familyRoomNumber}
                              onChange={(newValue: number) =>
                                setBookingDetail({
                                  ...bookingDetail,
                                  familyRoomNumber: newValue,
                                })
                              }
                            />
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("fml_title")} {bookingDetail.familyRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.familyRoomNumber *
                                  2200 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.suiteRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <AppText
                                styles={{ fontSize: 14, fontWeight: "bold" }}
                              >
                                {t("s_title")}
                              </AppText>
                              <TouchableOpacity
                                onPress={() => {
                                  const updatedBookingDetail = {
                                    ...bookingDetail,
                                    suiteRoomNumber: 0,
                                  };
                                  setBookingDetail(updatedBookingDetail);
                                }}
                              >
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: -3,
                                  }}
                                >
                                  <EvilIcons
                                    name="trash"
                                    size={24}
                                    color="black"
                                  />
                                  <AppText>{t("remove")}</AppText>
                                </View>
                              </TouchableOpacity>
                            </View>
                            <RoomNumberInput
                              roomType="Suite"
                              value={bookingDetail.suiteRoomNumber}
                              onChange={(newValue: number) =>
                                setBookingDetail({
                                  ...bookingDetail,
                                  suiteRoomNumber: newValue,
                                })
                              }
                            />
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("s_title")} {bookingDetail.suiteRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.suiteRoomNumber *
                                  2500 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.executiveRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View>
                              <AppText
                                styles={{ fontSize: 14, fontWeight: "bold" }}
                              >
                                {t("ex_title")}
                              </AppText>
                              <TouchableOpacity
                                onPress={() => {
                                  const updatedBookingDetail = {
                                    ...bookingDetail,
                                    executiveRoomNumber: 0,
                                  };
                                  setBookingDetail(updatedBookingDetail);
                                }}
                              >
                                <View
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginLeft: -3,
                                  }}
                                >
                                  <EvilIcons
                                    name="trash"
                                    size={24}
                                    color="black"
                                  />
                                  <AppText>{t("remove")}</AppText>
                                </View>
                              </TouchableOpacity>
                            </View>
                            <RoomNumberInput
                              roomType="Executive"
                              value={bookingDetail.executiveRoomNumber}
                              onChange={(newValue: number) =>
                                setBookingDetail({
                                  ...bookingDetail,
                                  executiveRoomNumber: newValue,
                                })
                              }
                            />
                          </View>

                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("ex_title")}{" "}
                              {bookingDetail.executiveRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.executiveRoomNumber *
                                  3000 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ) : null}
                {page == "reservation-and-guest-detail" ? (
                  <View>
                    <View
                      style={{ flex: 1, height: 2, backgroundColor: "gray" }}
                    />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        marginBottom: 5,
                      }}
                    >
                      {bookingDetail.standardRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("std_title")}{" "}
                              {bookingDetail.standardRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.standardRoomNumber *
                                  1200 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.deluxeRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("dlx_title")} {bookingDetail.deluxeRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.deluxeRoomNumber *
                                  1800 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.familyRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("fml_title")} {bookingDetail.familyRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.familyRoomNumber *
                                  2200 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.suiteRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("std_title")} {bookingDetail.suiteRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.suiteRoomNumber *
                                  2500 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.executiveRoomNumber != 0 ? (
                        <View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("std_title")}{" "}
                              {bookingDetail.executiveRoomNumber}{" "}
                              {t("room_per_night")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                bookingDetail.executiveRoomNumber *
                                  3000 *
                                  reducedRate *
                                  exchangeRate
                              )}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                    </View>
                    <View
                      style={{ flex: 1, height: 2, backgroundColor: "gray" }}
                    />
                    <Text style={{ fontSize: 18 }}>{t("edit_service")}</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 5,
                        marginBottom: 5,
                      }}
                    >
                      {bookingDetail.packageOne ? (
                        <View>
                          <AppText
                            styles={{ fontSize: 14, fontWeight: "bold" }}
                          >
                            {t("service_name1")}
                          </AppText>
                          <TouchableOpacity
                            onPress={() => {
                              const updatedBookingDetail = {
                                ...bookingDetail,
                                packageOne: false,
                              };
                              setBookingDetail(updatedBookingDetail);
                            }}
                          >
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <EvilIcons name="trash" size={24} color="black" />
                              <AppText>{t("remove")}</AppText>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("service_name1")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(299)}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                      {bookingDetail.packageTwo ? (
                        <View>
                          <AppText
                            styles={{ fontSize: 14, fontWeight: "bold" }}
                          >
                            {t("service_name2")}
                          </AppText>
                          <TouchableOpacity
                            onPress={() => {
                              const updatedBookingDetail = {
                                ...bookingDetail,
                                packageTwo: false,
                              };
                              setBookingDetail(updatedBookingDetail);
                            }}
                          >
                            <View
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <EvilIcons name="trash" size={24} color="black" />
                              <AppText>{t("remove")}</AppText>
                            </View>
                          </TouchableOpacity>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <AppText styles={{ fontSize: 12 }}>
                              {t("service_name2")}
                            </AppText>
                            <AppText styles={{ fontSize: 12 }}>
                              {currency}{" "}
                              {new Intl.NumberFormat("th-TH", {
                                style: "decimal",
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(499)}
                            </AppText>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={{ flex: 1, height: 2, backgroundColor: "gray" }} />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {t("monday_and_friday_sale")}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {" "}
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(mondayAndFridaySale)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {t("saturday_additional_cost")}
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {" "}
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(saturdayAdditionalCost)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 }}>{t("sub_total")}</Text>
                <Text style={{ fontSize: 12 }}>
                  {" "}
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(subTotal)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  {t("service_charge")} (10%)
                </Text>
                <Text style={{ fontSize: 12 }}>
                  {" "}
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(serviceCharge)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{t("taxes_and_fees")} (7%)</Text>
                <Text style={{ fontSize: 12 }}>
                  {" "}
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(taxesAndFees)}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  {t("total")}
                </Text>
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  {" "}
                  {currency}{" "}
                  {new Intl.NumberFormat("th-TH", {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(totalPrice)}
                </Text>
              </View>
            </View>
            {page == "search-result" ? (
              <Button
                onPress={() => reservationAndGuestDetailHandler()}
                style={{
                  backgroundColor: COLORS.SECONDARY,
                  borderColor: "transparent",
                  marginTop: 40,
                }}
                disabled={
                  bookingDetail.standardRoomNumber +
                    bookingDetail.deluxeRoomNumber * 2 +
                    bookingDetail.familyRoomNumber * 4 +
                    bookingDetail.suiteRoomNumber * 2 +
                    bookingDetail.executiveRoomNumber * 4 <
                  bookingDetail.adultNumber + bookingDetail.childrenNumber
                }
              >
                <Text style={{ height: 55, color: "white" }}>
                  {t("confirm")}
                </Text>
              </Button>
            ) : (
              <Button
                onPress={() => summaryBookingDetailHandler()}
                style={{
                  backgroundColor: COLORS.SECONDARY,
                  borderColor: "transparent",
                }}
                disabled={isDisabledConfirm || !bookingDetail.isCheckedPDPA}
              >
                <Text style={{ height: 55, color: "white" }}>
                  {t("confirm")}
                </Text>
              </Button>
            )}
          </ScrollView>
        </Modal>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ color: "white" }}>
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(totalPrice)}{" "}
              {t("total")}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white" }}>
                {totalRooms} room(s) {totalGuests} guest(s)
              </Text>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <AntDesign name="down" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {page == "search-result" ? (
            <Button
              onPress={() => reservationAndGuestDetailHandler()}
              style={{
                backgroundColor: COLORS.SECONDARY,
                borderColor: "transparent",
              }}
              disabled={
                bookingDetail.standardRoomNumber +
                  bookingDetail.deluxeRoomNumber * 2 +
                  bookingDetail.familyRoomNumber * 4 +
                  bookingDetail.suiteRoomNumber * 2 +
                  bookingDetail.executiveRoomNumber * 4 <
                bookingDetail.adultNumber + bookingDetail.childrenNumber
              }
            >
              <Text style={{ height: 55, color: "white" }}>{t("confirm")}</Text>
            </Button>
          ) : (
            <Button
              onPress={() => summaryBookingDetailHandler()}
              style={{
                backgroundColor: COLORS.SECONDARY,
                borderColor: "transparent",
              }}
              disabled={isDisabledConfirm || !bookingDetail.isCheckedPDPA}
            >
              <Text style={{ height: 55, color: "white" }}>{t("confirm")}</Text>
            </Button>
          )}
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
