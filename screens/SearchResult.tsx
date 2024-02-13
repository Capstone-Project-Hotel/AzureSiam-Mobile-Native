import Filter from "@/components/Filter";
import SummaryCard from "@/components/SummaryCard";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import useStore from "@/hooks/useStore";
import RoomCard from "@/components/RoomCard";
import { TouchableOpacity, View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Topbar from "@/components/Topbar";
import SummaryBar from "@/components/SummaryBar";
dayjs().format();

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
  const standardUnavailableDateList = [
    "25/01/2024",
    "26/01/2024",
    "28/01/2024",
  ];
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

  // eslint-disable-next-line arrow-body-style
  // const standardDisabledDate: DatePickerProps["disabledDate"] = (current) => {
  //   const disabledDates = standardUnavailableDateList.map((dateString) =>
  //     dayjs(dateString, "DD/MM/YYYY")
  //   );
  //   return (
  //     current &&
  //     (current < dayjs().endOf("day") ||
  //       disabledDates.some((date) => current.isSame(date, "day")))
  //   );
  // };

  // const deluxeDisabledDate: DatePickerProps["disabledDate"] = (current) => {
  //   const disabledDates = deluxeUnavailableDateList.map((dateString) =>
  //     dayjs(dateString, "DD/MM/YYYY")
  //   );
  //   return (
  //     current &&
  //     (current < dayjs().endOf("day") ||
  //       disabledDates.some((date) => current.isSame(date, "day")))
  //   );
  // };

  // const familyDisabledDate: DatePickerProps["disabledDate"] = (current) => {
  //   const disabledDates = familyUnavailableDateList.map((dateString) =>
  //     dayjs(dateString, "DD/MM/YYYY")
  //   );
  //   return (
  //     current &&
  //     (current < dayjs().endOf("day") ||
  //       disabledDates.some((date) => current.isSame(date, "day")))
  //   );
  // };

  // const suiteDisabledDate: DatePickerProps["disabledDate"] = (current) => {
  //   const disabledDates = suiteUnavailableDateList.map((dateString) =>
  //     dayjs(dateString, "DD/MM/YYYY")
  //   );
  //   return (
  //     current &&
  //     (current < dayjs().endOf("day") ||
  //       disabledDates.some((date) => current.isSame(date, "day")))
  //   );
  // };

  // const executiveDisabledDate: DatePickerProps["disabledDate"] = (current) => {
  //   const disabledDates = executiveUnavailableDateList.map((dateString) =>
  //     dayjs(dateString, "DD/MM/YYYY")
  //   );
  //   return (
  //     current &&
  //     (current < dayjs().endOf("day") ||
  //       disabledDates.some((date) => current.isSame(date, "day")))
  //   );
  // };

  const mockStandardRoomInformation = {
    roomName: t("std_title"),
    maxGuest: 1,
    bedType: t("single_bed"),
    roomSize: 16,
    roomPrice: 1200,
    roomImage:
      "https://cdn.discordapp.com/attachments/457166097230069773/1186386766119305258/cover.jpg?ex=65930fc7&is=65809ac7&hm=81597f4a64012d760e9c97c217db3cae2617d4f37183b609a89429cc3562fd42&",
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
      "https://cdn.discordapp.com/attachments/457166097230069773/1186387436901781634/cover_1.jpg?ex=65931066&is=65809b66&hm=f75c101fa0d7768bac471cc46a3c94a94b5a1737567af3c91951c95abfc4ec9b&",
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
      "https://cdn.discordapp.com/attachments/457166097230069773/1186387586516791326/cover_2.jpg?ex=6593108a&is=65809b8a&hm=44468b0913ab9e438ce166d2c49366e3833e42e84669ffff7b38eb770aac7c1c&",
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
      "https://cdn.discordapp.com/attachments/457166097230069773/1188826464708218920/image_41.jpg?ex=659befec&is=65897aec&hm=5a3d092015cc24fcd079f85b33341c508f33152ec6ea2e2c7b2c5796e4839e6a&",
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
      "https://cdn.discordapp.com/attachments/457166097230069773/1188826023228354650/image_40_1_1.jpg?ex=659bef83&is=65897a83&hm=6582bd0a8cc86db4a4146b452e6d4b139146174c8c42818f174afa5fbd7e6bc0&",
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
    <View>
      <Topbar
        landingHandler={() => {
          navigation.navigate("Landing");
        }}
      />
      <ScrollView>
        {/* Go To ReservationAndGuestDetail Page Example */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Reservation And Guest Detail")}
        >
          <Text style={{ height: 55 }}>
            Go To ReservationAndGuestDetail Page
          </Text>
        </TouchableOpacity>
        <Filter />
        {/* <SummaryCard
          page="search-result"
          confirmBooking={() =>
            navigation.navigate("Reservation And Guest Detail")
          }
        /> */}
        <SummaryBar />
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
      </ScrollView>
    </View>
  );
}
