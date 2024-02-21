import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import AppText from "./AppText";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SmallModalCard({
  cardContent,
  modalContent,
  modalContentStyle,
}: {
  cardContent: React.ReactNode;
  modalContent?: React.ReactNode;
  modalContentStyle?: StyleProp<ViewStyle>;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <>
      <TouchableOpacity onPress={handleOpen}>{cardContent}</TouchableOpacity>
      <Modal animationType="slide" transparent={false} visible={isModalOpen}>
        <AntDesign
          name="closecircleo"
          style={{
            alignSelf: "flex-end",
            paddingHorizontal: 8,
            paddingBottom: 8,
          }}
          size={40}
          onPress={handleClose}
        />
        <View style={[styles.modalContent, modalContentStyle]}>
          {modalContent}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    margin: 8,
  },
  // title: {
  //   fontWeight: "900",
  // },
});
