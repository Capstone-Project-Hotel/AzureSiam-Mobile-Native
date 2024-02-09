"use client";
import {
  CalendarOutlined,
  UserOutlined,
  PlusCircleFilled,
  MinusCircleFilled,
  LeftOutlined,
  DownOutlined,
} from "@ant-design/icons";

// import "primeicons/primeicons.css";
// import useStore from "@/hooks/useStore";
// import { InputNumber, Button, Drawer } from "antd";
import { AppRegistry } from "react-native";
import { Button, InputItem, Drawer } from "@ant-design/react-native";
// import Link from "next/link";
import { useState } from "react";

const RoomNumberInput = ({
  roomType,
  value,
  onChange,
}: {
  roomType: string;
  value: number;
  onChange: Function;
}) => {
  const handleDecrease = () => {
    if (value > 1) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex gap-x-[0.5vw]">
      <MinusCircleFilled
        className="text-h4 mobile:text-h3-mobile"
        onClick={handleDecrease}
      />

      <InputItem
        type="number"
        // value={value}
        // min={1}
        onChange={(newValue) => {
          const updatedValue = typeof newValue === "number" ? newValue : 1;
          onChange(updatedValue);
        }}
        // className="w-[4vw] h-[4vh] mobile:w-[12vw]"
      />

      <PlusCircleFilled
        className="text-h4 mobile:text-h3-mobile"
        onClick={handleIncrease}
      />
    </div>
  );
};

export default function SummaryBar({
  page,
  isDisabledConfirm,
  t,
}: {
  page: string;
  isDisabledConfirm: boolean;
  t: any;
}) {
  // const { bookingDetail, setBookingDetail, exchangeRate, currency } =
  //   useStore();

  // Assuming startDate and endDate are in the format dd-mm-yyyy
  // const startDateParts = bookingDetail.startDate.split("-");
  // const endDateParts = bookingDetail.endDate.split("-");

  // Creating Date objects with the specified format
  // const startDateFormat = new Date(
  //   Date.UTC(
  //     parseInt(startDateParts[2]),
  //     parseInt(startDateParts[1]) - 1,
  //     parseInt(startDateParts[0]),
  //     0,
  //     0,
  //     0
  //   )
  // );
  // const endDateFormat = new Date(
  //   Date.UTC(
  //     parseInt(endDateParts[2]),
  //     parseInt(endDateParts[1]) - 1,
  //     parseInt(endDateParts[0]),
  //     0,
  //     0,
  //     0
  //   )
  // );

  // Calculate the difference in milliseconds
  // const timeDifference = endDateFormat.getTime() - startDateFormat.getTime();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short", // Short day name (e.g., Sun)
    month: "short", // Short month name (e.g., Nov)
    day: "numeric", // Day of the month (e.g., 19)
    year: "2-digit", // Last two digits of the year (e.g., 23)
  };

  // const formattedStartDateString = startDateFormat.toLocaleDateString(
  //   "en-US",
  //   options
  // );

  // const formattedEndDateString = endDateFormat.toLocaleDateString(
  //   "en-US",
  //   options
  // );

  // Convert the difference to days
  // const dayDuration = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  let mondayAndFridayNightCount = 0;
  let saturdayNightCount = 0;

  const generateDateList = (start: Date, end: Date): string[] => {
    let dateList: string[] = [];
    for (let date = start; date < end; date.setDate(date.getDate() + 1)) {
      if (date.getDay() === 6) {
        // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
        saturdayNightCount++;
      }
      if (date.getDay() === 5 || date.getDay() === 1) {
        mondayAndFridayNightCount++;
      }
      let dateVar = date.toLocaleDateString("en-GB");
      console.log(dateVar);
      dateList.push(dateVar);
    }
    return dateList;
  };

  // const generatedDates = generateDateList(startDateFormat, endDateFormat);

  // console.log("saturday nights:", saturdayNightCount);
  // console.log("monday and friday nights:", mondayAndFridayNightCount);

  // calculate price here

  let reducedRate = 1;
  let exchangeRate = 1;
  let standardRoomNumber = 1;
  let deluxeRoomNumber = 0;
  let familyRoomNumber = 0;
  let suiteRoomNumber = 0;
  let executiveRoomNumber = 0;
  let packageOne = false;
  let packageTwo = false;
  let isCheckedPDPA = false;

  let adultNumber = 1;
  let childrenNumber = 0;

  let currency = "THB";

  // if (bookingDetail.codePromotion === "valid001") {
  //   reducedRate = 0.8;
  // }

  // let mondayAndFridaySale =
  //   200 *
  //   mondayAndFridayNightCount *
  //   (bookingDetail.standardRoomNumber +
  //     bookingDetail.deluxeRoomNumber +
  //     bookingDetail.familyRoomNumber +
  //     bookingDetail.suiteRoomNumber +
  //     bookingDetail.executiveRoomNumber) *
  //   reducedRate *
  //   exchangeRate;
  // let saturdayAdditionalCost =
  //   200 *
  //   saturdayNightCount *
  //   (bookingDetail.standardRoomNumber +
  //     bookingDetail.deluxeRoomNumber +
  //     bookingDetail.familyRoomNumber +
  //     bookingDetail.suiteRoomNumber +
  //     bookingDetail.executiveRoomNumber) *
  //   reducedRate *
  //   exchangeRate;

  // let subTotal =
  //   (1200 * bookingDetail.standardRoomNumber +
  //     1800 * bookingDetail.deluxeRoomNumber +
  //     2200 * bookingDetail.familyRoomNumber +
  //     2500 * bookingDetail.suiteRoomNumber +
  //     3000 * bookingDetail.executiveRoomNumber -
  //     mondayAndFridaySale +
  //     saturdayAdditionalCost) *
  //   dayDuration;
  // reducedRate * exchangeRate;

  // if (bookingDetail.packageOne === true)
  //   subTotal += 299 * reducedRate * exchangeRate;
  // if (bookingDetail.packageTwo === true)
  //   subTotal += 499 * reducedRate * exchangeRate;

  // const serviceCharge = subTotal / 10;
  // const taxesAndFees = (subTotal / 100) * 7;

  // const totalRooms =
  //   bookingDetail.standardRoomNumber +
  //   bookingDetail.deluxeRoomNumber +
  //   bookingDetail.familyRoomNumber +
  //   bookingDetail.suiteRoomNumber +
  //   bookingDetail.executiveRoomNumber;

  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="h-[50px] w-full bg-primary">
      {/* Drawer */}
      <Drawer
        // title={t("booking_summary")}
        // placement="bottom"
        // onClose={onClose}
        open={open}
        // width="100%"
        // height="100%"
      >
        <div className="border-b-2">
          <div className="flex mt-[10px] m-2">
            <CalendarOutlined
              style={{ fontSize: "30px", marginRight: "10px" }}
            />
            <div>
              <div className="text-h5 font-medium mobile:text-h3-mobile">
                Sun, 19 Nov 23 – Tue, 21 Nov 23
                {/* {formattedStartDateString} - {formattedEndDateString} */}
              </div>
              <div className="text-body text-slate-400 mobile:text-h4-mobile">
                2 nights
                {/* {dayDuration} {t("night")} */}
              </div>
            </div>
          </div>
          <div className="flex m-2">
            <UserOutlined style={{ fontSize: "30px", marginRight: "10px" }} />
            <div className="text-h5 font-medium mobile:text-h3-mobile">
              {/* {bookingDetail.adultNumber} {t("adults")}{" "} */}1 adults 0
              children
              {/* {bookingDetail.childrenNumber} {t("children")} */}
            </div>
          </div>
        </div>
        {/* <div className="border-b-2"> */}
        {/* edit room */}
        {page === "search-result" ? (
          <div className="border-b-2 flex flex-col gap-y-[2vh]">
            <div className="text-body text-slate-400 mobile:text-h3-mobile mt-2">
              {t("edit_room")}
            </div>

            {standardRoomNumber !== 0 ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-h5 font-bold mobile:text-h4-mobile">
                    {t("std_title")}
                  </div>
                  <RoomNumberInput
                    roomType="Standard"
                    value={standardRoomNumber}
                    onChange={(newValue: number) => {
                      // setBookingDetail({
                      //   ...bookingDetail,
                      //   standardRoomNumber: newValue,
                      // })
                    }}
                  />
                </div>
                <button
                  className="flex"
                  onClick={() => {
                    // const updatedBookingDetail = {
                    //   ...bookingDetail,
                    //   standardRoomNumber: 0,
                    // };
                    // setBookingDetail(updatedBookingDetail);
                  }}
                >
                  <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                  <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                    {t("remove")}
                  </div>
                </button>
                <div className="flex justify-between mt-[0.5vh]">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("std_title")} {standardRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      standardRoomNumber * 1200 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {deluxeRoomNumber !== 0 ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-h5 font-bold mobile:text-h4-mobile">
                    {t("dlx_title")}
                  </div>
                  <RoomNumberInput
                    roomType="Deluxe"
                    value={deluxeRoomNumber}
                    onChange={
                      (newValue: number) => {}
                      // setBookingDetail({
                      //   ...bookingDetail,
                      //   deluxeRoomNumber: newValue,
                      // })
                    }
                  />
                </div>
                <button
                  className="flex"
                  onClick={() => {
                    // const updatedBookingDetail = {
                    // ...bookingDetail,
                    // deluxeRoomNumber: 0,
                    // };
                    // setBookingDetail(updatedBookingDetail);
                  }}
                >
                  <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                  <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                    {t("remove")}
                  </div>
                </button>
                <div className="flex justify-between mt-[0.5vh]">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("dlx_title")} {deluxeRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      deluxeRoomNumber * 1800 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {familyRoomNumber !== 0 ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-h5 font-bold mobile:text-h4-mobile">
                    {t("fml_title")}
                  </div>
                  <RoomNumberInput
                    roomType="Family"
                    value={familyRoomNumber}
                    onChange={
                      (newValue: number) => {}
                      // setBookingDetail({
                      //   ...bookingDetail,
                      //   familyRoomNumber: newValue,
                      // })
                    }
                  />
                </div>
                <button
                  className="flex"
                  onClick={() => {
                    // const updatedBookingDetail = {
                    //   ...bookingDetail,
                    //   familyRoomNumber: 0,
                    // };
                    // setBookingDetail(updatedBookingDetail);
                  }}
                >
                  <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                  <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                    {t("remove")}
                  </div>
                </button>
                <div className="flex justify-between mt-[0.5vh]">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("fml_title")} {familyRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      familyRoomNumber * 2200 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {suiteRoomNumber !== 0 ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-h5 font-bold mobile:text-h4-mobile">
                    {t("s_title")}
                  </div>
                  <RoomNumberInput
                    roomType="Suite"
                    value={suiteRoomNumber}
                    onChange={(newValue: number) => {
                      // setBookingDetail({
                      //   ...bookingDetail,
                      //   suiteRoomNumber: newValue,
                      // })
                    }}
                  />
                </div>
                <button
                  className="flex"
                  onClick={() => {
                    // const updatedBookingDetail = {
                    //   ...bookingDetail,
                    //   suiteRoomNumber: 0,
                    // };
                    // setBookingDetail(updatedBookingDetail);
                  }}
                >
                  <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                  <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                    {t("remove")}
                  </div>
                </button>
                <div className="flex justify-between mt-[0.5vh]">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("s_title")} {suiteRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      suiteRoomNumber * 2500 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {executiveRoomNumber !== 0 ? (
              <div>
                <div className="flex justify-between">
                  <div className="text-h5 font-bold mobile:text-h4-mobile">
                    {t("ex_title")}
                  </div>
                  <RoomNumberInput
                    roomType="Executive"
                    value={executiveRoomNumber}
                    onChange={(newValue: number) => {
                      // setBookingDetail({
                      //   ...bookingDetail,
                      //   executiveRoomNumber: newValue,
                      // })
                    }}
                  />
                </div>
                <button
                  className="flex"
                  onClick={() => {
                    // const updatedBookingDetail = {
                    //   ...bookingDetail,
                    //   executiveRoomNumber: 0,
                    // };
                    // setBookingDetail(updatedBookingDetail);
                  }}
                >
                  <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                  <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                    {t("remove")}
                  </div>
                </button>
                <div className="flex justify-between mt-[0.5vh]">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("ex_title")} {executiveRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      executiveRoomNumber * 3000 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ) : page === "reservation-and-guest-detail" ? (
          <div>
            <div className="border-t-2">
              {standardRoomNumber !== 0 ? (
                <div className="flex justify-between ml-2 mt-1">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("std_title")} {standardRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      standardRoomNumber * 1200 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {deluxeRoomNumber !== 0 ? (
                <div className="flex justify-between ml-2 mt-1">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("dlx_title")} {deluxeRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      deluxeRoomNumber * 1800 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {familyRoomNumber !== 0 ? (
                <div className="flex justify-between ml-2 mt-1">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("fml_title")} {familyRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      familyRoomNumber * 2200 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {suiteRoomNumber !== 0 ? (
                <div className="flex justify-between ml-2 mt-1">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("s_title")} {suiteRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      suiteRoomNumber * 2500 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {executiveRoomNumber !== 0 ? (
                <div className="flex justify-between ml-2 mt-1">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("ex_title")} {executiveRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      executiveRoomNumber * 3000 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="border-b-2 border-t-2">
              <div className="m-1">
                <div className="text-body text-slate-400 mobile:text-h3-mobile">
                  {t("edit_service")}
                </div>
                {packageOne ? (
                  <div className="mt-1">
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="text-h5 mobile:text-h4-mobile">
                          {t("service_name1")}
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex"
                      onClick={() => {
                        // const updatedBookingDetail = {
                        //   ...bookingDetail,
                        //   packageOne: false,
                        // };
                        // setBookingDetail(updatedBookingDetail);
                      }}
                    >
                      <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                      <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                        {t("remove_service")}
                      </div>
                    </button>
                    <div className="flex justify-between">
                      <div className="text-body mobile:text-h4-mobile">
                        {t("service_name1")}
                      </div>
                      <div className="text-body text-gray-400 mobile:text-h4-mobile">
                        {currency}{" "}
                        {new Intl.NumberFormat("th-TH", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(299)}
                      </div>
                    </div>
                  </div>
                ) : null}
                {packageTwo ? (
                  <div className="mt-1">
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="text-h5 mobile:text-h4-mobile">
                          {t("service_name2")}
                        </div>
                      </div>
                    </div>
                    <button
                      className="flex"
                      onClick={() => {
                        // const updatedBookingDetail = {
                        //   ...bookingDetail,
                        //   packageTwo: false,
                        // };
                        // setBookingDetail(updatedBookingDetail);
                      }}
                    >
                      <i className="pi pi-trash text-gray-400 mobile:text-h5-mobile"></i>
                      <div className="text-description ml-1 text-gray-400 mobile:text-h5-mobile">
                        {t("remove_service")}
                      </div>
                    </button>
                    <div className="flex justify-between">
                      <div className="text-body mobile:text-h4-mobile">
                        {t("service_name2")}
                      </div>
                      <div className="text-body text-gray-400 mobile:text-h4-mobile">
                        {currency}{" "}
                        {new Intl.NumberFormat("th-TH", {
                          style: "decimal",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(499)}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* <div className="border-t-2"> */}
            <div className="my-1">
              {standardRoomNumber !== 0 ? (
                <div className="flex justify-between">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("std_title")} {standardRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      standardRoomNumber * 1200 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {deluxeRoomNumber !== 0 ? (
                <div className="flex justify-between">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("dlx_title")} {deluxeRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      deluxeRoomNumber * 1800 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {familyRoomNumber !== 0 ? (
                <div className="flex justify-between">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("fml_title")} {familyRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      familyRoomNumber * 2200 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {suiteRoomNumber !== 0 ? (
                <div className="flex justify-between">
                  <div className="text-body  mobile:text-h4-mobile">
                    {t("s_title")} {suiteRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      suiteRoomNumber * 2500 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
              {executiveRoomNumber !== 0 ? (
                <div className="flex justify-between">
                  <div className="text-body mobile:text-h4-mobile">
                    {t("ex_title")} {executiveRoomNumber} {t("room_per_night")}
                  </div>
                  <div className="text-body text-slate-400 mobile:text-h4-mobile">
                    {currency}{" "}
                    {new Intl.NumberFormat("th-TH", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(
                      executiveRoomNumber * 3000 * reducedRate * exchangeRate
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="border-y-2 my-1">
              {packageOne ? (
                <div>
                  <div className="flex justify-between">
                    <div className="text-body mobile:text-h4-mobile">
                      {t("service_name1")}
                    </div>
                    <div className="text-body text-slate-400 mobile:text-h4-mobile">
                      {currency}{" "}
                      {new Intl.NumberFormat("th-TH", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(299)}
                    </div>
                  </div>
                </div>
              ) : null}
              {packageTwo ? (
                <div>
                  <div className="flex justify-between">
                    <div className="text-body mobile:text-h4-mobile">
                      {t("service_name2")}
                    </div>
                    <div className="text-body text-slate-400 mobile:text-h4-mobile">
                      {currency}{" "}
                      {new Intl.NumberFormat("th-TH", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(499)}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* </div> */}
          </div>
        )}
        <div className="flex flex-col gap-y-[1vh] mt-[1vh]">
          <div className="flex justify-between">
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {t("monday_and_friday_sale")}
            </div>
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(0)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {t("saturday_additional_cost")}
            </div>
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(0)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {t("sub_total")}
            </div>
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(1200)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {t("service_charge")} (10%)
            </div>
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(120)}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {t("taxes_and_fees")} (7%)
            </div>
            <div className="text-body text-slate-400 mobile:text-h4-mobile">
              {currency}{" "}
              {new Intl.NumberFormat("th-TH", {
                style: "decimal",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(120)}
            </div>
          </div>
        </div>
        <div className="text-center text-h2 font-bold mt-1 mobile:text-h2-mobile mobile:mt-[10px]">
          {currency}{" "}
          {new Intl.NumberFormat("th-TH", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(1440)}{" "}
          {t("total")}
        </div>
        <div className="flex justify-center items-center">
          {page === "search-result" ? (
            // <Link href={"/reservation-and-guest-detail"}>
            <Button
              // className={` ${
              //   bookingDetail.standardRoomNumber +
              //     bookingDetail.deluxeRoomNumber * 2 +
              //     bookingDetail.familyRoomNumber * 4 +
              //     bookingDetail.suiteRoomNumber * 2 +
              //     bookingDetail.executiveRoomNumber * 4 <
              //   bookingDetail.adultNumber + bookingDetail.childrenNumber
              //     ? "opacity-50 cursor-not-allowed"
              //     : ""
              // }`}
              // style={{ background: "#2A4D69", color: "white" }}
              disabled={
                standardRoomNumber +
                  deluxeRoomNumber * 2 +
                  familyRoomNumber * 4 +
                  suiteRoomNumber * 2 +
                  executiveRoomNumber * 4 <
                adultNumber + childrenNumber
              }
            >
              <div>{t("confirm")}</div>
            </Button>
          ) : // </Link>
          page === "reservation-and-guest-detail" ? (
            // <Link href={"/summary-booking-detail"}>
            <Button
              // className={` ${
              //   isDisabledConfirm || !bookingDetail.isCheckedPDPA
              //     ? "opacity-50 cursor-not-allowed"
              //     : ""
              // }`}
              // style={{ background: "#2A4D69", color: "white" }}
              disabled={isDisabledConfirm || !isCheckedPDPA}
            >
              <div>{t("confirm")}</div>
            </Button>
          ) : // </Link>
          page === "summary-booking-detail" ? (
            // <Link href={"/booking-confirmation"}>
            <Button
            // style={{ background: "#2A4D69", color: "white" }}
            >
              <div>{t("check_out")}</div>
            </Button>
          ) : // {/* </Link> */}
          null}
        </div>
      </Drawer>
      <div className="flex justify-between">
        <div className="flex flex-col ml-[1vw]">
          <div className="text text-h2 font-bold mt-1 mobile:text-h2-mobile mobile:mt-[10px] text-white">
            {currency}{" "}
            {new Intl.NumberFormat("th-TH", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(1440)}{" "}
            {t("total")}
          </div>
          <div className="text-body mobile:text-h4-mobile text-white">
            1 {t("total_room")} {adultNumber + childrenNumber} {t("guest")}
            <button onClick={showDrawer}>
              <DownOutlined className="text-[10px]" />
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {page === "search-result" ? (
            // <Link href={"/reservation-and-guest-detail"}>
            <Button
              // className={` ${
              //   bookingDetail.standardRoomNumber +
              //     bookingDetail.deluxeRoomNumber * 2 +
              //     bookingDetail.familyRoomNumber * 4 +
              //     bookingDetail.suiteRoomNumber * 2 +
              //     bookingDetail.executiveRoomNumber * 4 <
              //   bookingDetail.adultNumber + bookingDetail.childrenNumber
              //     ? "opacity-50 cursor-not-allowed w-[20vw] mr-[3vw] mt-[2vh]"
              //     : "w-[20vw] mr-[3vw] mt-[2vh]"
              // }`}
              // style={{ background: "#4B86B4", color: "white" }}
              disabled={
                standardRoomNumber +
                  deluxeRoomNumber * 2 +
                  familyRoomNumber * 4 +
                  suiteRoomNumber * 2 +
                  executiveRoomNumber * 4 <
                adultNumber + childrenNumber
              }
            >
              <div>{t("confirm")}</div>
            </Button>
          ) : // </Link>
          page === "reservation-and-guest-detail" ? (
            // <Link href={"/summary-booking-detail"}>
            <Button
              // className={` ${
              //   isDisabledConfirm || !bookingDetail.isCheckedPDPA
              //     ? "opacity-50 cursor-not-allowed w-[20vw] mr-[3vw] mt-[2vh]"
              //     : "w-[20vw] mr-[3vw] mt-[2vh]"
              // }`}
              // style={{ background: "#4B86B4", color: "white" }}
              disabled={isDisabledConfirm || !isCheckedPDPA}
            >
              <div>{t("confirm")}</div>
            </Button>
          ) : // </Link>
          null}
        </div>
      </div>
    </div>
  );
}
