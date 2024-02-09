import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import * as Linking from "expo-linking";

export default function Card({
  name,
  image,
  description,
  url,
}: {
  name: string;
  image: string;
  description?: string;
  url?: string;
}) {
  const childrenCard = (
    <>
      <Image source={{ uri: image }} style={styles.cover} />
      <AppText styles={styles.name}>{name}</AppText>
      {description ? (
        <AppText styles={styles.description}>{description}</AppText>
      ) : undefined}
    </>
  );
  if (url) {
    return (
      <Pressable
        style={styles.container}
        onPress={async () => {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }}
      >
        {childrenCard}
      </Pressable>
    );
  } else {
    return <View style={styles.container}>{childrenCard}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    alignItems: "center",
    // backgroundColor:'#d9d9d9',
    shadowColor: "#000",
    shadowOpacity: 0.0,
    shadowRadius: 0.1,
    shadowOffset: {
      height: 0.5,
      width: 0.5,
    },
    backgroundColor: "white",
  },
  cover: {
    // flex: 1,
    width: 120,
    height: 88,
    margin: 1,
    // resizeMode: 'stretch',
  },
  name: {
    fontWeight: "bold",
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 6,
  },
  description: {
    fontWeight: "normal",
    fontSize: 10,
  },
});
