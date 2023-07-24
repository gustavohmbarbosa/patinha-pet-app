import React, { useState } from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";

// tipagem temporária, haverá necessidade de muldaça de acordo com o tipo de raça e pet
type SelectProps = {
  placeholder: string;
  opcoes: string[];
};

export function Select({ opcoes, placeholder }: SelectProps) {
  const [selectedValue, setselectedValue] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setselectedValue(itemValue)}
          style={selectedValue ? styles.select : {}}
          // itemStyle={styles.item} // não consegui alterar o style, não apresenta mudança
          dropdownIconColor={APPTHEME.colors.primary}
          placeholder={placeholder}
          prompt={placeholder}
        >
          <Picker.Item
            key={0} // padrão
            // style={styles.item} // não consegui alterar o style, não apresenta mudança
            fontFamily={APPTHEME.font.body}
            label={placeholder}
            color={APPTHEME.colors.text.black25}
            enabled={false}
            value={undefined}
          />
          {opcoes.map((item, index) => {
            return (
              <Picker.Item
                key={index + 1} // 0 será o default(placeholder)
                // style={styles.item}// não consegui alterar o style, não apresenta mudança
                fontFamily={APPTHEME.font.body}
                label={item}
                value={item}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}
