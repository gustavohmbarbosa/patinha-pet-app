import React, { useState } from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button as ButtonPaper } from "react-native-paper";
import { styles } from "./styles";
import CalendarImg from "../../assets/calendar-range.svg";

type DatePickerProps = {
  onChange: (date: Date) => void;
};

export function DatePicker({ onChange }: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("");
  const [show, setShow] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <ButtonPaper
          mode="outlined"
          style={styles.button}
          contentStyle={styles.content}
          labelStyle={dateText == "" ? styles.placeholder : styles.label}
          onPress={() => {
            setShow(true);
          }}
          icon={() => <CalendarImg />}
        >
          <Text>{dateText == "" ? "Quando nasceu?" : dateText}</Text>
        </ButtonPaper>
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour
          onChange={(event, selectedDate) => {
            // verifica se tem dava selecionada, se não tiver considera a inicial de "date"
            const currentDate = selectedDate || date;
            setShow(false);
            setDate(currentDate);
            onChange(currentDate);

            const fDate = new Date(currentDate);
            const fText = `${
              fDate.getDate() < 10 ? `0${fDate.getDate()}` : fDate.getDate()
            }/${
              fDate.getMonth() < 10 ? `0${fDate.getMonth()}` : fDate.getMonth()
            }/${fDate.getFullYear()}`;
            setDateText(fText);
          }}
        />
      )}
    </>
  );
}
