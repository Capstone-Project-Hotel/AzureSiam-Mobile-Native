import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import React, { ReactNode } from "react";
export default function AppText({
  styles,
  children,
}: {
  styles?: StyleProp<TextStyle>
  children: ReactNode;
}) {
  return (
    <Text
      style={[{
        fontSize: 10,
        fontWeight: "normal",
        fontFamily: "NotoSansThai",
      },styles]}
    >
      {children}
    </Text>
  );
}

// const styles = StyleSheet.create({
//   text: { fontFamily: "NotoSansThai", fontSize: 10 },
// });
