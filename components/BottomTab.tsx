import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function BottomTab() {
  return (
    // <View style={styles.container}>
    //   <View style={styles.tab} ></View>

    // </View>
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#f8f4f4",
      }}
    >
      <View
        style={{
          position: "absolute",
          alignSelf: "center",
          backgroundColor: "#f8f4f4",
          width: 70,
          height: 70,
          borderRadius: 35,
          bottom: 25,
          zIndex: 10,
        }}
      >
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: "#2196F3",
          bottom: 0,
          zIndex: 1,
          width: "100%",
          height: 60,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingVertical: 10,
        }}
      >
        <AntDesign name="calendar" color="#fff" onPress={() => {}} />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <AntDesign name="search1" color="#fff" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  tab: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
});
