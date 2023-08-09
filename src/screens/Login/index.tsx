import { Text, TouchableOpacity, View } from "react-native";

import LogoImg from "../../assets/logo.svg";
import GoogleImg from "../../assets/google.svg";
import { styles } from "./styles";
import { ButtonOutline } from "../../components/ButtonOutline";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";

export default function Login() {
  const navigation = useNavigation<StackRouterProps>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LogoImg
          style={styles.logo}
          width={"150%"}
          height={400}
          rotation={-15}
        />
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Login</Text>
          <Text style={styles.headerSubtitle}>
            Realize seu login ou registre-se
          </Text>
        </View>
      </View>
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
