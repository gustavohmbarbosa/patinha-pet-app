import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { APPTHEME } from "../styles/theme";
import { ButtonIcon } from "../components/ButtonIcon";

import { useAuth } from "../hooks/useAuth";

import Home from "../screens/Home";
import Login from "../screens/Login";
import UserInfo from "../screens/UserInfo";
import Config from "../screens/Config";
import PetProfile from "../screens/PetProfile";
import AdressInfo from "../screens/AdressInfo";
import ExempleTabs from "../screens/ExempleTabs";
import SignUp from "../screens/SignUp";
import NewPet from "../screens/NewPet";
import NewVaccineDose from "../screens/NewVaccineDose";
import PetVaccines from "../screens/PetVaccines";
import VaccineDoses from "../screens/VaccineDoses";
import VaccineDose from "../screens/VaccineDose";
import UpdatePet from "../screens/UpdatePet";

import AccountBoxImg from "../assets/account-box.svg";
import PencilImg from "../assets/pencil.svg";
import CloseImg from "../assets/close.svg";
import { PetProps } from "../lib/props/PetProps";
import { VaccineDoseProps } from "../lib/props/VaccineDoseProps";

const theme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: APPTHEME.colors.background,
    primary: APPTHEME.colors.primary,
    text: APPTHEME.colors.primary,
  },
};
export type StackNavigationProps = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  NewPet: undefined;
  UpdatePet: { pet: PetProps };
  PetProfile: { pet: PetProps };
  NewVaccineDose: undefined;
  VaccineDose: {
    petId: Number;
    vaccine: { name: string; id: Number };
    vaccineDose: VaccineDoseProps;
  };
  PetVaccines: { name: string; id: Number };
  VaccineDoses: { name: string; petId: Number; vaccineId: Number };
  Config: undefined;
  UserInfo: undefined;
  AdressInfo: undefined;
  ExempleTabs: undefined;
};

export type StackRouterProps = NativeStackNavigationProp<StackNavigationProps>;

const Stack = createNativeStackNavigator<StackNavigationProps>();

export default function StackRouterComponent() {
  const styleTitleLabelLg = {
    fontFamily: APPTHEME.font.label.lg,
    fontSize: APPTHEME.fontsize.label.lg,
  };
  const styleTitleBodyLg = {
    fontFamily: APPTHEME.font.body,
    fontSize: APPTHEME.fontsize.body.lg,
  };

  const { user } = useAuth();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          statusBarTranslucent: true,
          headerShadowVisible: false,
          statusBarStyle: "dark",
          animation: "fade_from_bottom",
        }}
      >
        {user.token ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: "Seus pets",
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
                headerTitleStyle: styleTitleLabelLg,
                headerTintColor: theme.colors.background,
                statusBarStyle: "light",
                headerLeft: () => (
                  <ButtonIcon icon={<CloseImg width={24} height={24} />} />
                ),
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="UserInfo"
              component={UserInfo}
              options={{
                title: "Meus dados",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: { backgroundColor: APPTHEME.colors.background },
              }}
            />
            <Stack.Screen
              name="AdressInfo"
              component={AdressInfo}
              options={{
                title: "Meu endereço",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: { backgroundColor: APPTHEME.colors.background },
              }}
            />
            <Stack.Screen
              name="NewPet"
              component={NewPet}
              options={{
                title: "Adicionar novo pet",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: { backgroundColor: APPTHEME.colors.background },
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="UpdatePet"
              component={UpdatePet}
              options={({ route }) => ({
                title: route.params.pet.name,
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: { backgroundColor: APPTHEME.colors.background },
                animation: "slide_from_right",
              })}
            />
            <Stack.Screen
              name="NewVaccineDose"
              component={NewVaccineDose}
              options={{
                title: "Nova Dose de Vacina",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: { backgroundColor: APPTHEME.colors.background },
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="VaccineDose"
              component={VaccineDose}
              options={({ route }) => ({
                title: route.params.vaccine.name,
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: { backgroundColor: APPTHEME.colors.background },
                animation: "slide_from_right",
                contentStyle: { overflow: "hidden" },
              })}
            />
            <Stack.Screen
              name="PetProfile"
              component={PetProfile}
              options={({ route }) => ({
                title: "Informações do Pet",
                statusBarStyle: "light",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: {
                  backgroundColor: APPTHEME.colors.primary,
                },
                headerTintColor: APPTHEME.colors.text.background,
                headerRight: () => (
                  <ButtonIcon
                    route="UpdatePet"
                    paramsRoute={route.params.pet}
                    icon={<PencilImg width={24} height={24} />}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="PetVaccines"
              component={PetVaccines}
              options={({ route }) => ({
                title: `Vacinas - ${route.params.name}`,
                statusBarStyle: "light",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: {
                  backgroundColor: APPTHEME.colors.primary,
                },
                headerTintColor: APPTHEME.colors.text.background,
                animation: "slide_from_bottom",
              })}
            />
            <Stack.Screen
              name="VaccineDoses"
              component={VaccineDoses}
              options={({ route }) => ({
                title: `${route.params.name}`,
                statusBarStyle: "light",
                headerTitleStyle: styleTitleBodyLg,
                headerStyle: {
                  backgroundColor: APPTHEME.colors.primary,
                },
                headerTintColor: APPTHEME.colors.text.background,
                animation: "fade_from_bottom",
              })}
            />
            <Stack.Screen name="ExempleTabs" component={ExempleTabs} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ statusBarStyle: "light", headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                statusBarStyle: "light",
                headerShown: false,
                animation: "slide_from_right",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
