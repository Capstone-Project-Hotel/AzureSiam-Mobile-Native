import { RangeCalendar, Text } from "@ui-kitten/components";
import { useState } from "react";
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

  const filter = (date: Date): boolean => date != new Date();

  return (
    <>
      <RangeCalendar
        range={range}
        onSelect={(nextRange) => {
          if (
            nextRange.startDate?.toString() !== nextRange.endDate?.toString()
          ) {
            console.log("q");

            setRange(nextRange);
          } else if (
            nextRange.startDate?.toString() == nextRange.endDate?.toString()
          ) {
            console.log("w");

            if (nextRange.endDate) {
              setRange({
                startDate: nextRange.startDate,
                endDate: addDays(nextRange.endDate, 1),
              });
            }
          }
        }}
        renderDay={DayCell}
        min={new Date()}
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
