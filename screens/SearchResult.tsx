import Filter from "@/components/Filter";
import SummaryCard from "@/components/SummaryCard";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import useStore from "@/hooks/useStore";
import RoomCard from "@/components/RoomCard";
import { TouchableOpacity, View, Text, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Topbar from "@/components/Topbar";
import SummaryBar from "@/components/SummaryBar";
import { COLORS } from "@/constants";
dayjs().format();
import stdroom from "assets/stdroom.jpg";

export default function SearchResultPage({ navigation }: any) {
  const { bookingDetail } = useStore();
  const { t } = useTranslation();

  const generateDateList = (start: Date, end: Date): string[] => {
    let dateList: string[] = [];
    for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
      let dateVar = date.toLocaleDateString("en-GB");
      console.log(dateVar);
      dateList.push(dateVar);
    }
    return dateList;
  };

  // const generatedDates = generateDateList(startDateFormat, endDateFormat);
  const standardUnavailableDateList = ["01/03/2024", "04/03/2024"];
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
    // isAvailable: generatedDates.every(
    //   (date) => !standardUnavailableDateList.includes(date)
    // ),
    // disabledDate: standardDisabledDate,
  };

  const mockDeluxeRoomInformation = {
    roomName: t("dlx_title"),
    maxGuest: 2,
    bedType: t("twin_bed"),
    roomSize: 20,
    roomPrice: 1800,
    roomImage:
      "https://drive.google.com/uc?export=download&id=1x-XcJq_7o3DymWHuX6wK0lSvszf9r3S1",
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
    // isAvailable: generatedDates.every(
    //   (date) => !deluxeUnavailableDateList.includes(date)
    // ),
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
    // isAvailable: generatedDates.every(
    //   (date) => !familyUnavailableDateList.includes(date)
    // ),
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
    // isAvailable: generatedDates.every(
    //   (date) => !suiteUnavailableDateList.includes(date)
    // ),
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
    // isAvailable: generatedDates.every(
    //   (date) => !executiveUnavailableDateList.includes(date)
    // ),
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
                // isAvailable={true}
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
