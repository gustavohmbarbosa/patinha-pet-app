import { Text, TouchableOpacity, View } from "react-native";

import GoogleImg from "../../assets/google.svg";
import { styles } from "./styles";
import { ButtonOutline } from "../../components/ButtonOutline";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";
import { CadastralHeader } from "../../components/CadastralHeader";

export default function Login() {
  const navigation = useNavigation<StackRouterProps>();

  return (
    <View style={styles.container}>
      <CadastralHeader />
      <View style={styles.content}>
        <View style={styles.options}>
          <View style={styles.divider}>
            <View style={styles.barra} />
            <Text style={styles.dividerText}>realize login com</Text>
            <View style={styles.barra} />
          </View>
          <ButtonOutline
            icon={() => <GoogleImg />}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            Google
          </ButtonOutline>
        </View>

        <View style={styles.foot}>
          <Text style={styles.footTitle}>Primeiro acesso?</Text>
          <TouchableOpacity style={styles.footButton} activeOpacity={0.6}>
            <Text style={styles.secondary}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
