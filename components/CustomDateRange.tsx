import { RangeCalendar, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { addDays, format } from "date-fns";
import useStore from "@/hooks/useStore";

export default function CustomDateRange() {
  const { bookingDetail, setBookingDetail } = useStore();
  const [range, setRange] = useState<any>({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
  });
  const disabledDates = [
    new Date("2024-02-10"),
    new Date("2024-02-18"),
    new Date("2024-02-22"),
  ];
  const [myDisabledDates, setMyDisabledDates] = useState<any[]>(disabledDates);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(addDays(new Date(), 999999));

  useEffect(() => {
    setBookingDetail({
      ...bookingDetail,
      startDate: new Date() as any,
      endDate: addDays(new Date(), 1) as any,
    });
  }, []);

  const DayCell = (
    { date }: { date: Date },
    style: any
  ): React.ReactElement => {
    const disabledDatesFormat = myDisabledDates.map((d) => {
      return format(d, "dd/MM/yyyy");
    });

    if (date.getDay() == 1 || date.getDay() == 5) {
      return (
        <View style={[styles.dayContainer, style.container]}>
          <Text style={style.text}>{date.getDate()}</Text>
          {(date >= new Date() || date == new Date()) &&
          !disabledDatesFormat.includes(format(date, "dd/MM/yyyy")) ? (
            <Text style={[style.text, styles.value]}>THB1,000</Text>
          ) : (
            <Text style={[style.text, styles.value]}></Text>
          )}
        </View>
      );
    }

    if (date.getDay() == 6) {
      return (
        <View style={[styles.dayContainer, style.container]}>
          <Text style={style.text}>{date.getDate()}</Text>
          {(date >= new Date() || date == new Date()) &&
          !disabledDatesFormat.includes(format(date, "dd/MM/yyyy")) ? (
            <Text style={[style.text, styles.value]}>THB1,400</Text>
          ) : (
            <Text style={[style.text, styles.value]}></Text>
          )}
        </View>
      );
    }

    return (
      <View style={[styles.dayContainer, style.container]}>
        <Text style={style.text}>{date.getDate()}</Text>
        {(date >= new Date() || date == new Date()) &&
        !disabledDatesFormat.includes(format(date, "dd/MM/yyyy")) ? (
          <Text style={[style.text, styles.value]}>THB1,200</Text>
        ) : (
          <Text style={[style.text, styles.value]}></Text>
        )}
      </View>
    );
  };

  const filter = (date: Date): boolean => {
    const disabledDatesFormat = myDisabledDates.map((d) => {
      return format(d, "dd/MM/yyyy");
    });
    return !disabledDatesFormat.includes(format(date, "dd/MM/yyyy"));
  };

  const onSelect = (nextRange: any) => {
    for (var i = 0; i < disabledDates.length; i++) {
      if (nextRange.startDate < disabledDates[i]) {
        setMyDisabledDates([...disabledDates.slice(0, i)]);
        if (i > 0) setMinDate(new Date(disabledDates[i - 1]));
        setMaxDate(new Date(disabledDates[i]));
        break;
      }
      if (i == disabledDates.length - 1) {
        setMinDate(new Date(disabledDates[i]));
      }
    }

    if (nextRange.startDate < nextRange.endDate) {
      setMinDate(new Date());
      setMaxDate(addDays(new Date(), 999999));
      setMyDisabledDates(disabledDates);
    }

    if (nextRange.startDate?.toString() !== nextRange.endDate?.toString()) {
      setRange(nextRange);

      let startDate = new Date(nextRange.startDate);
      let endDate = new Date(nextRange.endDate);

      const formattedStartDate = startDate.toLocaleDateString("en-GB");
      const formattedEndDate = endDate.toLocaleDateString("en-GB");

      setBookingDetail({
        ...bookingDetail,
        startDate: nextRange.startDate,
        endDate: nextRange.endDate,
      });
    } else if (
      nextRange.startDate?.toString() == nextRange.endDate?.toString()
    ) {
      if (nextRange.endDate) {
        setRange({
          startDate: nextRange.startDate,
          endDate: addDays(nextRange.endDate, 1),
        });
        setBookingDetail({
          ...bookingDetail,
          startDate: nextRange.startDate,
          endDate: addDays(nextRange.endDate, 1),
        });

        setMinDate(new Date());
        setMaxDate(addDays(new Date(), 999999));
        setMyDisabledDates(disabledDates);
      }
    }
  };

  return (
    <>
      <RangeCalendar
        range={range}
        onSelect={onSelect}
        renderDay={DayCell}
        min={minDate}
        max={maxDate}
        filter={filter}
      />
      {/* <View>
        <Text>
          {`Start Date : ${
            bookingDetail.startDate
              ? format(bookingDetail.startDate.toString(), "dd/MM/yyyy")
              : "-"
          }`}
        </Text>
        <Text>
          {`End Date   : ${
            bookingDetail.endDate
              ? format(bookingDetail.endDate.toString(), "dd/MM/yyyy")
              : " -"
          }`}
        </Text>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 360,
  },
  dayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
  },
  value: {
    fontSize: 8,
    fontWeight: "200",
  },
});
