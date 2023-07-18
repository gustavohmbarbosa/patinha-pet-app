import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Login from "../screens/Login";

// Tipagem por usar o typescript
type StackNavigationProps = {
  // caso seja necessário algum dado para a página, pode ser exclarecido aqui, se não passa undefined
  // Ex: Home: {userId: string, username: string,...}
  Home: undefined;
  Login: undefined;
};

// esse type será usado todas as vezes que for usar as rotas
export type StackRouterProps = NativeStackNavigationProp<StackNavigationProps>;

// navegação em modo "pilha"
const Stack = createNativeStackNavigator();

export default function StackRouterComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
