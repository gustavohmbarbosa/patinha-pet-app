import {
  MD3LightTheme as DefaultTheme,
  MD3Theme,
  PaperProvider,
} from "react-native-paper";
import StackRouterComponent from "./src/routers/stack";

const theme: MD3Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#E3EBEE",
    primary: "#006184",
    secondary: "#D66853",
  },
};

export default function App() {
  return (
    // usando o React Native Paper - material ui
    <PaperProvider>
      {/* // component de rotas */}
      <StackRouterComponent />
    </PaperProvider>
  );
}
