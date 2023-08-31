import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { PetProps } from "../../lib/props/PetProps";
import { VaccineProps } from "../../lib/props/VaccineProps";

// tipagem temporária, haverá necessidade de muldaça de acordo com o tipo de raça e pet
type SelectProps = {
  placeholder: string;
  opcoes: string[] | PetProps[] | VaccineProps[];
  value: string | PetProps | VaccineProps;
  // de acordo com o onChange do useForm
  onChange: (...event: any[]) => void;
  error?: boolean;
};

export function Select({
  opcoes,
  placeholder,
  value,
  onChange,
  error = false,
}: SelectProps) {
  return (
    <View style={styles.container}>
      <View
        // aceita vários styles, nesse caso um fixo e um condicional
        style={[styles.content, error ? styles.borderError : styles.border]}
      >
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={value ? styles.select : {}}
          // não consegui alterar o style, não apresenta mudança
          // mas sendo o natoivo nn tem problema, pode deixar assim
          // itemStyle={styles.item}
          dropdownIconColor={
            error ? APPTHEME.colors.alert : APPTHEME.colors.text.dark
          }
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
                label={typeof item === "object" ? item.name : item}
                value={item}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}
