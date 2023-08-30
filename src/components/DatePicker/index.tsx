import React, { useState } from "react";
import { View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button as ButtonPaper } from "react-native-paper";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { Path, Svg } from "react-native-svg";

type DatePickerProps = {
  placeholder: string;
  onChange: (date: Date) => void;
  error?: boolean;
};

export function DatePicker({
  onChange,
  error = false,
  placeholder,
}: DatePickerProps) {
  const [date, setDate] = useState(new Date());
  const [dateText, setDateText] = useState("");
  const [show, setShow] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <ButtonPaper
          mode="outlined"
          style={{
            borderRadius: 8,
            borderColor: error
              ? APPTHEME.colors.alert
              : APPTHEME.colors.primary,
          }}
          contentStyle={styles.content}
          labelStyle={dateText == "" ? styles.placeholder : styles.label}
          onPress={() => {
            setShow(true);
          }}
          icon={() => (
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M9 10H7V12H9V10ZM13 10H11V12H13V10ZM17 10H15V12H17V10ZM19 3H18V1H16V3H8V1H6V3H5C3.89 3 3 3.9 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM19 19H5V8H19V19Z"
                fill={error ? APPTHEME.colors.alert : APPTHEME.colors.primary}
              />
            </Svg>
          )}
        >
          <Text style={dateText == "" ? styles.placeholder : styles.label}>
            {dateText == "" ? placeholder : dateText}
          </Text>
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
