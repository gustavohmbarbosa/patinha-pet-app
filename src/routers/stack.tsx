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
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="InfoPet" component={InfoPet} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ExempleTabs" component={ExempleTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
