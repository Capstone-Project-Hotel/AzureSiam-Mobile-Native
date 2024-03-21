// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
  AppRegistry,
  Dimensions,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Button,
  TouchableHighlight,
  StatusBar,
} from "react-native";
import LandingBigCard from "@/components/LandingBigCard";
import { useFonts } from "expo-font";
import {
  NotoSansThai_100Thin,
  NotoSansThai_200ExtraLight,
  NotoSansThai_300Light,
  NotoSansThai_400Regular,
  NotoSansThai_500Medium,
  NotoSansThai_600SemiBold,
  NotoSansThai_700Bold,
  NotoSansThai_800ExtraBold,
  NotoSansThai_900Black,
} from "@expo-google-fonts/noto-sans-thai";
import AppText from "@/components/AppText";
import React, { useEffect, useRef, useState } from "react";
import SmallModalCard from "@/components/SmallModalCard";
import Card from "@/components/Card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import BottomTab from "@/components/BottomTab";
import useStore from "@/hooks/useStore";
import axios from "axios";
import {
  Ionicons,
  Entypo,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import i18next, { languageResources } from "../services/i18next";
import { useTranslation } from "react-i18next";
import languagesList from "../services/languagesList.json";
import { Select, SelectItem } from "@ui-kitten/components";
import { COLORS, DEVICE } from "@/constants";
const width = Dimensions.get("window").width; // ย้ายไป cosntant

const logo = {
  uri: "https://drive.google.com/uc?export=download&id=1HRRO45x_Bo5d_SJY_aW-USKVY2mWXo6y",
};
const banner = {
  uri: "https://drive.google.com/uc?export=download&id=1C2A_9JtOep3mcddudH6W0VhfxWpErGW1",
};
const bigCard1_History = {
  uri: "https://drive.google.com/uc?export=download&id=1IQIvHXUnpHrJdZgcTyyUCr_z0Cq03dy2",
};

const rooms = {
  standard: {
    uri: "https://drive.google.com/uc?export=download&id=1T7uKb6UmggJ4UEzY7gY9f442zkrqqNPi",
    images: [
      "https://image-tc.galaxy.tf/wijpeg-4xrh8wkeksa0lb2jjhjyb6bxk/sandman-signature-saskatoon-south-hotel-corp-king-sofa-bed-w-euro-shower-bath-2_wide.jpg?crop=0%2C84%2C1600%2C900&width=1140",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTrmFKkPaYE9q1hzcjDppcp_QYSJlZG8JnSF0_FUOtTT2loh4kA",
    ],
  },
  deluxe: {
    uri: "https://drive.google.com/uc?export=download&id=1A1LakXbp0_34aEUuJiheHpQjvjkU-bgC",
    images: [
      "https://www.botanicserviceroom.com/uploads/images/rooms/1580916590qf79ctC5yT.jpeg",
      "https://lebua.com/wp-content/uploads/2019/07/02.-LST_-Suites-City-View.jpg",
    ],
  },
  family: {
    uri: "https://drive.google.com/uc?export=download&id=1oVxVhLAQYnYUlMAhbqsaU-_5uqLCmWuf",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/0b/16/99/02/bathroom-of-the-family.jpg",
      "https://1.bp.blogspot.com/-QC4aWXP3BJw/VNnTWYJ9LgI/AAAAAAAAg9A/9S6vPwcsaOQ/s1600/1.jpg",
    ],
  },
  suite: {
    uri: "https://drive.google.com/uc?export=download&id=14poEWNuJlDvqWRX_xcg8tFeQrDwrlOpF",
    images: [
      "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/219/2020/02/11095044/3.-Rooms-Suites-details-1.-Superior-Room.jpg",
      "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/219/2020/03/31105553/26.jpg",
    ],
  },
  executive: {
    uri: "https://drive.google.com/uc?export=download&id=1jyPl3qhga00wJ8eWcyXB131K0k0e3aed",
    images: [
      "https://drive.google.com/uc?export=download&id=1jyPl3qhga00wJ8eWcyXB131K0k0e3aed",
      "https://drive.google.com/uc?export=download&id=1GPzWaZZwOtOQupH_ABnWE9H8n8utPq1Z",
      "https://discoveryprimeademo.hotelpropeller.com/files/2017/02/Executive_Suite_2.jpg",
    ],
  },
};

const bigCard2_spa = {
  uri: "https://drive.google.com/uc?export=download&id=1AwtBE6l0RBitIDQRnAMzzDoerW9c6Aj6",
};

const bigCard3_gym = {
  uri: "https://drive.google.com/uc?export=download&id=1BzV3FTu8nMDOb96qVCk9_jmLhhiyrRz5",
};

const gallery = [
  {
    uri: "https://drive.google.com/uc?export=download&id=1nK26pKdG65j9ICN1NzvEQ3ehnexuO2nD",
  },
  {
    uri: "https://www.botanicserviceroom.com/uploads/images/rooms/1580917027SYoMNr02iB.jpeg",
  },
  {
    uri: "https://www.botanicserviceroom.com/uploads/images/rooms/1580916883LfnEwUK4s4.jpeg",
  },
  {
    uri: "https://www.botanicserviceroom.com/uploads/images/rooms/1580918079W9DIBxRYeD.jpeg",
  },
];

const promotions = {
  fifty: {
    uri: "https://drive.google.com/uc?export=download&id=1fXV15J0-1KagxpubVsR4SSp8Pv4otrmX",
  },
  monday: {
    uri: "https://drive.google.com/uc?export=download&id=1G6ZonT804KSoYw2Cd9oRZ8ktJX1o5wqA",
  },
  friday: {
    uri: "https://drive.google.com/uc?export=download&id=1EJXrjcSESvRIHcHJy0HEp9OLyCCZJzoo",
  },
};

const schedule = {
  swim: {
    uri: "https://drive.google.com/uc?export=download&id=1iWpTk6O-08DmU8DeiG2lN_Vuqzoz9xdv",
  },
  medi: {
    uri: "https://drive.google.com/uc?export=download&id=1cHIHIqBVyq-Mkgqdl_wIvrD_NjPElmRH",
  },
  rock: {
    uri: "https://drive.google.com/uc?export=download&id=1TEHWomcYBVVckdfisJ7AXTwAa2tYFL2O",
  },
};

const attractions = {
  paragon: {
    uri: "https://drive.google.com/uc?export=download&id=1zQOLPsoA5nnoIy0hg60X73jz1ZRSBMzH",
    loc: "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%99/@13.7463371,100.5322779,17z/data=!4m10!1m2!2m1!1ssiam+paragon!3m6!1s0x30e29ecde3aee521:0x9f43939a2caf2963!8m2!3d13.7462411!4d100.5347402!15sCgxzaWFtIHBhcmFnb25aDiIMc2lhbSBwYXJhZ29ukgEPc2hvcHBpbmdfY2VudGVy4AEA!16zL20vMDltbWho?entry=ttu",
  },
  samyan: {
    uri: "https://drive.google.com/uc?export=download&id=1r_NDqudU4S75qmbzrfogxoe9KuVDyT82",
    loc: "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%99+%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%A3%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C/@13.7336159,100.525937,17z/data=!3m1!4b1!4m6!3m5!1s0x30e298d55b6099b5:0xe4f4cc8ef569d83f!8m2!3d13.7336159!4d100.5285119!16s%2Fg%2F11cs1tf084?entry=ttu",
  },
  central: {
    uri: "https://drive.google.com/uc?export=download&id=1dXHH5ZzYr9rzg1kTj-V4O47s9BbIZkIT",
    loc: "https://www.google.com/maps/place/%E0%B9%80%E0%B8%8B%E0%B9%87%E0%B8%99%E0%B8%97%E0%B8%A3%E0%B8%B1%E0%B8%A5%E0%B9%80%E0%B8%A7%E0%B8%B4%E0%B8%A5%E0%B8%94%E0%B9%8C/@13.7465337,100.5365739,17z/data=!3m1!4b1!4m6!3m5!1s0x30e29ecfc2f455e1:0xc4ad0280d8906604!8m2!3d13.7465337!4d100.5391488!16zL20vMGZuNTdn?entry=ttu",
  },
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

export default function Landing({ navigation }: any) {
  // Test lng

  const [visible, setVisible] = useState(false);
  const [visibleL, setVisibleL] = useState(false);
  const { t } = useTranslation();
  const { setCurrency, setExchangeRate, currency, lng, setLng } = useStore();

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

  const changeLng = (lng: any) => {
    i18next.changeLanguage(lng);
    setVisibleL(false);
  };

  const [ref, setRef] = useState<any>(null);
  const [roomLayout, setRoomLayout] = useState<any>(null);
  const [facilitiesLayout, setFacilitiesLayout] = useState<any>(null);
  const [promotionsLayout, setPromotionsLayout] = useState<any>(null);
  const [activityLayout, setActivityLayout] = useState<any>(null);
  const [galleryLayout, setGalleryLayout] = useState<any>(null);
  const [nearbyLayout, setNearbyLayout] = useState<any>(null);
  const scrollTo = (layout: any) => {
    setVisible(false);
    if (ref && layout) {
      ref.scrollTo({ y: layout.y, animated: true });
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    NotoSansThai_100Thin,
    NotoSansThai_200ExtraLight,
    NotoSansThai_300Light,
    NotoSansThai_400Regular,
    NotoSansThai_500Medium,
    NotoSansThai_600SemiBold,
    NotoSansThai_700Bold,
    NotoSansThai_800ExtraBold,
    NotoSansThai_900Black,
  });
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  }
  // const width = Dimensions.get("window").width; // ย้ายไป constant

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Go To ReservationAndGuestDetail Page Example */}
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Reservation And Guest Detail")}
      >
        <Text style={{ height: 55 }}>Go To ReservationAndGuestDetail Page</Text>
      </TouchableOpacity> */}
      <StatusBar
        animated={true}
        backgroundColor={COLORS.PRIMARY}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden={true}
      />
      <View style={styles.container}>
        {/* <View
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 100,
            // elevation: 4,
            // shadowColor: "#000",
            // shadowOffset: { width: -1, height: 1 },
          }}
        > */}
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            zIndex: 100,
            backgroundColor: "transparent",
            shadowRadius: 8,
            elevation: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            // borderWidth: 0
          }}
        >
          <Image
            source={require("../assets/menu.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
        {/* </View> */}
        <ScrollView ref={(ref: any) => setRef(ref)}>
          {/* Menu Modal */}
          <Modal visible={visible} onRequestClose={() => setVisible(false)}>
            <View>
              <View style={{ padding: 30 }}>
                <TouchableOpacity
                  onPress={() => setVisible(false)}
                  style={{ alignSelf: "flex-start" }}
                >
                  <Image
                    source={require("../assets/x.png")}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>
              </View>
              <View>
                {/* Home */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => {
                    setVisible(false);
                    if (ref) {
                      ref.scrollTo({ y: 0, animated: true });
                    }
                  }}
                >
                  <Entypo name="home" size={32} color="black" />
                  <Text style={styles.menuModalText}>{t("home")}</Text>
                </TouchableOpacity>
                {/* Room Type */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => scrollTo(roomLayout)}
                >
                  <Ionicons name="bed" size={32} color="black" />
                  <Text style={styles.menuModalText}>{t("room_type")}</Text>
                </TouchableOpacity>
                {/* Facilities & Services */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => scrollTo(facilitiesLayout)}
                >
                  <MaterialIcons name="room-service" size={32} color="black" />
                  <Text style={styles.menuModalText}>{t("facilities")}</Text>
                </TouchableOpacity>
                {/* Promotions */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => scrollTo(promotionsLayout)}
                >
                  <AntDesign name="gift" size={32} color="black" />
                  <Text style={styles.menuModalText}>{t("promotions")}</Text>
                </TouchableOpacity>
                {/* Activity Schedule */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => scrollTo(activityLayout)}
                >
                  <MaterialIcons name="schedule" size={32} color="black" />
                  <Text style={styles.menuModalText}>
                    {t("activity_schedule")}
                  </Text>
                </TouchableOpacity>
                {/* Gallery */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => scrollTo(galleryLayout)}
                >
                  <Entypo name="images" size={32} color="black" />
                  <Text style={styles.menuModalText}>{t("gallery")}</Text>
                </TouchableOpacity>
                {/* Nearby Attraction */}
                <TouchableOpacity
                  style={styles.menuModalContainer}
                  onPress={() => scrollTo(nearbyLayout)}
                >
                  <MaterialCommunityIcons
                    name="google-nearby"
                    size={32}
                    color="black"
                  />
                  <Text style={styles.menuModalText}>
                    {t("nearby_attraction")}
                  </Text>
                </TouchableOpacity>
                {/* Language */}
                <View style={styles.menuModalContainer}>
                  <MaterialIcons name="language" size={32} color="black" />
                  <Text style={styles.menuModalText}>
                    {t("change-language")}
                  </Text>
                  <Select
                    onSelect={(i: any) => {
                      changeLng(["en", "th"][i.row]);
                      setLng(["English", "ไทย"][i.row]);
                    }}
                    value={lng}
                    placeholder="Select Currency"
                    style={{ width: 130 }}
                  >
                    {Object.keys(languageResources).map((lng, index) => (
                      <SelectItem
                        key={index}
                        title={(languagesList as any)[lng].nativeName}
                      />
                    ))}
                  </Select>
                </View>
                {/* Currency */}
                <View style={styles.menuModalContainer}>
                  <MaterialIcons
                    name="currency-exchange"
                    size={32}
                    color="black"
                  />
                  <Text style={styles.menuModalText}>{t("currency")}</Text>
                  <Select
                    onSelect={(i: any) => handleExChange(listquotes[i.row])}
                    value={currency}
                    placeholder="Select Currency"
                    style={{ width: 130 }}
                  >
                    {listquotes.map((quote, index) => (
                      <SelectItem key={index} title={quote} />
                    ))}
                  </Select>
                </View>
              </View>
            </View>
          </Modal>

          <ImageBackground
            source={require("assets/landing.png")}
            style={styles.bannerImage}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                opacity: 0.85,
                marginBottom: 8,
              }}
            >
              <Image
                source={{
                  uri: "https://drive.google.com/uc?export=download&id=1HRRO45x_Bo5d_SJY_aW-USKVY2mWXo6y",
                }}
                style={{
                  width: 30,
                  height: 30,
                  marginHorizontal: 8,
                }}
              />
              <View>
                <Text style={{ color: "white", fontSize: 24 }}>AzureSiam</Text>
                <Text style={{ color: "white", fontSize: 16 }}>
                  {t("hotel_description")}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <LandingBigCard style={styles.bigCard}>
            <View
              style={{
                flex: 1,
                marginLeft: 16,
                marginRight: 16,
              }}
            >
              <AppText styles={styles.landingBigCardTitle}>
                {t("hotel")}
              </AppText>
              <AppText styles={styles.landingBigCardDescription}>
                {t("history_description")}
              </AppText>
            </View>
            <Image
              source={bigCard1_History}
              style={{
                flex: 1,
                // resizeMode: "contain",
                height: styles.bigCard.height,
              }}
            />
          </LandingBigCard>
          <View></View>
          {/* add slider */}

          {/* setRoomLayout */}
          <View
            onLayout={(event: any) => {
              setRoomLayout(event.nativeEvent.layout);
            }}
          ></View>

          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>{t("room_type")}</AppText>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <SmallModalCard
                cardContent={
                  <Card name={t("std_title")} image={rooms.standard.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("std_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("standard_room_desc")}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("mini_fridge")}` },
                        { key: `- ${t("hairdryer")}` },
                        { key: `- ${t("television")}` },
                        { key: `- ${t("air_conditioner")}` },
                        { key: `- ${t("wireless_internet")}` },
                        { key: `- ${t("desk")}` },
                        { key: `- ${t("bath")}` },
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.listText}>{item.key}</Text>
                      )}
                      style={styles.listRoomFeatures}
                    />
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        columnGap: 5,
                      }}
                    >
                      <Image
                        source={{ uri: rooms.standard.uri }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.standard.images[0] }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.standard.images[1] }}
                        style={styles.modalImage}
                      />
                    </View>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("dlx_title")} image={rooms.deluxe.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("dlx_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("deluxe_room_desc")}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("mini_fridge")}` },
                        { key: `- ${t("hairdryer")}` },
                        { key: `- ${t("television")}` },
                        { key: `- ${t("air_conditioner")}` },
                        { key: `- ${t("wireless_internet")}` },
                        { key: `- ${t("desk")}` },
                        { key: `- ${t("bath")}` },
                        { key: `- ${t("cable")}` },
                        { key: `- ${t("balcony")}` },
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.listText}>{item.key}</Text>
                      )}
                      style={styles.listRoomFeatures}
                    />
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        columnGap: 5,
                      }}
                    >
                      <Image
                        source={{ uri: rooms.deluxe.uri }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.deluxe.images[0] }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.deluxe.images[1] }}
                        style={styles.modalImage}
                      />
                    </View>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("fml_title")} image={rooms.family.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("fml_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("family_room_desc")}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("fridge")}` },
                        { key: `- ${t("hairdryer")}` },
                        { key: `- ${t("television")}` },
                        { key: `- ${t("air_conditioner")}` },
                        { key: `- ${t("wireless_internet")}` },
                        { key: `- ${t("desk")}` },
                        { key: `- ${t("bath")}` },
                        { key: `- ${t("cable")}` },
                        { key: `- ${t("balcony")}` },
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.listText}>{item.key}</Text>
                      )}
                      style={styles.listRoomFeatures}
                    />
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        columnGap: 5,
                      }}
                    >
                      <Image
                        source={{ uri: rooms.family.uri }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.family.images[0] }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.family.images[1] }}
                        style={styles.modalImage}
                      />
                    </View>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("s_title")} image={rooms.suite.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("s_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("suite_room_desc")}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("mini_fridge")}` },
                        { key: `- ${t("hairdryer")}` },
                        { key: `- ${t("television")}` },
                        { key: `- ${t("air_conditioner")}` },
                        { key: `- ${t("wireless_internet")}` },
                        { key: `- ${t("desk")}` },
                        { key: `- ${t("bath")}` },
                        { key: `- ${t("cable")}` },
                        { key: `- ${t("balcony")}` },
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.listText}>{item.key}</Text>
                      )}
                      style={styles.listRoomFeatures}
                    />
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        columnGap: 5,
                      }}
                    >
                      <Image
                        source={{ uri: rooms.suite.uri }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.suite.images[0] }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.suite.images[1] }}
                        style={styles.modalImage}
                      />
                    </View>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("ex_title")} image={rooms.executive.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("ex_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("executive_room_desc")}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("fridge")}` },
                        { key: `- ${t("hairdryer")}` },
                        { key: `- ${t("television")}` },
                        { key: `- ${t("air_conditioner")}` },
                        { key: `- ${t("wireless_internet")}` },
                        { key: `- ${t("desk")}` },
                        { key: `- ${t("bath")}` },
                        { key: `- ${t("cable")}` },
                        { key: `- ${t("balcony")}` },
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.listText}>{item.key}</Text>
                      )}
                      style={styles.listRoomFeatures}
                    />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        rowGap: 10,
                      }}
                    >
                      <Image
                        source={{ uri: rooms.standard.uri }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.standard.images[0] }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.standard.images[1] }}
                        style={styles.modalImage}
                      />
                    </View>
                  </>
                }
              />
            </View>
          </View>

          {/* setFacilitiesLayout */}
          <View
            onLayout={(event: any) => {
              setFacilitiesLayout(event.nativeEvent.layout);
            }}
          ></View>

          <LandingBigCard style={styles.bigCard}>
            <View
              style={{
                flex: 1,
                marginLeft: 16,
                marginRight: 16,
              }}
            >
              <AppText styles={styles.landingBigCardTitle}>
                {t("spa_title")}
              </AppText>
              <AppText styles={styles.landingBigCardDescription}>
                {t("spa_description")}
              </AppText>
            </View>
            <Image
              source={bigCard2_spa}
              style={{
                flex: 1,
                // resizeMode: "contain",
                height: styles.bigCard.height,
              }}
            />
          </LandingBigCard>

          <LandingBigCard style={styles.bigCard}>
            <Image
              source={bigCard3_gym}
              style={{
                flex: 1,
                // resizeMode: "contain",
                height: styles.bigCard.height,
              }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 16,
                marginRight: 16,
              }}
            >
              <AppText styles={styles.landingBigCardTitle}>
                {t("gym_title")}
              </AppText>
              <AppText styles={styles.landingBigCardDescription}>
                {t("gym_description")}
              </AppText>
            </View>
          </LandingBigCard>

          {/* setPromotionsLayout */}
          <View
            onLayout={(event: any) => {
              setPromotionsLayout(event.nativeEvent.layout);
            }}
          ></View>

          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>{t("promotions")}</AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name={t("fifty_title")} image={promotions.fifty.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("fifty_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("fifty_description")}
                    </AppText>
                  </>
                }
                modalStyle={styles.centerScreenModalStyle}
                modalContentStyle={styles.centerScreenModalContentStyle}
                transparent={true}
              />
              <SmallModalCard
                cardContent={
                  <Card
                    name={t("monday_title")}
                    image={promotions.monday.uri}
                  />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("monday_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("monday_description")}
                    </AppText>
                  </>
                }
                modalStyle={styles.centerScreenModalStyle}
                modalContentStyle={styles.centerScreenModalContentStyle}
                transparent={true}
              />
              <SmallModalCard
                cardContent={
                  <Card
                    name={t("friday_title")}
                    image={promotions.friday.uri}
                  />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("friday_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("friday_description")}
                    </AppText>
                  </>
                }
                modalStyle={styles.centerScreenModalStyle}
                modalContentStyle={styles.centerScreenModalContentStyle}
                transparent={true}
              />
            </View>
          </View>

          {/* setActivityLayout */}
          <View
            onLayout={(event: any) => {
              setActivityLayout(event.nativeEvent.layout);
            }}
          ></View>

          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>
              {t("activity_schedule")}
            </AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name={t("swim_title")} image={schedule.swim.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("swim_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("swim_description")}
                    </AppText>
                  </>
                }
                modalStyle={styles.centerScreenModalStyle}
                modalContentStyle={styles.centerScreenModalContentStyle}
                transparent={true}
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("medi_title")} image={schedule.medi.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("medi_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("medi_description")}
                    </AppText>
                  </>
                }
                modalStyle={styles.centerScreenModalStyle}
                modalContentStyle={styles.centerScreenModalContentStyle}
                transparent={true}
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("rock_title")} image={schedule.rock.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {t("rock_title")}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("rock_description")}
                    </AppText>
                  </>
                }
                modalStyle={styles.centerScreenModalStyle}
                modalContentStyle={styles.centerScreenModalContentStyle}
                transparent={true}
              />
            </View>
          </View>

          {/* setGalleryLayout */}
          <View
            onLayout={(event: any) => {
              setGalleryLayout(event.nativeEvent.layout);
            }}
          ></View>

          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={width}
              height={width / 2}
              autoPlay={true}
              mode="parallax"
              data={gallery}
              scrollAnimationDuration={1000}
              // onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ index }) => (
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    justifyContent: "center",
                  }}
                >
                  {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                      {index}
                  </Text> */}
                  <Image source={gallery[index]} style={styles.carouselImage} />
                </View>
              )}
            />
          </View>

          {/* setNearbyLayout */}
          <View
            onLayout={(event: any) => {
              setNearbyLayout(event.nativeEvent.layout);
            }}
          ></View>

          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>
              {t("nearby_attraction")}
            </AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Card
                name={t("siam_title")}
                image={attractions.paragon.uri}
                url={attractions.paragon.loc}
              />
              <Card
                name={t("samyan_title")}
                image={attractions.samyan.uri}
                url={attractions.samyan.loc}
              />
              <Card
                name={t("central_title")}
                image={attractions.central.uri}
                url={attractions.central.loc}
              />
            </View>
          </View>

          <View style={styles.bottomScrollSpace}></View>
        </ScrollView>
        <BottomTab
          refProp={ref}
          height={40}
          contactUsHandler={() => {
            navigation.navigate("ContactUs");
          }}
          searchResultHandler={() => {
            navigation.navigate("SearchResult");
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bannerImage: {
    marginBottom: 16,
    height: 240,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // gap: 16,
  },
  bigCard: {
    height: 350,
    marginBottom: 24,
  },
  sectionMargin: {
    paddingLeft: 8,
    paddingBottom: 16,
    // marginRight: 8,
  },
  sectionText: {
    fontFamily: "NotoSansThai_700Bold",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  listText: {
    fontFamily: "NotoSansThai_400Regular",
    fontSize: 18,
  },
  landingBigCardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 30,
    marginBottom: 6,
  },
  landingBigCardDescription: {
    fontWeight: "normal",
    fontSize: 12,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  modalDescription: {
    fontWeight: "normal",
    fontSize: 16,
    marginBottom: 8,
  },
  carouselImage: {
    flex: 1,
    borderColor: "black",
    borderWidth: 0,
  },
  bottomScrollSpace: {
    height: 40,
  },
  menuModalContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  menuModalText: {
    fontFamily: "NotoSansThai_400Regular",
    fontSize: 20,
  },
  modalImage: {
    width: DEVICE.WIDTH * 0.3,
    aspectRatio: 1.25,
  },
  listRoomFeatures: {
    marginBottom: 8,
  },
  centerScreenModalStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centerScreenModalContentStyle: {
    width: "75%",
    borderRadius: 8,
    borderWidth: 2,
    // paddingTop: 8,
    paddingHorizontal: 8,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.WHITE,
  },
});
