import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useMap } from "../../hooks/useMap";
import { CardAlert } from "../CardAlert";
import { Pin } from "../Pin";
import { styles } from "./styles";

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
          >
            <Pin isUser />
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
