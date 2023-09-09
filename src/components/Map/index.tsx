import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import MapView, { Marker } from "react-native-maps";
import { useMap } from "../../hooks/useMap";
import { CardAlert } from "../CardAlert";
import { Pin } from "../Pin";

export function Map() {
  const { positionUser } = useMap();
  return (
    <View style={styles.container}>
      {positionUser ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: positionUser.coords.latitude,
            longitude: positionUser.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: positionUser.coords.latitude,
              longitude: positionUser.coords.longitude,
            }}
            title="Você"
            description="Sua localização atual"
            // style={{ width: 75, height: 75 }}
            // image={require("../../assets/elipse.png")}
          >
            <Pin text="Luan" />
          </Marker>
        </MapView>
      ) : (
        <View style={styles.card}>
          <CardAlert text="Permita o acesso de localização." />
        </View>
      )}
    </View>
  );
}
