import { View, Image, Text } from "react-native";
import { Select, SelectItem } from "@ui-kitten/components";
import i18next, { languageResources } from "../services/i18next";
import useStore from "@/hooks/useStore";
import languagesList from "../services/languagesList.json";
import axios from "axios";
import { COLORS } from "@/constants";

const Topbar = ({ scrollView }: any) => {
  const { lng, setLng, currency, setCurrency, setExchangeRate } = useStore();
  const changeLng = (lng: any) => {
    i18next.changeLanguage(lng);
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
      <View
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
              uri: "https://cdn.discordapp.com/attachments/457166097230069773/1206260423544803408/Vector_1.png?ex=65db5c90&is=65c8e790&hm=a627479eb6fc79bef30c82b72a8e85260830e6ba90d65a8236faa848d7eb08b2&",
            }}
            style={{ width: 20, height: 20 }}
          />
        </View>
        <View>
          <Text style={{ color: "white" }}>AzureSiam</Text>
        </View>
      </View>
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
};

export default Topbar;
