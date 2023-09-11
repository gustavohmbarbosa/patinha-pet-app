import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useMap } from "../../hooks/useMap";
import { CardAlert } from "../CardAlert";
import { Pin } from "../Pin";
import { styles } from "./styles";
import { Loading } from "../Loading";
import { useTracker } from "../../hooks/useTrackers";

export function Map() {
  const { positionUser, isMapLoading } = useMap();

  const { petsPosition } = useTracker();

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

              {petsPosition.map((item, index) => {
                return (
                  <Marker
                    key={index + 1}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    title={item.pet.name}
                    description={`${item.tracker.model} - ${item.tracker.code}`}
                  >
                    <Pin text={item.pet.name[0]} />
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
