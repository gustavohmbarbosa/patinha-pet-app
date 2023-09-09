import React from "react";
import { View } from "react-native";

import { styles } from "./styles";
import { withKeyboardAwareScrollView } from "../../components/withKeyboardAwareScrollView";

function AddTracker() {
  return <View style={styles.container}></View>;
}

export default withKeyboardAwareScrollView(AddTracker);
