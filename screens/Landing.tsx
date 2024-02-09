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
} from "react-native";
import LandingBigCard from "@/components/LandingBigCard";
import { useFonts } from "expo-font";
import AppText from "@/components/AppText";
import React, { useState } from "react";
import SmallModalCard from "@/components/SmallModalCard";
import Card from "@/components/Card";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import Button from "@ant-design/react-native/lib/button";
// import { Carousel } from "@ant-design/react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import BottomTab from "@/components/BottomTab";
import TestBottomTab from "@/components/TestBottomTab";
import useStore from "@/hooks/useStore";

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
import CustomDateRange from "@/components/CustomDateRange";

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

export default function Landing({ navigation }: any) {
  // Test lng
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const { bookingDetail, setBookingDetail } = useStore();

  const changeLng = (lng: any) => {
    i18next.changeLanguage(lng);
    setVisible(false);
  };

  const [fontsLoaded, fontError] = useFonts({
    NotoSansThai: require("@/assets/fonts/NotoSansThai.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  }
  const width = Dimensions.get("window").width; // ย้ายไป cosntant

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Reservation And Guest Detail")}
      >
        <Text style={{ height: 55 }}>Go To ReservationAndGuestDetail Page</Text>
      </TouchableOpacity>
      {/* Text lng */}
      <SafeAreaView style={{ margin: 20 }}>
        <Modal visible={visible} onRequestClose={() => setVisible(false)}>
          <View>
            <FlatList
              style={{ padding: 30 }}
              data={Object.keys(languageResources)}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => changeLng(item)}>
                  <Text style={{ fontSize: 20 }}>
                    {(languagesList as any)[item].nativeName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
        <Text style={{ fontSize: 20, textAlign: "center", padding: 10 }}>
          {t("welcome")}
        </Text>
        <Button
          onPress={() => setVisible(true)}
          title={t("change-language")}
          color="green"
        />
      </SafeAreaView>

      <View style={styles.container}>
        <ScrollView>
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
                AzureSiam Hotel and Spa
              </AppText>
              <AppText styles={styles.landingBigCardDescription}>
                Welcome to AzureSiam Hotel, an urban retreat seamlessly blending
                modern with timeless allure.
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
          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>Room Type</AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name="Standard Room" image={rooms.standard.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Standard Room</AppText>
                    <AppText styles={styles.modalDescription}>
                      The room is designed to meet fundamental criteria for
                      comfort, functionality, and aesthetics. This room is
                      equipped with essential amenities necessary for a
                      comfortable stay or specific purposes, ensuring a
                      standardized level of quality. It may feature standard
                      furniture, basic technology, and necessary facilities,
                      making it suitable for a wide range of users or purposes.
                    </AppText>
                    <FlatList
                      data={[
                        { key: "- Mini Fridge" },
                        { key: "- Hairdryer" },
                        { key: "- Television" },
                        { key: "- Air Conditioned" },
                        { key: "- Wireless Internet" },
                        { key: "- Desk" },
                        { key: "- Bath" },
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
                  <Card name="Deluxe Room" image={rooms.deluxe.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Deluxe Room</AppText>
                    <AppText styles={styles.modalDescription}>
                      An upgraded version of the standard room, the deluxe room
                      offers more space and often features enhanced furnishings,
                      better views, and additional amenities such as a balcony
                      or a seating area. It provides a touch of luxury for
                      guests looking for a bit more comfort.
                    </AppText>
                    <FlatList
                      data={[
                        { key: "- Mini Fridge" },
                        { key: "- Hairdryer" },
                        { key: "- Television" },
                        { key: "- Air Conditioned" },
                        { key: "- Wireless Internet" },
                        { key: "- Desk" },
                        { key: "- Cable/Satellite TV" },
                        { key: "- Balcony" },
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
                  <Card name="Family Room" image={rooms.family.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Family Room</AppText>
                    <AppText styles={styles.modalDescription}>
                      Specifically designed for families, these rooms often
                      feature extra sleeping space such as bunk beds or a
                      pull-out sofa. Family rooms provide the convenience of
                      staying together in one room while ensuring everyone has a
                      comfortable place to sleep.
                    </AppText>
                    <FlatList
                      data={[
                        { key: "- Compact Fridge" },
                        { key: "- Hairdryer" },
                        { key: "- Television" },
                        { key: "- Air Conditioned" },
                        { key: "- Wireless Internet" },
                        { key: "- Desk" },
                        { key: "- Cable/Satellite TV" },
                        { key: "- Balcony" },
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
          <LandingBigCard style={styles.bigCard}>
            <View
              style={{
                flex: 1,
                marginLeft: 16,
                marginRight: 16,
              }}
            >
              <AppText styles={styles.landingBigCardTitle}>
                TranquilHaven Spa
              </AppText>
              <AppText styles={styles.landingBigCardDescription}>
                AzureSiam Spa: A holistic haven for mind, body, and soul. Our
                skilled therapists offer tailored treatments for ultimate
                relaxation.
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
              <AppText styles={styles.landingBigCardTitle}>Indoor Gym</AppText>
              <AppText styles={styles.landingBigCardDescription}>
                Elevate your stay with our state-of-the-art indoor gym facility.
                Whether you're a fitness enthusiast or looking to maintain your
                workout routine while traveling.
              </AppText>
            </View>
          </LandingBigCard>
          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>Promotions</AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name="50% Sale" image={promotions.fifty.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>50% Sale</AppText>
                    <AppText styles={styles.modalDescription}>
                      Embrace luxury for less with our 50% off hotel room sale!
                      Enjoy a comfortable and stylish stay at half the price.
                      Whether it's a spontaneous trip or a planned escape, this
                      limited-time offer lets you indulge in quality
                      accommodation without breaking the bank. Book now and
                      elevate your travel experience with unbeatable savings!
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name="Monday Sale" image={promotions.monday.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Monday Sale</AppText>
                    <AppText styles={styles.modalDescription}>
                      Elevate your Mondays with our exclusive hotel room sale!
                      Enjoy unbeatable discounts for a premium stay without the
                      premium price. Perfect for business or leisure, seize this
                      opportunity to turn your Monday into a memorable
                      experience. Book now and make your week start on a high
                      note!
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name="Friday Sale" image={promotions.friday.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Friday Sale</AppText>
                    <AppText styles={styles.modalDescription}>
                      Kick off your weekend with our Friday Sale on hotel rooms!
                      Enjoy exclusive discounts for a perfect blend of comfort
                      and savings. Whether it's a romantic getaway or a
                      spontaneous escape, make your Friday night special without
                      breaking the bank. Book now for unbeatable savings and
                      elevate your weekend stay!
                    </AppText>
                  </>
                }
              />
            </View>
          </View>
          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>Activity Schedule</AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallModalCard
                cardContent={
                  <Card name="Swimming Pool" image={schedule.swim.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Swimming Pool</AppText>
                    <AppText styles={styles.modalDescription}>
                      Dive into versatility with pool activities! Whether it's a
                      leisurely swim, family fun, or a focused workout, the pool
                      caters to all interests. From water aerobics to
                      competitive training, it's a refreshing and social space
                      for relaxation, family time, or beating the heat.
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name="Meditation" image={schedule.medi.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Meditation</AppText>
                    <AppText styles={styles.modalDescription}>
                      Meditation promotes mindfulness and inner peace. By
                      focusing on breath or the present moment in a quiet space,
                      it reduces stress, enhances well-being, and fosters mental
                      clarity—a valuable tool for daily life challenges.
                    </AppText>
                  </>
                }
              />
              <SmallModalCard
                cardContent={
                  <Card name="Rock Climbing" image={schedule.rock.uri} />
                }
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>Rock Climbing</AppText>
                    <AppText styles={styles.modalDescription}>
                      Rock climbing is a meditative pursuit, combining physical
                      challenge with mental focus. Whether indoors or outdoors,
                      the rhythmic breath and intense concentration turn the
                      climb into a moving meditation, offering a unique and
                      invigorating form of mindfulness.
                    </AppText>
                  </>
                }
              />
            </View>
          </View>
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
            <CustomDateRange />
            <TouchableOpacity
              onPress={() => {
                const updatedBookingDetail: BookingDetail = {
                  ...bookingDetail,
                  startDate: "09-02-2024",
                  endDate: "11-02-2024",
                  adultNumber: 1,
                  childrenNumber: 0,
                  codePromotion: "promo001",
                };
                setBookingDetail(updatedBookingDetail);
                navigation.navigate("SearchResult");
              }}
            >
              <Text style={{ height: 55 }}>Go To Search Result Page</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionMargin}>
            <AppText styles={styles.sectionText}>Nearby Attraction</AppText>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Card
                name="Siam Paragon"
                image={attractions.paragon.uri}
                url={attractions.paragon.loc}
              />
              <Card
                name="Samyan Mitrtown"
                image={attractions.samyan.uri}
                url={attractions.samyan.loc}
              />
              <Card
                name="Central World"
                image={attractions.central.uri}
                url={attractions.central.loc}
              />
            </View>
          </View>

          <View style={styles.bottomScrollSpace}></View>
        </ScrollView>
        <BottomTab
          height={40}
          contactUsHandler={() => {
            navigation.navigate("ContactUs");
          }}
        />
        {/* <TestBottomTab/> */}
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
});
