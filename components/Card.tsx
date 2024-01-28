import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Card({
  name,
  image,
  description,
  children,
}: {
  name: string;
  image: string;
  description: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <View>
      <Image source={{ uri: image }} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {},
  description: {},
});
