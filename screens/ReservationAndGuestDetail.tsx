import { COLORS } from "@/constants";
import useStore from "@/hooks/useStore";
import {
  Input,
  Select,
  SelectItem,
  Datepicker,
  Icon,
  CheckBox,
  Modal,
  Card,
  Button,
} from "@ui-kitten/components";
import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Platform,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Country, State, City } from "country-state-city";
import { addDays } from "date-fns";
import Topbar from "@/components/Topbar";
import { useTranslation } from "react-i18next";
import SummaryBar from "@/components/SummaryBar";

export default function ReservationAndGuestDetailPage({ navigation }: any) {
  const {
    bookingDetail,
    setBookingDetail,
    guests,
    setGuests,
    paymentDetail,
    setPaymentDetail,
    specialReq,
    setSpecialReq,
    cardType,
    setCardType,
  } = useStore();

  const { t } = useTranslation();

  const items = ["Male", "Female", "Other"];
  const items2 = ["id", "passportNumber", "drivingLicence"];
  const countries = Country.getAllCountries().map((country) => {
    return country.name;
  });
  const countriesCode = Country.getAllCountries().map((country) => {
    return country.isoCode;
  });
  const phoneInput = useRef<PhoneInput>(null);
  const idTypeToid = {
    id: t("national_id"),
    passportNumber: t("passport_number"),
    drivingLicence: t("driving_licence"),
  };
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
  const cardTypeToCardImg = {
    amex: "https://cdn.discordapp.com/attachments/457166097230069773/1186233714523512852/vinnytsia-ukraine-september-6-2023-600nw-2358048941.webp?ex=6592813c&is=65800c3c&hm=b37ff0d726d6a4b7c5994550407f23d9a6401cfb3fa44696c5425531b322b02d&",
    visa: "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-visa.png",
    mastercard:
      "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-mastercard.png",
    discover:
      "https://swissuplabs.com/wordpress/wp-content/uploads/2016/04/free-icons-discover.png",
    amexBW:
      "https://cdn.discordapp.com/attachments/457166097230069773/1204278374399213630/vinnytsia-ukraine-september-6-2023-600nw-2358048941_1.jpg?ex=65d426a2&is=65c1b1a2&hm=1631075b0feba5f40f353cb3bf260a95abfebf8aabeb3e159f39415af1a22a27&",
    visaBW:
      "https://cdn.discordapp.com/attachments/457166097230069773/1204278665907802112/free-icons-visaaa.png?ex=65d426e8&is=65c1b1e8&hm=649c20598053e2fcc8d58be533dd8080d47e18621de3f5857dfda6ea4a592a71&",
    mastercardBW:
      "https://cdn.discordapp.com/attachments/457166097230069773/1204278926013235272/free-icons-mastercardaa.png?ex=65d42726&is=65c1b226&hm=83142cf4b6f469ae54fe13445084e56c761c20fc323f202d00a419bb639272d0&",
    discoverBW:
      "https://cdn.discordapp.com/attachments/457166097230069773/1204279146419724348/free-icons-discovaer.png?ex=65d4275a&is=65c1b25a&hm=b57670feeb52453c0031d7ad70590973dfec1854608df142649d9cdf993270bd&",
  };
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props: any): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const handleInputChange = (index: number, value: string, name: string) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [name]: value };
    setGuests(updatedGuests);
    isDisabledConfirmF(updatedGuests, paymentDetail);
  };

  const handlePaymentInputChange = (value: string, name: string) => {
    setPaymentDetail({ ...paymentDetail, [name]: value });
    isDisabledConfirmF(guests, {
      ...paymentDetail,
      [name]: value,
    });
  };

  const [isDisabledConfirm, setIsDisabledConfirm] = useState<boolean>(false);
  const isDisabledConfirmF = (aguests: Guest[], payment: PaymentDetail) => {
    const fieldsToCheck = [
      "firstName",
      "lastName",
      "gender",
      "birthDate",
      "email",
      "phoneNumber",
      "country",
      "zipCode",
      "address",
      "id",
      "idType",
      "cardHolderName",
      "cardNumber",
      "expDate",
      "cvv",
    ];
    const fieldsToCheckPayment = [
      "cardHolderName",
      "cardNumber",
      "expDate",
      "cvv",
    ];
    for (let i = 0; i < aguests.length; i++) {
      for (const field of fieldsToCheck) {
        if ((aguests[i] as any)[field] == "") {
          setIsDisabledConfirm(true);
          return;
        }
      }
    }

    for (const field of fieldsToCheckPayment) {
      if ((payment as any)[field] == "") {
        setIsDisabledConfirm(true);
        return;
      }
    }

    setIsDisabledConfirm(false);
  };

  useEffect(() => {
    isDisabledConfirmF(guests, paymentDetail);
  }, [bookingDetail.isCheckedPDPA, guests.length]);

  const [countryCode, setCountryCode] = useState("");
  const [city, setCity] = useState<any[]>([]);
  useEffect(() => {
    let s: any[] = State.getStatesOfCountry(countryCode).map((city: any) => {
      return city.name;
    });
    if (s.length == 0) s = ["-"];
    setCity(s);
  }, [countryCode]);

  return (
    <View style={{ marginBottom: 120 }}>
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
        <View>
          <Text>
            Button check :
            {isDisabledConfirm || !bookingDetail.isCheckedPDPA
              ? "disable"
              : "go next"}
          </Text>
          <Button
            disabled={isDisabledConfirm || !bookingDetail.isCheckedPDPA}
            onPress={() => navigation.navigate("Summary Booking Detail")}
          >
            Confirm
          </Button>
        </View>
        {/* Additional Services */}
        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>{t("additional_label")}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 2,
            }}
          >
            <View
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.discordapp.com/attachments/863762167340990494/1199360857935720530/image_32.png?ex=65c242d7&is=65afcdd7&hm=5fa7797322db7c00c453a1a1c6693ee3c5435fc146a53c4714ad50af0ca89006&",
                }}
                resizeMode="cover"
                style={{
                  height: "100%",
                  width: "40%",
                }}
              />
              <View
                style={{
                  width: "60%",
                  height: "100%",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  flex: 1,
                  rowGap: 10,
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    {t("service_name1")}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{t("service_unit1")}</Text>
                </View>
                <View>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    THB 299
                  </Text>
                </View>
                <View>
                  <Button
                    style={{
                      backgroundColor: bookingDetail.packageOne
                        ? "white"
                        : COLORS.PRIMARY,
                      borderColor: COLORS.PRIMARY,
                    }}
                    appearance={bookingDetail.packageOne ? "outline" : "filled"}
                    size="small"
                    onPress={() =>
                      setBookingDetail({
                        ...bookingDetail,
                        packageOne: !bookingDetail.packageOne,
                      })
                    }
                  >
                    {(evaProps) => (
                      <Text
                        {...evaProps}
                        style={{
                          color: bookingDetail.packageOne
                            ? COLORS.PRIMARY
                            : "white",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        {bookingDetail.packageOne
                          ? t("remove_service")
                          : t("add_service")}
                      </Text>
                    )}
                  </Button>
                </View>
              </View>
            </View>
            <View
              style={{
                height: "auto",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{
                  uri: "https://cdn.discordapp.com/attachments/863762167340990494/1199360857692446740/cover.png?ex=65c242d7&is=65afcdd7&hm=b785dd4d923b8f7552f094c8abf6df8bb5f59e891d2b69d4afd479b2289a74be&",
                }}
                resizeMode="cover"
                style={{
                  height: "100%",
                  width: "40%",
                }}
              />
              <View
                style={{
                  width: "60%",
                  height: "100%",
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  flex: 1,
                  rowGap: 10,
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold" }}>
                    {t("service_name2")}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{t("service_unit2")}</Text>
                </View>
                <View>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    THB 499
                  </Text>
                </View>
                <View>
                  <Button
                    style={{
                      backgroundColor: bookingDetail.packageTwo
                        ? "white"
                        : COLORS.PRIMARY,
                      borderColor: COLORS.PRIMARY,
                    }}
                    appearance={bookingDetail.packageTwo ? "outline" : "filled"}
                    size="small"
                    onPress={() =>
                      setBookingDetail({
                        ...bookingDetail,
                        packageTwo: !bookingDetail.packageTwo,
                      })
                    }
                  >
                    {(evaProps) => (
                      <Text
                        {...evaProps}
                        style={{
                          color: bookingDetail.packageTwo
                            ? COLORS.PRIMARY
                            : "white",
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                      >
                        {bookingDetail.packageTwo
                          ? t("remove_service")
                          : t("add_service")}
                      </Text>
                    )}
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>

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
                      {t("first_name")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Input
                      placeholder={t("first_name")}
                      value={guest.firstName}
                      onChangeText={(nextValue) =>
                        handleInputChange(index, nextValue, "firstName")
                      }
                    />
                  </View>

                  {/* Middle Name */}
                  <View>
                    <Text>{t("middle_name")}</Text>
                    <Input
                      placeholder={t("middle_name")}
                      value={guest.middleName}
                      onChangeText={(nextValue) =>
                        handleInputChange(index, nextValue, "middleName")
                      }
                    />
                  </View>

                  {/* Last Name */}
                  <View>
                    <Text>
                      {t("last_name")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Input
                      placeholder={t("last_name")}
                      value={guest.lastName}
                      onChangeText={(nextValue) =>
                        handleInputChange(index, nextValue, "lastName")
                      }
                    />
                  </View>

                  {/* Gender */}
                  <View>
                    <Text>
                      {t("gender")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Select
                      onSelect={(i: any) =>
                        handleInputChange(index, items[i.row], "gender")
                      }
                      value={guest.gender}
                      placeholder={t("gender_default")}
                    >
                      <SelectItem title={t("male")} />
                      <SelectItem title={t("female")} />
                      <SelectItem title={t("other")} />
                    </Select>
                  </View>

                  {/* Birth Date */}
                  <View>
                    <Text>
                      {t("birthdate")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Datepicker
                      min={addDays(new Date(), -999999)}
                      max={addDays(new Date(), 999999)}
                      placeholder={t("birthdate_default")}
                      date={guest.birthDate ? new Date(guest.birthDate) : null}
                      onSelect={(nextDate: any) => {
                        handleInputChange(index, nextDate, "birthDate");
                      }}
                      accessoryRight={<Icon name="calendar" />}
                    />
                  </View>

                  {/* Email */}
                  <View>
                    <Text>
                      {t("email")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Input
                      placeholder={t("email")}
                      value={guest.email}
                      onChangeText={(nextValue) =>
                        handleInputChange(index, nextValue, "email")
                      }
                    />
                  </View>

                  {/* Phone Number */}
                  <View>
                    <Text>
                      {t("phone_number")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <PhoneInput
                      placeholder={t("phone_number")}
                      ref={phoneInput}
                      value={guest.phoneNumber}
                      defaultCode="TH"
                      layout="first"
                      onChangeText={(text) =>
                        handleInputChange(index, text, "phoneNumber")
                      }
                      containerStyle={{
                        height: 35,
                        width: "100%",
                        marginTop: 2,
                      }}
                      textInputStyle={{ height: 35, paddingLeft: 10 }}
                      codeTextStyle={{ height: 21 }}
                    />
                  </View>

                  {/* Country */}
                  <View>
                    <Text>
                      {t("country")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Select
                      onSelect={(i: any) => {
                        handleInputChange(index, countries[i.row], "country");
                        setCountryCode(countriesCode[i.row]);
                      }}
                      value={guest.country}
                      placeholder={t("country_default")}
                    >
                      {Country.getAllCountries().map((country: any) => {
                        return (
                          <SelectItem title={country.name} key={country.name} />
                        );
                      })}
                    </Select>
                  </View>

                  {/* City */}
                  <View>
                    <Text>{t("city")}</Text>
                    <Select
                      onSelect={(i: any) =>
                        handleInputChange(index, city[i.row], "city")
                      }
                      value={guest.city}
                      placeholder={t("city_default")}
                    >
                      {city.map((city: any) => {
                        return <SelectItem title={city} key={city} />;
                      })}
                    </Select>
                  </View>

                  {/* Zip code */}
                  <View>
                    <Text>
                      {t("zip_code")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Input
                      placeholder={t("zip_code")}
                      value={guest.zipCode}
                      onChangeText={(nextValue) =>
                        handleInputChange(index, nextValue, "zipCode")
                      }
                    />
                  </View>

                  {/* Address */}
                  <View>
                    <Text>
                      {t("address")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <Input
                      placeholder={t("address")}
                      value={guest.address}
                      onChangeText={(nextValue) =>
                        handleInputChange(index, nextValue, "address")
                      }
                    />
                  </View>

                  {/* ID , Passport Number , Driving Licence */}
                  <View>
                    <Text>
                      {t("id_card")}
                      <Text style={{ color: "red" }}> *</Text>
                    </Text>
                    <View style={{ display: "flex", gap: 2 }}>
                      <Select
                        onSelect={(i: any) =>
                          handleInputChange(index, items2[i.row], "idType")
                        }
                        value={
                          guest.idType
                            ? (idTypeToid as any)[guest["idType"]]
                            : undefined
                        }
                        placeholder={t("select")}
                      >
                        <SelectItem title={t("national_id")} />
                        <SelectItem title={t("passport_number")} />
                        <SelectItem title={t("driving_licence")} />
                      </Select>
                      <Input
                        placeholder={
                          guest.idType
                            ? (idTypeToid as any)[guest["idType"]]
                            : t("id_card_number")
                        }
                        value={guest.id}
                        onChangeText={(nextValue) =>
                          handleInputChange(index, nextValue, "id")
                        }
                      />
                    </View>
                  </View>

                  {/* Remove Guest */}
                  {index > 0 && (
                    <TouchableOpacity
                      onPress={() =>
                        setGuests([
                          ...guests.slice(0, index),
                          ...guests.slice(index + 1),
                        ])
                      }
                    >
                      <Text style={{ color: "red" }}>
                        -{" "}
                        <Text style={{ textDecorationLine: "underline" }}>
                          {t("remove_guest")}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  )}

                  {/* HR Line */}
                  <View
                    style={{
                      borderBottomColor: "black",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 2,
                    }}
                  />
                </View>
              );
            })}
          </View>

          {/* Add Guest */}
          <TouchableOpacity onPress={() => setGuests([...guests, emptyGuest])}>
            <Text style={{ color: `${COLORS.PRIMARY}` }}>
              +{" "}
              <Text style={{ textDecorationLine: "underline" }}>
                {t("add_guest")}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* Payment Detail */}
        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>{t("payment_label")}</Text>
          </View>
          <View style={styles.inputContainer}>
            {/* Card Holder Name */}
            <View>
              <Text>
                {t("card_holder")}
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Input
                placeholder={t("card_holder")}
                value={paymentDetail.cardHolderName}
                onChangeText={(nextValue) =>
                  handlePaymentInputChange(nextValue, "cardHolderName")
                }
              />
            </View>

            {/* Card Number */}
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>
                    {t("card_number")}
                    <Text style={{ color: "red" }}> *</Text>
                  </Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View>
                    <Image
                      source={{
                        uri:
                          cardType === "visa"
                            ? cardTypeToCardImg.visa
                            : cardTypeToCardImg.visaBW,
                      }}
                      resizeMode="cover"
                      style={{
                        height: 17,
                        width: 40,
                      }}
                    />
                  </View>
                  <View>
                    <Image
                      source={{
                        uri:
                          cardType === "mastercard"
                            ? cardTypeToCardImg.mastercard
                            : cardTypeToCardImg.mastercardBW,
                      }}
                      resizeMode="cover"
                      style={{
                        height: 17,
                        width: 40,
                      }}
                    />
                  </View>
                  <View>
                    <Image
                      source={{
                        uri:
                          cardType === "amex"
                            ? cardTypeToCardImg.amex
                            : cardTypeToCardImg.amexBW,
                      }}
                      resizeMode="cover"
                      style={{
                        height: 17,
                        width: 40,
                      }}
                    />
                  </View>
                  <View>
                    <Image
                      source={{
                        uri:
                          cardType === "discover"
                            ? cardTypeToCardImg.discover
                            : cardTypeToCardImg.discoverBW,
                      }}
                      resizeMode="cover"
                      style={{
                        height: 17,
                        width: 40,
                      }}
                    />
                  </View>
                </View>
              </View>
              <Input
                placeholder={t("card_number")}
                value={paymentDetail.cardNumber}
                onChangeText={(nextValue) => {
                  handlePaymentInputChange(nextValue, "cardNumber");
                  if (nextValue.slice(0, 1) == "4") {
                    setCardType("visa");
                  } else if (nextValue.slice(0, 2) == "51") {
                    setCardType("mastercard");
                  } else if (nextValue.slice(0, 2) == "34") {
                    setCardType("amex");
                  } else if (nextValue.slice(0, 3) == "300") {
                    setCardType("discover");
                  } else {
                    setCardType("");
                  }
                }}
              />
            </View>

            {/* Exp Date */}
            <View>
              <Text>
                {t("expiration_date")}
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Input
                accessoryRight={<Icon name="calendar" />}
                placeholder={t("expiration_date")}
                value={paymentDetail.expDate}
                onChangeText={(nextValue) =>
                  handlePaymentInputChange(nextValue, "expDate")
                }
              />
            </View>

            {/* CVV */}
            <View>
              <Text>
                {t("cvv")}
                <Text style={{ color: "red" }}> *</Text>
              </Text>
              <Input
                secureTextEntry={secureTextEntry}
                accessoryRight={renderIcon}
                placeholder={t("cvv")}
                value={paymentDetail.cvv}
                onChangeText={(nextValue) =>
                  handlePaymentInputChange(nextValue, "cvv")
                }
              />
            </View>
          </View>
        </View>
        {/* Special Request */}
        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>{t("special_request")}</Text>
          </View>
          <TextInput
            editable
            multiline
            numberOfLines={3}
            onChangeText={(text) => setSpecialReq(text)}
            value={specialReq}
            style={{
              padding: 10,
              borderColor: isFocused ? "#93acfc" : "#E4E9F2",
              borderWidth: 1.5,
              backgroundColor: isFocused ? "white" : "#F7F9FC",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
        {/* Cancellation Policy */}
        <View style={styles.container}>
          <View>
            <Text style={styles.mainText}>{t("cancel_policy")}</Text>
          </View>
          <View>
            <Text style={styles.text}>
              {t("cancel_policy_description_header")}
            </Text>
            <Text style={styles.text}></Text>
            <Text style={styles.text}>{t("cancel_policy_description")}</Text>
            <Text style={styles.text}>{t("cancel_policy_description2")}</Text>
            <Text style={styles.text}>{t("cancel_policy_description3")}</Text>
          </View>
        </View>
        {/* PDPA */}
        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              checked={bookingDetail.isCheckedPDPA}
              onChange={(nextChecked) => {
                setBookingDetail({
                  ...bookingDetail,
                  isCheckedPDPA: nextChecked,
                });
              }}
              style={styles.checkbox}
            />
            <View
              style={{ padding: 10, display: "flex", flexDirection: "row" }}
            >
              <Text style={styles.label}>{t("terms_condition")}</Text>
              <TouchableOpacity onPress={() => setVisible(true)}>
                <Text
                  style={[
                    styles.label,
                    {
                      textDecorationLine: "underline",
                      color: `${COLORS.PRIMARY}`,
                    },
                  ]}
                >
                  {t("terms_condition_2")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Modal PDPA */}
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >
          <Card disabled={true}>
            <Text
              style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}
            >
              {t("terms_condition_2")}
            </Text>
            <View style={{ display: "flex", rowGap: 10, marginBottom: 10 }}>
              <Text style={styles.modalText}>1) {t("terms_condition_d1")}</Text>
              <Text style={styles.modalText}>2) {t("terms_condition_d2")}</Text>
              <Text style={styles.modalText}>3) {t("terms_condition_d3")}</Text>
              <Text style={styles.modalText}>4) {t("terms_condition_d4")}</Text>
              <Text style={styles.modalText}>5) {t("terms_condition_d5")}</Text>
              <Text style={styles.modalText}>6) {t("terms_condition_d6")}</Text>
              <Text style={styles.modalText}>7) {t("terms_condition_d7")}</Text>
            </View>
            <Button size="small" onPress={() => setVisible(false)}>
              {t("close")}
            </Button>
          </Card>
        </Modal>
      </ScrollView>
      <SummaryBar
        t={t}
        reservationAndGuestDetailHandler={() => {
          navigation.navigate("SummaryBookingDetail");
        }}
      />
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
  container: { marginBottom: 30 },
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
