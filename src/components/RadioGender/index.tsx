import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Defs, G, Path, Rect, Svg, ClipPath } from "react-native-svg";

import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

export type RadioTypeGenderProps = "female" | "male";

type RadioGenderProps = {
  gender: RadioTypeGenderProps;
  setGender: (gender: RadioTypeGenderProps) => void;
};

export function RadioGender({ gender, setGender }: RadioGenderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={gender == "male" ? styles.itemSelected : styles.item}
        onPress={() => {
          setGender("male");
        }}
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <G clipPath="url(#clip0_2_8767)">
            <Path
              d="M15.05 8.537L18.585 5H14V3H22V11H20V6.414L16.463 9.951C17.6169 11.4635 18.1528 13.358 17.9624 15.2508C17.7719 17.1437 16.8693 18.8934 15.4372 20.1457C14.0051 21.398 12.1507 22.0594 10.2494 21.9958C8.34805 21.9322 6.54193 21.1485 5.19673 19.8033C3.85154 18.4581 3.06781 16.652 3.00422 14.7506C2.94064 12.8493 3.60197 10.9949 4.85429 9.5628C6.10661 8.13075 7.85634 7.2281 9.74917 7.03764C11.642 6.84719 13.5365 7.38315 15.049 8.537H15.05ZM10.5 20C11.9587 20 13.3576 19.4205 14.3891 18.3891C15.4205 17.3576 16 15.9587 16 14.5C16 13.0413 15.4205 11.6424 14.3891 10.6109C13.3576 9.57946 11.9587 9 10.5 9C9.04131 9 7.64236 9.57946 6.61091 10.6109C5.57946 11.6424 5 13.0413 5 14.5C5 15.9587 5.57946 17.3576 6.61091 18.3891C7.64236 19.4205 9.04131 20 10.5 20Z"
              fill={
                gender == "male"
                  ? APPTHEME.colors.neutrals.white
                  : APPTHEME.colors.primary
              }
            />
          </G>
          <Defs>
            <ClipPath id="clip0_2_8767">
              <Rect width="24" height="24" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.6}
        style={gender != "male" ? styles.itemSelected : styles.item}
        onPress={() => {
          setGender("female");
        }}
      >
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <G clipPath="url(#clip0_2_8786)">
            <Path
              d="M11 15.934C9.11593 15.6786 7.39915 14.7172 6.19685 13.2443C4.99454 11.7714 4.39643 9.8969 4.52346 7.99985C4.65048 6.10279 5.49318 4.32475 6.88112 3.0253C8.26907 1.72585 10.0987 1.00195 12 1C13.9036 0.998168 15.7367 1.72028 17.1277 3.01993C18.5186 4.31959 19.3633 6.09953 19.4905 7.99891C19.6177 9.89829 19.0178 11.775 17.8126 13.2485C16.6073 14.722 14.8869 15.682 13 15.934V18H18V20H13V24H11V20H6V18H11V15.934ZM12 14C13.4587 14 14.8576 13.4205 15.8891 12.3891C16.9205 11.3576 17.5 9.95869 17.5 8.5C17.5 7.04131 16.9205 5.64237 15.8891 4.61092C14.8576 3.57947 13.4587 3 12 3C10.5413 3 9.14236 3.57947 8.11091 4.61092C7.07946 5.64237 6.5 7.04131 6.5 8.5C6.5 9.95869 7.07946 11.3576 8.11091 12.3891C9.14236 13.4205 10.5413 14 12 14Z"
              fill={
                gender != "male"
                  ? APPTHEME.colors.neutrals.white
                  : APPTHEME.colors.primary
              }
            />
          </G>
          <Defs>
            <ClipPath id="clip0_2_8786">
              <Rect width="24" height="24" fill="white" />
            </ClipPath>
          </Defs>
        </Svg>
      </TouchableOpacity>
    </View>
  );
}
