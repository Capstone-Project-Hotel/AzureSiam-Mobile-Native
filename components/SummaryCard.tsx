import { View, Text, TouchableOpacity } from "react-native";
import useStore from "@/hooks/useStore";
import { Button } from "@ui-kitten/components";
import AppText from "./AppText";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

export default function SummaryCard({ t }: { t: any }) {
  const { bookingDetail, setBookingDetail, currency, exchangeRate } =
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
    <View>
      <View style={{ marginVertical: 5 }}>
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
      <View style={{ flex: 1, height: 2, backgroundColor: "gray" }} />

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
                {t("std_title")} {bookingDetail.standardRoomNumber}{" "}
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
                {t("std_title")} {bookingDetail.executiveRoomNumber}{" "}
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
      <View style={{ flex: 1, height: 2, backgroundColor: "gray" }} />
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <AppText styles={{ fontSize: 12 }}>{t("service_name1")}</AppText>
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
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <AppText styles={{ fontSize: 12 }}>{t("service_name2")}</AppText>
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
            <Text style={{ fontSize: 12 }}>{t("monday_and_friday_sale")}</Text>
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
            <Text style={{ fontSize: 12 }}>{t("service_charge")} (10%)</Text>
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
              marginTop: 5,
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
      </View>
    </View>
  );
}
