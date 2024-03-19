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
import AntDesign from "@expo/vector-icons/AntDesign";

export default function SmallModalCard({
  cardContent,
  modalContent,
  modalContentStyle,
  modalStyle,
  transparent = false,
  animationType = "fade",
}: {
  cardContent: React.ReactNode;
  modalContent?: React.ReactNode;
  modalContentStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade" | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <TouchableOpacity onPress={handleOpen}>{cardContent}</TouchableOpacity>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={isModalOpen}
      >
        <View style={[styles.container, modalStyle]}>
          <View style={[styles.modalContent, modalContentStyle]}>
            <AntDesign
              name="close"
              style={{
                alignSelf: "flex-end",
              }}
              size={40}
              onPress={handleClose}
            />
            {modalContent}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgb(25, 90, 90)",
    flex: 1,
  },
  modalContent: {
    margin: 8,
  },
  // title: {
  //   fontWeight: "900",
  // },
});
