import React from "react";
import { View } from "react-native";
import {
  Button as ButtonPaper,
  ButtonProps as ButtonPaperProps,
} from "react-native-paper";

import GoogleImg from "../../assets/google.svg";
import { styles } from "./styles";

type ButtonProps = ButtonPaperProps & {};

export function ButtonOutline({ children, ...props }: ButtonProps) {
  return (
    <View style={styles.container}>
      <ButtonPaper
        mode="outlined"
        // pra usar icon basta passar a seguionte propriedade no lugar que irá ser usado:
        // icon={()=><NomeDoSvgImg/>} -> importante ter o import do svg na pag "import GoogleImg from "../../assets/google.svg";"
        // ou simpresmente passar o nome do icone caso ele esteja presente na biblioteca do vector icons do React native paper
        // https://callstack.github.io/react-native-paper/docs/guides/icons#using-the-icon-prop
        style={styles.button}
        contentStyle={styles.content}
        labelStyle={styles.label}
        {...props}
      >
        {children}
      </ButtonPaper>
    </View>
  );
}
