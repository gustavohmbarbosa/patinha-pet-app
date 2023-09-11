import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// HOC
export const withKeyboardAwareScrollView =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  ({ ...props }) =>
    (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Component {...(props as P)} />
      </KeyboardAwareScrollView>
    );
