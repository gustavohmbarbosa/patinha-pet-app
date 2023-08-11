import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// HOC
export const withKeyboardAwareScrollView =
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  ({ ...props }) =>
    (
      <KeyboardAwareScrollView
        automaticallyAdjustKeyboardInsets
        automaticallyAdjustContentInsets
        style={{ flex: 1 }}
        contentContainerStyle={{ minHeight: "100%" }}
      >
        <Component {...(props as P)} />
      </KeyboardAwareScrollView>
    );
