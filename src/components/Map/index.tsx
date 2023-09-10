import React, { useState } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useMap } from "../../hooks/useMap";
import { CardAlert } from "../CardAlert";
import { Pin } from "../Pin";
import { styles } from "./styles";
import { Loading } from "../Loading";

export function Map() {
  const { positionUser, isMapLoading } = useMap();

  const [petsPosition, setPetsPosition] = useState([""]);

  return (
    <View style={styles.container}>
      {isMapLoading ? (
        <Loading />
      ) : (
        <>
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
                key={0}
                coordinate={{
                  latitude: positionUser.coords.latitude,
                  longitude: positionUser.coords.longitude,
                }}
                title="Você"
                description="Sua localização atual"
              >
                <Pin isUser />
              </Marker>

              {petsPosition.map((pet, index) => {
                return (
                  <Marker
                    key={index + 1}
                    coordinate={{
                      latitude: -8.9043,
                      longitude: -36.4926,
                    }}
                    title="Pet"
                    description="Trc - 4743SD"
                  >
                    <Pin text="P" />
                  </Marker>
                );
              })}
            </MapView>
          ) : (
            <View style={styles.card}>
              <CardAlert text="Permita o acesso de localização." />
            </View>
          )}
        </>
      )}
    </View>
  );
}
