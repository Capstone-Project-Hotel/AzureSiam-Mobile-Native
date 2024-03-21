import useStore from "@/hooks/useStore";
import { Button, CalendarRange, RangeDatepicker } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { COLORS, DEVICE } from "@/constants";

export default function RoomCard({
  roomName,
  maxGuest,
  bedType,
  roomSize,
  roomPrice,
  roomImage,
  roomAmenities,
  roomDetail,
  roomType,
  isAvailable,
  modalContent,
  modalContentStyle,
  modalStyle,
  transparent = false,
  animationType = "fade",
  disabledDate,
  t,
}: {
  roomName: string;
  maxGuest: number;
  bedType: string;
  roomSize: number;
  roomPrice: number;
  roomImage: string;
  roomAmenities: string[];
  roomDetail: string;
  roomType: string;
  isAvailable: boolean;
  modalContent?: React.ReactNode;
  modalContentStyle?: StyleProp<ViewStyle>;
  modalStyle?: StyleProp<ViewStyle>;
  transparent?: boolean;
  animationType?: "none" | "slide" | "fade" | undefined;
  disabledDate: (date: Date) => boolean;
  t: any;
}) {
  const { bookingDetail, setBookingDetail, currency, exchangeRate } =
    useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const [range, setRange] = React.useState<CalendarRange<Date>>({
    startDate: bookingDetail.startDate,
    endDate: bookingDetail.endDate,
  });

  useEffect(() => {
    setRange({
      startDate: bookingDetail.startDate,
      endDate: bookingDetail.endDate,
    });
  }, [bookingDetail.startDate, bookingDetail.endDate]);

  let reducedRate = 1;

  if (bookingDetail.codePromotion === "valid001") {
    reducedRate = 0.8;
  }

  const handleBookNowClick = (roomType: string) => {
    const updatedBookingDetail = {
      ...bookingDetail,
      [`${roomType}RoomNumber`]: 1,
    };
    setBookingDetail(updatedBookingDetail);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: COLORS.BACKGROUND_1,
          borderRadius: 10,
          width: 350,
          padding: 10,
          shadowColor: "#000",
          elevation: 8,
          shadowOffset: {
            height: 10,
            width: 10,
          },
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16 }}>{roomName}</Text>
            <Image
              source={{
                uri: roomImage,
              }}
              style={{ width: 120, height: 90, borderRadius: 5 }}
            />
          </View>
          <View
            style={{
              marginRight: 20,
              marginTop: 20,
              display: "flex",
              flexDirection: "column",
              alignContent: "flex-start",
            }}
          >
            <Text style={{ fontSize: 14 }}>
              {t("maximum_guest")}: {maxGuest}
            </Text>
            <Text style={{ fontSize: 14 }}>
              {t("bed_type")}: {bedType}
            </Text>
            <Text style={{ fontSize: 14 }}>
              {t("size")}: {roomSize} m&sup2;
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleOpen();
              }}
            >
              <Text style={{ fontSize: 16, color: COLORS.SECONDARY }}>
                {t("show_more")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            columnGap: 20,
          }}
        >
          {isAvailable ? (
            <View>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                {" "}
                {currency}{" "}
                {new Intl.NumberFormat("th-TH", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(roomPrice * exchangeRate * reducedRate)}
              </Text>
              <Button
                onPress={() => handleBookNowClick(roomType)}
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor: COLORS.PRIMARY,
                  borderColor: "transparent",
                }}
                size="small"
              >
                {t("book_now")}
              </Button>
            </View>
          ) : (
            <View>
              <Button
                onPress={() => {}}
                style={{
                  width: 200,
                  height: 40,
                  backgroundColor: COLORS.PRIMARY,
                  borderColor: "transparent",
                }}
                size="small"
              >
                {t("find_available_date")}
              </Button>
              <RangeDatepicker
                size="small"
                style={{ width: 250 }}
                range={range}
                filter={disabledDate}
                onSelect={(nextRange: any) => {
                  setRange(nextRange);

                  if (nextRange.startDate && nextRange.endDate) {
                    let startDate = new Date(nextRange.startDate);
                    let endDate = new Date(nextRange.endDate);

                    const formattedStartDate =
                      startDate.toLocaleDateString("en-GB");
                    const formattedEndDate =
                      endDate.toLocaleDateString("en-GB");

                    const updatedBookingDetail = {
                      ...bookingDetail,
                      startDate: startDate,
                      endDate: endDate,
                    };
                    setBookingDetail(updatedBookingDetail);
                  }
                }}
              />
            </View>
          )}
        </View>
      </View>
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
  bannerImage: {
    marginBottom: 16,
    height: 240,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // gap: 16,
  },
  bigCard: {
    height: 350,
    marginBottom: 24,
  },
  sectionMargin: {
    paddingLeft: 8,
    paddingBottom: 16,
    // marginRight: 8,
  },
  sectionText: {
    fontFamily: "NotoSansThai_700Bold",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  listText: {
    fontFamily: "NotoSansThai_400Regular",
    fontSize: 18,
  },
  landingBigCardTitle: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 30,
    marginBottom: 6,
  },
  landingBigCardDescription: {
    fontWeight: "normal",
    fontSize: 12,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  modalDescription: {
    fontWeight: "normal",
    fontSize: 16,
    marginBottom: 8,
  },
  carouselImage: {
    flex: 1,
    borderColor: "black",
    borderWidth: 0,
  },
  bottomScrollSpace: {
    height: 40,
  },
  menuModalContainer: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  menuModalText: {
    fontFamily: "NotoSansThai_400Regular",
    fontSize: 20,
  },
  modalImage: {
    width: DEVICE.WIDTH * 0.3,
    aspectRatio: 1.25,
  },
  listRoomFeatures: {
    marginBottom: 8,
  },
  centerScreenModalStyle: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centerScreenModalContentStyle: {
    width: "75%",
    borderRadius: 8,
    borderWidth: 2,
    // paddingTop: 8,
    paddingHorizontal: 8,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.WHITE,
  },
  modalContent: {
    margin: 8,
  },
});
