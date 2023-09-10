import React from "react";
import { FlatList, View, Alert } from "react-native";
import { styles } from "./styles";
import { FabIconBottom } from "../../components/FabIconBottom";
import { CardTracker } from "../../components/CardTracker";
import { CardAlert } from "../../components/CardAlert";
import { useTracker } from "../../hooks/useTrackers";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "../../routers/stack";
import { useAuth } from "../../hooks/useAuth";
import { Loading } from "../../components/Loading";

export default function Trackers() {
  const { user } = useAuth();
  const { trackers, isTrackerLoading } = useTracker();
  const navigation = useNavigation<StackRouterProps>();

  const decideRoute = () => {
    if (user.user.address.zipCode) {
      navigation.push("AddTrackerToUser");
    } else {
      Alert.alert(
        "Dados necessários",
        "Para cadastrar um rastreador, primeiro adicione seu endereço."
      );
      navigation.push("AdressInfo");
    }
  };

  return (
    <View style={styles.container}>
      {isTrackerLoading ? (
        <Loading />
      ) : (
        <>
          <FabIconBottom icon="plus" onPress={decideRoute} />
          <FlatList
            data={trackers}
            contentContainerStyle={styles.list}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => {
              return <CardTracker model={item.model} code={item.code} />;
            }}
            ListEmptyComponent={
              <CardAlert text="Não há rastreadores vinculados a sua conta." />
            }
          />
        </>
      )}
    </View>
  );
}
