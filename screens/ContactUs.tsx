import AppText from "@/components/AppText";
import { COLORS, SCREEN } from "@/constants";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";

export default function ContactUsPage() {
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
        <Image
          source={{ uri: "https://via.placeholder.com/800x300" }}
          alt="Google Map"
          style={styles.imageHorizontal}
        />
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
    flex: 4
    // maxHeight: 120,
    // borderColor: "red",
    // borderWidth: 4,
  },
  imageHorizontal: {
    width: SCREEN.WIDTH,
    // resizeMode: "contain",
    aspectRatio: 1.5,
  },
});
