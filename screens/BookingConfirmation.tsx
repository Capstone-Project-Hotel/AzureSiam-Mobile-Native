import useStore from "@/hooks/useStore";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { format } from "date-fns";
import { COLORS } from "@/constants";
import Topbar from "@/components/Topbar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import SummaryCard from "@/components/SummaryCard";
import { AntDesign } from "@expo/vector-icons";

export default function BookingConfirmationPage({ navigation }: any) {
  const {
    guests,
    paymentDetail,
    specialReq,
    cardType,
    bookingDetail,
    setBookingDetail,
  } = useStore();
  const idTypeToid = {
    id: "National ID",
    passportNumber: "Passport Number",
    drivingLicence: "Driving Licence",
  };
  const cardTypeToCardImg = {
    amex: "https://venturebeat.com/wp-content/uploads/2023/05/blue.jpg?fit=750%2C422&strip=all",
    visa: "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-visa.png",
    mastercard:
      "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-mastercard.png",
    discover:
      "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-discover.png",
  };

  const { t } = useTranslation();

  useEffect(() => {
    if (bookingDetail.bookingId === "") {
      const bookingId = Math.floor(100000 + Math.random() * 900000).toString();
      const updatedBookingDetail = {
        ...bookingDetail,
        bookingId: bookingId,
      };
      setBookingDetail(updatedBookingDetail);
    }
  }, []);

  return (
    <View>
      <Topbar
        landingHandler={() => {
          navigation.navigate("Landing");
        }}
      />
      <ScrollView
        style={{
          paddingHorizontal: 30,
          paddingTop: 30,
          marginBottom: 80,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 20,
            paddingBottom: 70,
          }}
        >
          {/* Booking ID */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 80,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                columnGap: 10,
              }}
            >
              <AntDesign name="checkcircle" size={24} color="green" />
              <Text style={{ fontSize: 24, color: `${COLORS.PRIMARY}` }}>
                {t("successful_booking")}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 18, color: `${COLORS.PRIMARY}` }}>
                {t("booking_id")} : {bookingDetail.bookingId}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.mainText}>{t("booking_detail")}</Text>
          </View>
          <SummaryCard t={t} />
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginVertical: 5,
            }}
          />

          {/* Guest Detail */}
          <View style={styles.container}>
            <View>
              <Text style={styles.mainText}>{t("guest_detail_label")}</Text>
            </View>
            <View>
              {guests.map((guest, index) => {
                return (
                  <View style={styles.inputContainer} key={index}>
                    {/* First Name */}
                    <View>
                      <Text>
                        {t("first_name")} : {guest.firstName}
                      </Text>
                    </View>

                    {/* Middle Name */}
                    <View>
                      <Text>
                        {t("middle_name")} :{" "}
                        {guest.middleName === "" ? "-" : guest.middleName}
                      </Text>
                    </View>

                    {/* Last Name */}
                    <View>
                      <Text>
                        {t("last_name")} : {guest.lastName}
                      </Text>
                    </View>

                    {/* Gender */}
                    <View>
                      <Text>
                        {t("gender")} : {t(guest.gender)}
                      </Text>
                    </View>

                    {/* Birth Date */}
                    <View>
                      <Text>
                        {t("birthdate")} :{" "}
                        {format(guest.birthDate, "dd/MM/yyyy")}
                      </Text>
                    </View>

                    {/* Email */}
                    <View>
                      <Text>
                        {t("email")} : {guest.email}
                      </Text>
                    </View>

                    {/* Phone Number */}
                    <View>
                      <Text>
                        {t("phone_number")} : {guest.phoneNumber}
                      </Text>
                    </View>

                    {/* Country */}
                    <View>
                      <Text>
                        {t("country")} : {guest.country}
                      </Text>
                    </View>

                    {/* City */}
                    <View>
                      <Text>
                        {t("city")} : {guest.city}
                      </Text>
                    </View>

                    {/* Zip code */}
                    <View>
                      <Text>
                        {t("zip_code")} : {guest.zipCode}
                      </Text>
                    </View>

                    {/* Address */}
                    <View>
                      <Text>
                        {t("address")} : {guest.address}
                      </Text>
                    </View>

                    {/* ID , Passport Number , Driving Licence */}
                    <View>
                      <Text>
                        {(idTypeToid as any)[guest["idType"]]} : {guest.id}
                      </Text>
                    </View>

                    {/* HR Line */}
                    {index !== guests.length - 1 && (
                      <View
                        style={{
                          borderBottomColor: "black",
                          borderBottomWidth: StyleSheet.hairlineWidth,
                          marginTop: 2,
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginTop: 2,
            }}
          />

          {/* Payment Detail */}
          <View style={styles.container}>
            <View>
              <Text style={styles.mainText}>{t("payment_label")}</Text>
            </View>
            <View style={styles.inputContainer}>
              {/* Card Holder Name */}
              <View>
                <Text>
                  {t("card_holder")} : {paymentDetail.cardHolderName}
                </Text>
              </View>

              {/* Card Number */}
              <View
                style={{ display: "flex", flexDirection: "row", columnGap: 5 }}
              >
                <View>
                  <Text>
                    {t("card_number")} : {paymentDetail.cardNumber}
                  </Text>
                </View>
                <View>
                  {cardType &&
                  Object.keys(cardTypeToCardImg).includes(cardType) ? (
                    <Image
                      source={{ uri: (cardTypeToCardImg as any)[cardType] }}
                      alt="cardType"
                      resizeMode="cover"
                      style={{ height: 17, width: 30 }}
                    />
                  ) : null}
                </View>
              </View>

              {/* Exp Date */}
              <View>
                <Text>
                  {t("expiration_date")} : {paymentDetail.expDate}
                </Text>
              </View>

              {/* CVV */}
              <View>
                <Text>
                  {t("cvv")} : {paymentDetail.cvv}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginTop: 2,
            }}
          />

          {/* Special Request */}
          <View style={styles.container}>
            <Text style={styles.mainText}>{t("special_request")}</Text>
            <Text>{specialReq === "" ? "-" : specialReq}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: `${COLORS.PRIMARY}`,
  },
  container: {},
  inputContainer: { display: "flex", gap: 10, marginBottom: 10 },
  text: { fontSize: 11 },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 5,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    fontSize: 9,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 11,
  },
});
