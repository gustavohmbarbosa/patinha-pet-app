import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "./styles";
import { APPTHEME } from "../../styles/theme";
import { PetProps } from "../../lib/props/PetProps";
import { VaccineProps } from "../../lib/props/VaccineProps";
import { TrackerProps } from "../../lib/props/TrackerProps";

// tipagem temporária, haverá necessidade de muldaça de acordo com o tipo de raça e pet
type SelectProps = {
  placeholder: string;
  opcoes: string[] | PetProps[] | VaccineProps[] | TrackerProps[];
  value: string | PetProps | VaccineProps | TrackerProps;
  // de acordo com o onChange do useForm
  onChange: (...event: any[]) => void;
  error?: boolean;
  disabled?: boolean;
};

export function Select({
  opcoes,
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
}: SelectProps) {
  return (
    <View style={styles.container}>
      <View
        // aceita vários styles, nesse caso um fixo e um condicional
        style={[
          styles.content,
          error
            ? styles.borderError
            : disabled
            ? styles.borderDisabled
            : styles.border,
        ]}
      >
        <Picker
          enabled={!disabled}
          selectedValue={value}
          onValueChange={onChange}
          style={value ? (disabled ? styles.disabled : styles.select) : {}}
          dropdownIconColor={
            error
              ? APPTHEME.colors.alert
              : disabled
              ? APPTHEME.colors.neutrals.gray
              : APPTHEME.colors.text.dark
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
                label={
                  typeof item === "object"
                    ? "name" in item
                      ? item.name
                      : `${item.model} - ${item.code}`
                    : item
                }
                value={item}
              />
            );
          })}
        </Picker>
      </View>
    </View>
  );
}
