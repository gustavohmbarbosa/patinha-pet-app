import { PaperProvider } from "react-native-paper";
import StackRouterComponent from "./src/routers/stack";

export default function App() {
  return (
    // usando o React Native Paper - material ui
    <PaperProvider>
      {/* // component de rotas */}
      <StackRouterComponent />
    </PaperProvider>
  );
}
