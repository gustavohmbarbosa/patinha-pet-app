import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";
import InfoPet from "../screens/InfoPet";
import { APPTHEME } from "../styles/theme";
import { ExempleTabs } from "../screens/ExempleTabs";

import AccountBoxImg from "../assets/account-box.svg";
import CloseImg from "../assets/close.svg";
import { ButtonIcon } from "../components/ButtonIcon";
import { Config } from "../screens/Config";

// Personalizando o thema padrão do React Navigate
const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: APPTHEME.colors.background,
    primary: APPTHEME.colors.primary,
    text: APPTHEME.colors.primary,
  },
};

// Tipagem por usar o typescript
type StackNavigationProps = {
  // caso seja necessário algum dado para a página, pode ser exclarecido aqui, se não passa undefined
  // Ex: Home: {userId: string, username: string,...}
  Home: undefined;
  Login: undefined;
  InfoPet: undefined;
  Config: undefined;
  ExempleTabs: undefined;
};

// esse type será usado todas as vezes que for usar as rotas
export type StackRouterProps = NativeStackNavigationProp<StackNavigationProps>;

// navegação em modo "pilha"
const Stack = createNativeStackNavigator();

export default function StackRouterComponent() {
  // possível passar a cor/font/title/... do header a depender da tela
  /* 
  options={{
    title: "my home",
    headerStyle: { backgroundColor: "#0f0" },
    headerTintColor: "#fff", //cor do texto
    headerTitleAlign: "center",
  }}
  */

  // usar em headerStyle quando for o header com background azul
  const styleTitleBackgroundBlue = {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
  };

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          statusBarTranslucent: true,
          statusBarStyle: "dark",
          // animation: "fade"
        }}
      >
        <Stack.Screen
          name="Seus pets"
          component={Home}
          options={{
            headerRight: () => (
              <ButtonIcon
                route="Config"
                icon={<AccountBoxImg width={32} height={32} />}
              />
            ),
          }}
        />

        <Stack.Screen
          name="Config"
          component={Config}
          options={{
            title: "Informações do usuário",
            headerStyle: { backgroundColor: theme.colors.primary },
            headerShadowVisible: false,
            headerTitleStyle: styleTitleBackgroundBlue,
            headerTintColor: theme.colors.background,
            statusBarStyle: "light",
            headerLeft: () => (
              <ButtonIcon icon={<CloseImg width={24} height={24} />} />
            ),
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen name="InfoPet" component={InfoPet} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ExempleTabs" component={ExempleTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
