import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "@/constants";
import CustomDateRange from "./CustomDateRange";
import useStore from "@/hooks/useStore";
import { Button } from "@ui-kitten/components";

const BOTTOM_BAR_HEIGHT = 40;
const TAB_ITEM_RADIUS = 30;

export default function TestBottomTab({
  height,
  contactUsHandler,
}: {
  height?: number;
  contactUsHandler: Function;
}) {
  const { bookingDetail, setBookingDetail } = useStore();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const onClickCalendar = () => {
    setIsDatePickerVisible(true);
  };

  const onModalClose = () => {
    setIsDatePickerVisible(false);
  };
  const styles = getStyles(height);
  // const handleCalendar = ()=>{
  //   CustomDateRange
  // }
  return (
    <View style={styles.container}>
      <Modal
        visible={isDatePickerVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.calendarModalContainer}>
          <Button onPress={onModalClose}>Dismiss</Button>
          <CustomDateRange />
        </View>
      </Modal>
      <View style={styles.tabContainer}>
        <View style={styles.tabItem}>
          <AntDesign
            name="home"
            color={COLORS.PRIMARY}
            onPress={() => {}}
            size={styles.tabItem.borderRadius}
          />
        </View>
        <Pressable onPress={onClickCalendar}>
          <View style={styles.tabItem}>
            <AntDesign
              name="calendar"
              color={COLORS.PRIMARY}
              size={styles.tabItem.borderRadius}
            />
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
            contactUsHandler();
          }}
        >
          <View style={styles.tabItem}>
            <AntDesign
              name="info"
              color={COLORS.PRIMARY}
              size={styles.tabItem.borderRadius}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const getStyles = (height: number | undefined) => {
  const bottomBarHeight = height ?? BOTTOM_BAR_HEIGHT;
  const tabItemRadius = height ? height - 10 : TAB_ITEM_RADIUS;
  return StyleSheet.create({
    container: {
      backgroundColor: COLORS.PRIMARY,
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
      width: tabItemRadius * 2,
      height: tabItemRadius * 2,
      borderRadius: tabItemRadius,
      backgroundColor: "white",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    tabIcon: {},
    calendarModalContainer: {},
  });
};

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
