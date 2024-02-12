import useStore from "@/hooks/useStore";
import { Button } from "@ui-kitten/components";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { format } from "date-fns";
import { COLORS } from "@/constants";
import Topbar from "@/components/Topbar";

export default function SummaryBookingDetailPage({ navigation }: any) {
  const { guests, paymentDetail, specialReq, cardType } = useStore();
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

  return (
    <View>
      <Topbar />
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
          <View>
            <Button onPress={() => navigation.navigate("Booking Confirmation")}>
              Confirm
            </Button>
          </View>

          {/* Guest Detail */}
          <View style={styles.container}>
            <View>
              <Text style={styles.mainText}>Guest Detail</Text>
            </View>
            <View>
              {guests.map((guest, index) => {
                return (
                  <View style={styles.inputContainer} key={index}>
                    {/* First Name */}
                    <View>
                      <Text>First Name : {guest.firstName}</Text>
                    </View>

                    {/* Middle Name */}
                    <View>
                      <Text>
                        Middle Name :{" "}
                        {guest.middleName === "" ? "-" : guest.middleName}
                      </Text>
                    </View>

                    {/* Last Name */}
                    <View>
                      <Text>Last Name : {guest.lastName}</Text>
                    </View>

                    {/* Gender */}
                    <View>
                      <Text>Gender : {guest.gender}</Text>
                    </View>

                    {/* Birth Date */}
                    <View>
                      <Text>
                        Birth Date : {format(guest.birthDate, "dd/MM/yyyy")}
                      </Text>
                    </View>

                    {/* Email */}
                    <View>
                      <Text>Email : {guest.email}</Text>
                    </View>

                    {/* Phone Number */}
                    <View>
                      <Text>Phone Number : {guest.phoneNumber}</Text>
                    </View>

                    {/* Country */}
                    <View>
                      <Text>Country : {guest.country}</Text>
                    </View>

                    {/* City */}
                    <View>
                      <Text>City : {guest.city}</Text>
                    </View>

                    {/* Zip code */}
                    <View>
                      <Text>Zip code : {guest.zipCode}</Text>
                    </View>

                    {/* Address */}
                    <View>
                      <Text>Address : {guest.address}</Text>
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
              <Text style={styles.mainText}>Payment Detail</Text>
            </View>
            <View style={styles.inputContainer}>
              {/* Card Holder Name */}
              <View>
                <Text>Card Holder Name : {paymentDetail.cardHolderName}</Text>
              </View>

              {/* Card Number */}
              <View
                style={{ display: "flex", flexDirection: "row", columnGap: 5 }}
              >
                <View>
                  <Text>Card Number : {paymentDetail.cardNumber}</Text>
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
                <Text>Expiration Date : {paymentDetail.expDate}</Text>
              </View>

              {/* CVV */}
              <View>
                <Text>CVV : {paymentDetail.cvv}</Text>
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
            <Text style={styles.mainText}>Special Request</Text>
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
