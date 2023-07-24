import { View } from "react-native";
import { Switch as SwitchPaper, SwitchProps } from "react-native-paper";

import { styles } from "./styles";

export function Switch({ value, onValueChange, ...props }: SwitchProps) {
  // semelhante ao que deve fazer quando for usar o toogle
  // const onValueChange = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.container}>
      <SwitchPaper {...props} value={value} onValueChange={onValueChange} />
    </View>
  );
}
