import { StatusBar } from "expo-status-bar";
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
} from "react-native";
import LandingBigCard from "@/components/LandingBigCard";
import { useFonts } from "expo-font";
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

const width = Dimensions.get("window").width; // ย้ายไป cosntant

const banner = {
  uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186379702336753684/coverImage.jpg",
};
const bigCard1_History = {
  uri: "https://cdn.discordapp.com/attachments/457166097230069773/1182354485096497322/image.png",
};

const rooms = {
  standard: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186386766119305258/cover.jpg",
  },
  deluxe: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186387436901781634/cover_1.jpg",
  },
  family: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186387586516791326/cover_2.jpg",
  },
};

const bigCard2_spa = {
  uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186388457875050618/image_22.jpg",
};

const bigCard3_gym = {
  uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186536405954998322/image_22_1.jpg",
};

const gallery = [
  {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186565137671409726/image_28.jpg",
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

import i18next, { languageResources } from "../services/i18next";
import { useTranslation } from "react-i18next";
import languagesList from "../services/languagesList.json";
import { Select, SelectItem } from "@ui-kitten/components";

const promotions = {
  fifty: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186562459033686056/image_14.jpg",
  },
  monday: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186562459331477626/cover_3.jpg",
  },
  friday: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186562459604090920/cover_4.jpg",
  },
};

const schedule = {
  swim: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186562753062785054/cover_5.jpg",
  },
  medi: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186562753389936750/cover_6.jpg",
  },
  rock: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186562753759039508/cover_7.jpg",
  },
};

const attractions = {
  paragon: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186563062191357963/cover_8.jpg",
    loc: "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%A2%E0%B8%B2%E0%B8%A1%E0%B8%9E%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%81%E0%B8%AD%E0%B8%99/@13.7463371,100.5322779,17z/data=!4m10!1m2!2m1!1ssiam+paragon!3m6!1s0x30e29ecde3aee521:0x9f43939a2caf2963!8m2!3d13.7462411!4d100.5347402!15sCgxzaWFtIHBhcmFnb25aDiIMc2lhbSBwYXJhZ29ukgEPc2hvcHBpbmdfY2VudGVy4AEA!16zL20vMDltbWho?entry=ttu",
  },
  samyan: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186563062510137374/cover_9.jpg",
    loc: "https://www.google.com/maps/place/%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%99+%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%A3%E0%B8%97%E0%B8%B2%E0%B8%A7%E0%B8%99%E0%B9%8C/@13.7336159,100.525937,17z/data=!3m1!4b1!4m6!3m5!1s0x30e298d55b6099b5:0xe4f4cc8ef569d83f!8m2!3d13.7336159!4d100.5285119!16s%2Fg%2F11cs1tf084?entry=ttu",
  },
  central: {
    uri: "https://cdn.discordapp.com/attachments/457166097230069773/1186563062765994074/cover_10.jpg",
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
    NotoSansThai: require("@/assets/fonts/NotoSansThai.ttf"),
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
      <View style={styles.container}>
        <ScrollView ref={(ref: any) => setRef(ref)}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{ position: "absolute", top: 20, left: 20, zIndex: 100 }}
          >
            <Image
              source={require("../assets/menu.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>

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
                  <Text style={styles.menuModalText}>
                    {t("facilities")}
                  </Text>
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
                  <Text style={styles.menuModalText}>{t("activity_schedule")}</Text>
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
                  <Text style={styles.menuModalText}>{t("nearby_attraction")}</Text>
                </TouchableOpacity>
                {/* Language */}
                <View style={styles.menuModalContainer}>
                  <MaterialIcons name="language" size={32} color="black" />
                  <Text style={styles.menuModalText}>{t("change-language")}</Text>
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
            source={banner}
            style={styles.bannerImage}
          ></ImageBackground>
          <LandingBigCard style={styles.bigCard}>
            <View
              style={{
                flex: 1,
                // justifyContent
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
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name={t("std_title")} image={rooms.standard.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("std_title")}</AppText>
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
                    />
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("dlx_title")} image={rooms.deluxe.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("dlx_title")}</AppText>
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
                    />
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("fml_title")} image={rooms.family.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("fml_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("family_room_desc")}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("compact_fridge")}` },
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
                    />
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
              <AppText styles={styles.landingBigCardTitle}>{t("gym_title")}</AppText>
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
                    <AppText styles={styles.modalTitle}>{t("fifty_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("fifty_description")}
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("monday_title")} image={promotions.monday.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("monday_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("monday_description")}
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("friday_title")} image={promotions.friday.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("friday_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("friday_description")}
                    </AppText>
                  </>
                }
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
            <AppText styles={styles.sectionText}>{t("activity_schedule")}</AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name={t("swim_title")} image={schedule.swim.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("swim_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("swim_description")}
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("medi_title")} image={schedule.medi.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("medi_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("medi_description")}
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name={t("rock_title")} image={schedule.rock.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>{t("rock_title")}</AppText>
                    <AppText styles={styles.modalDescription}>
                      {t("rock_description")}
                    </AppText>
                  </>
                }
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
            {/* <CustomDateRange />
            <TouchableOpacity
              onPress={() => {
                const updatedBookingDetail: BookingDetail = {
                  ...bookingDetail,
                  startDate: "14/02/2024",
                  endDate: "11/02/2024",
                  adultNumber: 1,
                  childrenNumber: 0,
                  codePromotion: "promo001",
                };
                setBookingDetail(updatedBookingDetail);
                navigation.navigate("SearchResult");
              }}
            >
              <Text style={{ height: 55 }}>Go To Search Result Page</Text>
            </TouchableOpacity> */}
          </View>

          {/* setNearbyLayout */}
          <View
            onLayout={(event: any) => {
              setNearbyLayout(event.nativeEvent.layout);
            }}
          ></View>

          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>{t("nearby_attraction")}</AppText>
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
            navigation.navigate("Contact Us");
          }}
          searchResultHandler={() => {
            navigation.navigate("SearchResult");
          }}
        />
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  bannerImage: { marginBottom: 16, height: 240 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // gap: 16,
  },
  bigCard: {
    height: 160,
    marginBottom: 24,
  },
  sectionMargin: {
    paddingLeft: 8,
    paddingBottom: 16,
    // marginRight: 8,
  },
  sectionText: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  listText: {
    color: "#3A3A3A",
  },
  landingBigCardTitle: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  landingBigCardDescription: {
    fontWeight: "normal",
    fontSize: 10,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 8,
  },
  modalDescription: {
    fontWeight: "normal",
    fontSize: 12,
    marginBottom: 8,
  },
  carouselImage: {
    flex: 1,
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
    fontSize: 20,
  },
});
