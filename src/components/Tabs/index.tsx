import React, { ReactNode } from "react";
import {
  Tabs as TabPaper,
  TabScreen as TabScreenPaper,
} from "react-native-paper-tabs";
import { APPTHEME } from "../../styles/theme";

type TabRootProps = {
  children: ReactNode;
  backgroundColor?: string;
};

const TabRoot = ({
  children,
  backgroundColor = APPTHEME.colors.neutrals.white,
}: TabRootProps) => {
  return (
    <TabPaper
      // defaultIndex={0} // default = 0
      uppercase={false} // true/false | default=true | labels are uppercase
      // showTextLabel={false } // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
      // iconPosition // leading, top | default=leading
      style={{
        backgroundColor: backgroundColor,
      }} // works the same as AppBar in react-native-paper
      // dark={false} // works the same as AppBar in react-native-paper
      // theme={{}} // works the same as AppBar in react-native-paper
      // mode="scrollable" // fixed, scrollable | default=fixed
      // onChangeIndex={(newIndex) => {}} // react on index change
      // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
      // disableSwipe={true} // (default=false) disable swipe to left/right gestures
    >
      {children}
    </TabPaper>
  );
};

type TabScreenProps = {
  label: string;
  children: ReactNode;
};

const TabScreen = ({ label, children }: TabScreenProps) => {
  return (
    <TabScreenPaper label={label} icon="">
      {children}
    </TabScreenPaper>
  );
};

export const Tabs = {
  root: TabRoot,
  screen: TabScreen,
};
