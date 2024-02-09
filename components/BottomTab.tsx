import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "@/constants";

const BOTTOM_BAR_HEIGHT = 40;
const TAB_ITEM_RADIUS = 30;

export default function TestBottomTab({height}:{height?: number}) {
  const styles = getStyles(height);
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <View
          style={styles.tabItem}
        >
          <AntDesign name="home" color={COLORS.PRIMARY} onPress={() => {}} size={styles.tabItem.borderRadius}/>
        </View>
        <View
          style={styles.tabItem}
        >
          <AntDesign name="calendar" color={COLORS.PRIMARY} onPress={() => {}} size={styles.tabItem.borderRadius}/>
        </View>
        <View
          style={styles.tabItem}
        >
          <AntDesign name="info" color={COLORS.PRIMARY} onPress={() => {}} size={styles.tabItem.borderRadius}/>
        </View>
      </View>
      {/* <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30, // halve width&height
          backgroundColor: "green",
          position: "absolute",
          left: 0,
          top: -30, // - halve width&height
        }}
      /> */}
    </View>
  );
}

const getStyles = (height:number|undefined) => {
  const bottomBarHeight = height ?? BOTTOM_BAR_HEIGHT
  const tabItemRadius = height ? height-10: TAB_ITEM_RADIUS
  return StyleSheet.create({
    container: {
      backgroundColor: "red",
      height: bottomBarHeight,
      marginTop: 0,
      paddingTop: 0,
    },
    tabContainer: {
      backgroundColor: "transparent",
      // position: "absolute",
      top: -(bottomBarHeight / 2),
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    tabItem: {
      width: tabItemRadius*2,
      height: tabItemRadius*2,
      borderRadius: tabItemRadius,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    tabIcon: {
      
    }
  });
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "red",
//     height: BOTTOM_BAR_HEIGHT,
//     marginTop: 0,
//     paddingTop: 0,
//   },
//   tabContainer: {
//     backgroundColor: "transparent",
//     // position: "absolute",
//     top: -(BOTTOM_BAR_HEIGHT / 2),
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     alignItems: "center",
//   },
//   tabItem: {
//     width: TAB_ITEM_RADIUS * 2,
//     height: TAB_ITEM_RADIUS * 2,
//     borderRadius: TAB_ITEM_RADIUS, // halve width&height
//     backgroundColor: "white",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   tabIcon: {

//   }
// });
