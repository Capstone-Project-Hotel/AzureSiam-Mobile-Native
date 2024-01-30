import { Modal, Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import Card from "./Card";
import AppText from "./AppText";

export default function SmallModalCard({
  cardContent,
  modalContent,
  modalContentStyle,
}: {
  cardContent: React.ReactNode;
  modalContent?: React.ReactNode;
  modalContentStyle?:StyleProp<ViewStyle>
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <>
      <Pressable onPressOut={handleOpen}>{cardContent}</Pressable>
      <Modal animationType="slide" transparent={false} visible={isModalOpen}>
        <Pressable onPress={handleClose}>
          <View style={[styles.modalContent, modalContentStyle]}>
            {modalContent}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    margin: 8
  },
  // title: {
  //   fontWeight: "900",
  // },
});
