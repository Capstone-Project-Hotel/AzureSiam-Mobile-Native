import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";

export default function Card({
  name,
  image,
  description,
}: {
  name: string;
  image: string;
  description?: string;
}) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image } } style={styles.cover} />
      <AppText styles={styles.name}>{name}</AppText>
      {description? <AppText styles={styles.description}>{description}</AppText>: undefined}
    </View>
  );
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
      width: 0.5
    },
    backgroundColor: 'white'
  },
  cover: {
    // flex: 1,
    width: 120,
    height: 88,
    margin: 1
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
