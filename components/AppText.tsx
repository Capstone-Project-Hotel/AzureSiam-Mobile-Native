import { Platform, StyleProp, Text, TextStyle } from "react-native";
import React, { ReactNode } from "react";
export default function AppText({
  styles,
  children,
}: {
  styles?: StyleProp<TextStyle>;
  children: ReactNode;
}) {
  let fontWeight, style;
  if (styles && Object.hasOwn(styles, "fontWeight")) {
    ({ fontWeight, ...style } = styles as any);
  }
  return (
    <Text
      style={[
        {
          fontFamily: getFontFamily(fontWeight ?? 400),
          fontSize: 10,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const FONT_FAMILY = [
  "NotoSansThai_100Thin",
  "NotoSansThai_200ExtraLight",
  "NotoSansThai_300Light",
  "NotoSansThai_400Regular",
  "NotoSansThai_500Medium",
  "NotoSansThai_600SemiBold",
  "NotoSansThai_700Bold",
  "NotoSansThai_800ExtraBold",
  "NotoSansThai_900Black",
];

type FONT_WEIGHT =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

const NUMBER_WEIGHT_REGEX = /^[1-9]00$/;

const getFontFamily = (weight: FONT_WEIGHT) => {
  let family;
  // if(Platform.OS === "ios"){

  // }else{

  // }
  if (NUMBER_WEIGHT_REGEX.test(weight)) {
    family = FONT_FAMILY[Number(weight.toString()[0]) - 1];
  } else {
    family = FONT_FAMILY[weight == "bold" ? 6 : 3];
  }
  return family;
};
