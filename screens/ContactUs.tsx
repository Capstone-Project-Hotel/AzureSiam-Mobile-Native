import AppText from "@/components/AppText";
import { COLORS, DEVICE } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ContactUsPage() {
  const { t } = useTranslation();

  const [region, setRegion] = useState({
    latitude: 13.73888062491501,
    longitude: 100.52856058128086,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.01,
  });

  // const iframeString = (
  //   <iframe
  //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6108233620575!2d100.55429451115339!3d13.741996086593128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee6617256a5%3A0x164d43ff55c50a2a!2z4LmC4Lij4LiH4LmB4Lij4Lih4LmB4Lit4Lih4Lia4Liy4Liq4LiL4Liy4LmA4LiU4Lit4Lij4LmMIOC4geC4o-C4uOC4h-C5gOC4l-C4nuC4rw!5e0!3m2!1sth!2sth!4v1708770831677!5m2!1sth!2sth"
  //     width="600"
  //     height="450"
  //     style="border:0;"
  //     allowfullscreen=""
  //     loading="lazy"
  //     referrerpolicy="no-referrer-when-downgrade"
  //   ></iframe>
  // );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.textContainer}>
          <AppText styles={styles.title}>AzureSiam Hotel</AppText>
          <AppText styles={styles.description}>
            254 Phayathai RoadPathumwan, Bangkok 10330
          </AppText>
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.contactWithIconContainer}>
            <AntDesign
              name="phone"
              size={24}
              color={COLORS.PRIMARY}
              style={styles.contactIcon}
            />
            <AppText styles={styles.contactText}>+66-2414-5688</AppText>
          </View>
          <View style={styles.contactWithIconContainer}>
            <Fontisto
              name="email"
              size={24}
              color={COLORS.PRIMARY}
              style={styles.contactIcon}
            />
            <AppText styles={styles.contactText}>
              azuresiam@hotelservice.com
            </AppText>
          </View>
        </View>
      </View>
      <View style={styles.googleMapContainer}>
        {/* <Image
          source={{ uri: "https://via.placeholder.com/800x300" }}
          alt="Google Map"
          style={styles.imageHorizontal}
        /> */}
        {/* <WebView
          originWhitelist={["*"]}
          source={{
            html: "<h1>Hello world</h1>",
          }}
        /> */}
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} title="My Location" />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  headerContainer: {
    flex: 1,
    marginHorizontal: 24,
  },
  textContainer: {
    paddingBottom: 8,
    // flex height minimum
  },
  contactContainer: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 8,
  },
  contactWithIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
  },
  contactText: {
    fontSize: 12,
    color: "black",
  },
  contactIcon: {
    paddingRight: 12,
  },
  googleMapContainer: {
    flex: 4,
    // maxHeight: 120,
    // borderColor: "red",
    // borderWidth: 4,
  },
  imageHorizontal: {
    width: DEVICE.WIDTH,
    // resizeMode: "contain",
    aspectRatio: 1.5,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
