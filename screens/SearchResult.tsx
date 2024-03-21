import Filter from "@/components/Filter";
import SummaryCard from "@/components/SummaryCard";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import useStore from "@/hooks/useStore";
import RoomCard from "@/components/RoomCard";
import {
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Topbar from "@/components/Topbar";
import SummaryBar from "@/components/SummaryBar";
import { COLORS, DEVICE } from "@/constants";
import AppText from "@/components/AppText";
dayjs().format();

const rooms = {
  standard: {
    uri: "https://drive.google.com/uc?export=download&id=1T7uKb6UmggJ4UEzY7gY9f442zkrqqNPi",
    images: [
      "https://image-tc.galaxy.tf/wijpeg-4xrh8wkeksa0lb2jjhjyb6bxk/sandman-signature-saskatoon-south-hotel-corp-king-sofa-bed-w-euro-shower-bath-2_wide.jpg?crop=0%2C84%2C1600%2C900&width=1140",
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTrmFKkPaYE9q1hzcjDppcp_QYSJlZG8JnSF0_FUOtTT2loh4kA",
    ],
  },
  deluxe: {
    uri: "https://drive.google.com/uc?export=download&id=1A1LakXbp0_34aEUuJiheHpQjvjkU-bgC",
    images: [
      "https://www.botanicserviceroom.com/uploads/images/rooms/1580916590qf79ctC5yT.jpeg",
      "https://lebua.com/wp-content/uploads/2019/07/02.-LST_-Suites-City-View.jpg",
    ],
  },
  family: {
    uri: "https://drive.google.com/uc?export=download&id=1oVxVhLAQYnYUlMAhbqsaU-_5uqLCmWuf",
    images: [
      "https://media-cdn.tripadvisor.com/media/photo-s/0b/16/99/02/bathroom-of-the-family.jpg",
      "https://1.bp.blogspot.com/-QC4aWXP3BJw/VNnTWYJ9LgI/AAAAAAAAg9A/9S6vPwcsaOQ/s1600/1.jpg",
    ],
  },
  suite: {
    uri: "https://drive.google.com/uc?export=download&id=14poEWNuJlDvqWRX_xcg8tFeQrDwrlOpF",
    images: [
      "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/219/2020/02/11095044/3.-Rooms-Suites-details-1.-Superior-Room.jpg",
      "https://d2e5ushqwiltxm.cloudfront.net/wp-content/uploads/sites/219/2020/03/31105553/26.jpg",
    ],
  },
  executive: {
    uri: "https://drive.google.com/uc?export=download&id=1jyPl3qhga00wJ8eWcyXB131K0k0e3aed",
    images: [
      "https://drive.google.com/uc?export=download&id=1jyPl3qhga00wJ8eWcyXB131K0k0e3aed",
      "https://drive.google.com/uc?export=download&id=1GPzWaZZwOtOQupH_ABnWE9H8n8utPq1Z",
      "https://discoveryprimeademo.hotelpropeller.com/files/2017/02/Executive_Suite_2.jpg",
    ],
  },
};

export default function SearchResultPage({ navigation }: any) {
  const { bookingDetail } = useStore();
  const { t } = useTranslation();

  let startDate = new Date(
    bookingDetail.startDate.toString().split(" ").slice(0, 4).join(" ")
  );

  let endDate = new Date(
    bookingDetail.endDate.toString().split(" ").slice(0, 4).join(" ")
  );

  const generateDateList = (start: Date, end: Date): string[] => {
    let dateList: string[] = [];
    for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
      let dateVar = date.toLocaleDateString("en-GB");
      dateList.push(dateVar);
    }
    return dateList;
  };

  // bookingDetail
  const generatedDates = generateDateList(startDate, endDate);

  const standardUnavailableDateList = ["01/03/2024", "10/03/2024"];
  const deluxeUnavailableDateList = [
    "25/01/2024",
    "26/01/2024",
    "28/01/2024",
    "29/01/2024",
    "14/02/2024",
    "15/02/2024",
  ];
  const familyUnavailableDateList = ["25/01/2024", "26/01/2024", "28/01/2024"];
  const suiteUnavailableDateList = ["25/01/2024", "26/01/2024", "28/01/2024"];
  const executiveUnavailableDateList = [
    "25/01/2024",
    "26/01/2024",
    "28/01/2024",
  ];

  const mockStandardRoomInformation = {
    roomName: t("std_title"),
    maxGuest: 1,
    bedType: t("single_bed"),
    roomSize: 16,
    roomPrice: 1200,
    roomImage:
      "https://drive.google.com/uc?export=download&id=1T7uKb6UmggJ4UEzY7gY9f442zkrqqNPi",
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("desk"),
      t("cable"),
      t("non_smoking"),
    ],
    roomDetail: t("standard_room_desc"),
    roomType: "standard",
    show:
      bookingDetail.showStandard &&
      !bookingDetail.showOnlyBalcony &&
      !bookingDetail.showOnlyDinnerPlan &&
      !bookingDetail.showOnlyJacuzzi,
    isAvailable: generatedDates.every(
      (date) => !standardUnavailableDateList.includes(date)
    ),
    // disabledDate: standardDisabledDate,
  };

  const mockDeluxeRoomInformation = {
    roomName: t("dlx_title"),
    maxGuest: 2,
    bedType: t("twin_bed"),
    roomSize: 20,
    roomPrice: 1800,
    roomImage:
      "https://drive.google.com/uc?export=download&id=1A1LakXbp0_34aEUuJiheHpQjvjkU-bgC",
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("desk"),
      t("cable"),
      t("balcony"),
      t("non_smoking"),
    ],
    roomDetail: t("deluxe_room_desc"),
    roomType: "deluxe",
    show:
      bookingDetail.showDeluxe &&
      !bookingDetail.showOnlyDinnerPlan &&
      !bookingDetail.showOnlyJacuzzi &&
      !bookingDetail.showBelowOption1,
    isAvailable: generatedDates.every(
      (date) => !deluxeUnavailableDateList.includes(date)
    ),
    // disabledDate: deluxeDisabledDate,
  };

  const mockFamilyRoomInformation = {
    roomName: t("fml_title"),
    maxGuest: 4,
    bedType: t("double_bed"),
    roomSize: 28,
    roomPrice: 2200,
    roomImage:
      "https://drive.google.com/uc?export=download&id=1oVxVhLAQYnYUlMAhbqsaU-_5uqLCmWuf",
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("compact_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("desk"),
      t("cable"),
      t("balcony"),
      t("non_smoking"),
    ],
    roomDetail: t("family_room_desc"),
    roomType: "family",
    show:
      bookingDetail.showFamily &&
      !bookingDetail.showOnlyDinnerPlan &&
      !bookingDetail.showOnlyJacuzzi &&
      !bookingDetail.showBelowOption1 &&
      !bookingDetail.showBelowOption2,
    isAvailable: generatedDates.every(
      (date) => !familyUnavailableDateList.includes(date)
    ),
    // disabledDate: familyDisabledDate,
  };

  const mockSuiteRoomInformation = {
    roomName: t("s_title"),
    maxGuest: 2,
    bedType: t("queen_bed"),
    roomSize: 30,
    roomPrice: 2500,
    roomImage:
      "https://drive.google.com/uc?export=download&id=14poEWNuJlDvqWRX_xcg8tFeQrDwrlOpF",
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("non_smoking"),
      t("desk"),
      t("jacuzzi"),
      t("cable"),
      t("balcony"),
      t("parlor"),
      t("dinner"),
    ],
    roomDetail: t("suite_room_desc"),
    roomType: "suite",
    show:
      bookingDetail.showSuite &&
      !bookingDetail.showBelowOption1 &&
      !bookingDetail.showBelowOption2,
    isAvailable: generatedDates.every(
      (date) => !suiteUnavailableDateList.includes(date)
    ),
    // disabledDate: suiteDisabledDate,
  };

  const mockExecutiveRoomInformation = {
    roomName: t("ex_title"),
    maxGuest: 4,
    bedType: t("king_bed"),
    roomSize: 40,
    roomPrice: 3000,
    roomImage:
      "https://drive.google.com/uc?export=download&id=1jyPl3qhga00wJ8eWcyXB131K0k0e3aed",
    roomAmenities: [
      t("television"),
      t("air_conditioner"),
      t("mini_fridge"),
      t("hairdryer"),
      t("wireless_internet"),
      t("non_smoking"),
      t("desk"),
      t("jacuzzi"),
      t("cable"),
      t("balcony"),
      t("parlor"),
      t("dinner"),
    ],
    roomDetail: t("executive_room_desc"),
    roomType: "executive",
    show:
      bookingDetail.showExecutive &&
      !bookingDetail.showBelowOption1 &&
      !bookingDetail.showBelowOption2 &&
      !bookingDetail.showBelowOption3,
    isAvailable: generatedDates.every(
      (date) => !executiveUnavailableDateList.includes(date)
    ),
    // disabledDate: executiveDisabledDate,
  };

  const mockRoomInformation = [
    mockStandardRoomInformation,
    mockDeluxeRoomInformation,
    mockFamilyRoomInformation,
    mockSuiteRoomInformation,
    mockExecutiveRoomInformation,
  ];

  let reducedRate = 1;

  return (
    <View style={{ marginBottom: 120 }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.PRIMARY}
        // barStyle={statusBarStyle}
        // showHideTransition={statusBarTransition}
        hidden={true}
      />
      <Topbar
        landingHandler={() => {
          navigation.navigate("Landing");
        }}
      />
      <ScrollView>
        {/* Go To ReservationAndGuestDetail Page Example */}
        <Filter t={t} />
        <View
          style={{
            marginTop: 30,
            marginBottom: 50,
            display: "flex",
            flexDirection: "column",
            rowGap: 15,
            alignItems: "center",
          }}
        >
          {mockRoomInformation.map((room, index) =>
            room.show === true ? (
              <RoomCard
                key={index}
                roomName={room.roomName}
                maxGuest={room.maxGuest}
                bedType={room.bedType}
                roomSize={room.roomSize}
                roomPrice={room.roomPrice * reducedRate}
                roomImage={room.roomImage}
                roomAmenities={room.roomAmenities}
                roomDetail={room.roomDetail}
                roomType={room.roomType}
                t={t}
                isAvailable={room.isAvailable}
                modalContent={
                  <>
                    <AppText styles={styles.modalTitle}>
                      {/* {t("std_title")} */}
                      {room.roomName}
                    </AppText>
                    <AppText styles={styles.modalDescription}>
                      {/* {t("standard_room_desc")} */}
                      {room.roomDetail}
                    </AppText>
                    <FlatList
                      data={[
                        { key: `- ${t("mini_fridge")}` },
                        { key: `- ${t("hairdryer")}` },
                        { key: `- ${t("television")}` },
                        { key: `- ${t("air_conditioner")}` },
                        { key: `- ${t("wireless_internet")}` },
                        { key: `- ${t("desk")}` },
                        { key: `- ${t("bath")}` },
                      ]}
                      renderItem={({ item }) => (
                        <Text style={styles.listText}>{item.key}</Text>
                      )}
                      style={styles.listRoomFeatures}
                    />
                    <View
                      style={{
                        marginTop: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        columnGap: 5,
                      }}
                    >
                      <Image
                        source={{ uri: rooms.standard.uri }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.standard.images[0] }}
                        style={styles.modalImage}
                      />
                      <Image
                        source={{ uri: rooms.standard.images[1] }}
                        style={styles.modalImage}
                      />
                    </View>
                  </>
                }
                // disabledDate={}
              />
            ) : null
          )}
        </View>
      </ScrollView>
      <SummaryBar
        t={t}
        page={"search-result"}
        reservationAndGuestDetailHandler={() => {
          navigation.navigate("Reservation And Guest Detail");
        }}
        summaryBookingDetailHandler={() => {}}
        isDisabledConfirm={false}
      />
    </View>
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
});
