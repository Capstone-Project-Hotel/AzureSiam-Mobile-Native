import { RangeCalendar, Text } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { addDays, format } from "date-fns";

export default function CustomDateRange() {
  const [range, setRange] = useState<any>({});

  const DayCell = (
    { date }: { date: Date },
    style: any
  ): React.ReactElement => {
    return (
      <View style={[styles.dayContainer, style.container]}>
        <Text style={style.text}>{date.getDate()}</Text>
        {date >= new Date() || date == new Date() ? (
          <Text style={[style.text, styles.value]}>THB1,200</Text>
        ) : null}
      </View>
    );
  };

  const disabledDates = [new Date("2024-02-10"), new Date("2024-02-18")];
  const [myDisabledDates, setMyDisabledDates] = useState<any[]>(disabledDates);
  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(addDays(new Date(), 999999));

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
    }

    if (nextRange.startDate < nextRange.endDate) {
      setMinDate(new Date());
      setMaxDate(addDays(new Date(), 999999));
      setMyDisabledDates(disabledDates);
    }

    if (nextRange.startDate > nextRange.endDate) {
      setRange({
        startDate: nextRange.startDate,
        endDate: addDays(nextRange.endDate, 1),
      });
    }

    if (nextRange.startDate?.toString() !== nextRange.endDate?.toString()) {
      setRange(nextRange);
    } else if (
      nextRange.startDate?.toString() == nextRange.endDate?.toString()
    ) {
      if (nextRange.endDate) {
        setRange({
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
      <View>
        <Text>
          {`Start Date : ${
            range.startDate
              ? format(range.startDate.toString(), "dd/MM/yyyy")
              : "-"
          }`}
        </Text>
        <Text>
          {`End Date   : ${
            range.endDate
              ? format(range.endDate.toString(), "dd/MM/yyyy")
              : " -"
          }`}
        </Text>
      </View>
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
