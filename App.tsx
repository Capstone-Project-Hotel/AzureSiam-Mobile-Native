import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import banner from "./assets/landing-banner.png";
import bigCard1 from "./assets/landing-bigCard-1.png";
import LandingBigCard from "./components/LandingBigCard";
import { useFonts } from "expo-font";
import AppText from "./components/AppText";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "NotoSansThai": require("./assets/fonts/NotoSansThai.ttf"),
  });
  if (!fontsLoaded) {
    return <Text>LOADING...</Text>;
  }
  return (
    <View style={styles.container}>
      <Image source={banner} />
      <LandingBigCard>
        <View
          style={{
            flex: 1,
            // justifyContent
            marginLeft: 16,
            marginRight: 16,
            // marginTop: 16,
          }}
        >
          <AppText styles={{
            fontWeight: 'bold',
            fontSize: 12
          }} >
            AzureSiam Hotel and Spa
          </AppText>
          <AppText styles={{
            fontWeight: 'normal',
            fontSize: 10
          }}>
            Welcome to AzureSiam Hotel, an urban retreat seamlessly blending modern   with timeless allure. 
          </AppText>
        </View>
        <Image
          source={bigCard1}
          style={{
            flex: 1,
            resizeMode: "contain",
            // aspectRatio: 1, // Your aspect ratio
          }}
        />
      </LandingBigCard>
      <Text style={{
        fontFamily: "NotoSansThai"
        }}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 8
    // justifyContent: 'center',
  },
});
