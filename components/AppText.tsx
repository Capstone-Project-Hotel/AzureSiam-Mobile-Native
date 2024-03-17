import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React, { ReactNode } from "react";
import { NotoSansThai_700Bold,NotoSansThai_400Regular, NotoSansThai_600SemiBold } from "@expo-google-fonts/noto-sans-thai"
import { useFonts } from "@expo-google-fonts/noto-sans-thai";
export default function AppText({
  styles,
  children,
}: {
  styles?: StyleProp<TextStyle>
  children: ReactNode;
}) {
  const [fontsLoaded] = useFonts({
    NotoSansThai_400Regular,
    NotoSansThai_600SemiBold,
    NotoSansThai_700Bold,
  });
  return (
    <Text
      style={[{
        fontSize: 10,
        fontWeight: "normal",
        fontFamily: "NotoSansThai_400Regular"
      },styles]}
    >
      {children}
    </Text>
  );
}

// const styles = StyleSheet.create({
//   text: { fontFamily: "NotoSansThai", fontSize: 10 },
// });
