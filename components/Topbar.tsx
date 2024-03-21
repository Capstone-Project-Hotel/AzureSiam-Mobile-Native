import { View, Image, Text, TouchableOpacity } from "react-native";
import { Select, SelectItem } from "@ui-kitten/components";
import i18next, { languageResources } from "../services/i18next";
import useStore from "@/hooks/useStore";
import languagesList from "../services/languagesList.json";
import axios from "axios";
import { COLORS } from "@/constants";
import { useEffect } from "react";

export default function Topbar({
  landingHandler,
}: {
  landingHandler: Function;
}) {
  const {
    lng,
    setLng,
    currency,
    setCurrency,
    setExchangeRate,
    guestsError,
    setCheckboxError,
    setPaymentError,
    setGuestsError,
  } = useStore();
  const changeLng = (lng: any) => {
    i18next.changeLanguage(lng);
    const emptyGuestError: GuestError = {
      firstName: "",
      lastName: "",
      gender: "",
      birthDate: "",
      email: "",
      phoneNumber: "",
      country: "",
      zipCode: "",
      address: "",
      idType: "",
      id: "",
    };
    const guestsErrorNew = guestsError.map(() => emptyGuestError);
    setGuestsError(guestsErrorNew);

    const emptyPaymentError: PaymentError = {
      cardHolderName: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
    };
    setPaymentError(emptyPaymentError);

    setCheckboxError("");
  };

  const listquotes = [
    "SGD",
    "MYR",
    "EUR",
    "USD",
    "AUD",
    "JPY",
    "CNH",
    "HKD",
    "CAD",
    "INR",
    "DKK",
    "GBP",
    "RUB",
    "NZD",
    "MXN",
    "IDR",
    "TWD",
    "THB",
    "VND",
  ];
  const handleExChange = async (value: string) => {
    try {
      if (value && value !== "THB") {
        const response = await axios.get(
          "https://currency-exchange.p.rapidapi.com/exchange",
          {
            params: {
              from: "THB",
              to: value,
            },
            headers: {
              "X-RapidAPI-Key":
                "32978adf6emsh766e865f3b81f21p11aafajsnb354410acc8c",
              "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
            },
          }
        );
        setCurrency(value);
        setExchangeRate(response.data);
      } else {
        setCurrency("THB");
        setExchangeRate(1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.PRIMARY,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}
    >
      {/* Left */}
      <TouchableOpacity
        onPress={() => {
          landingHandler();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          rowGap: 5,
        }}
      >
        <View>
          <Image
            source={{
              uri: "https://drive.google.com/uc?export=download&id=1HRRO45x_Bo5d_SJY_aW-USKVY2mWXo6y",
            }}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View>
          <Text style={{ color: "white" }}>AzureSiam</Text>
        </View>
      </TouchableOpacity>
      {/* Right */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          columnGap: 10,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <View>
          <Select
            size="small"
            onSelect={(i: any) => {
              changeLng(["en", "th"][i.row]);
              setLng(["English", "ไทย"][i.row]);
            }}
            value={lng}
            placeholder="Select Currency"
            style={{ width: 120 }}
          >
            {Object.keys(languageResources).map((lng, index) => (
              <SelectItem
                key={index}
                title={(languagesList as any)[lng].nativeName}
              />
            ))}
          </Select>
        </View>
        <View>
          <Select
            size="small"
            onSelect={(i: any) => handleExChange(listquotes[i.row])}
            value={currency}
            placeholder="Select Currency"
            style={{ width: 120 }}
          >
            {listquotes.map((quote, index) => (
              <SelectItem key={index} title={quote} />
            ))}
          </Select>
        </View>
      </View>
    </View>
  );
}
