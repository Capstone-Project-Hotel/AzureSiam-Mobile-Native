import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from "react-native";
import LandingBigCard from "./components/LandingBigCard";
import { useFonts } from "expo-font";
import AppText from "./components/AppText";
import React, { useState } from "react";
import SmallModalCard from "./components/SmallModalCard";
import Card from "./components/Card";

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

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansThai: require("./assets/fonts/NotoSansThai.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  }
  return (
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
              cardContent={<Card name="Deluxe Room" image={rooms.deluxe.uri} />}
              modalContent={
                <>
                  <AppText styles={styles.modalTitle}>Deluxe Room</AppText>
                  <AppText styles={styles.modalDescription}>
                    An upgraded version of the standard room, the deluxe room
                    offers more space and often features enhanced furnishings,
                    better views, and additional amenities such as a balcony or
                    a seating area. It provides a touch of luxury for guests
                    looking for a bit more comfort.
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
              cardContent={<Card name="Family Room" image={rooms.family.uri} />}
              modalContent={
                <>
                  <AppText styles={styles.modalTitle}>Family Room</AppText>
                  <AppText styles={styles.modalDescription}>
                    Specifically designed for families, these rooms often
                    feature extra sleeping space such as bunk beds or a pull-out
                    sofa. Family rooms provide the convenience of staying
                    together in one room while ensuring everyone has a
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
        <StatusBar style="auto" />
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerImage: { marginBottom: 16, height: 240 },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    gap: 16,
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
});
