import {
  MD3LightTheme as DefaultTheme,
  MD3Theme,
  PaperProvider,
} from "react-native-paper";
import StackRouterComponent from "./src/routers/stack";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { Loading } from "./src/components/Loading";
import { APPTHEME } from "./src/styles/theme";
import { AuthContextProvider } from "./src/context/AuthContext";
import { PetContextProvider } from "./src/context/PetContext";
import { TrackerContextProvider } from "./src/context/TrackerContext";

// definição de tema do react native paper
const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: APPTHEME.colors.background,
    primary: APPTHEME.colors.primary,
    secondary: APPTHEME.colors.secondary,
  },
};

export default function App() {
  // fazer o carregamento das fonts pro app
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
  });
  return (
    // usando o React Native Paper - material ui
    <PaperProvider theme={theme}>
      {fontsLoaded ? (
        /* component de rotas */
        <AuthContextProvider>
          <PetContextProvider>
            <TrackerContextProvider>
              <StackRouterComponent />
            </TrackerContextProvider>
          </PetContextProvider>
        </AuthContextProvider>
      ) : (
        <Loading />
      )}
    </PaperProvider>
  );
}
