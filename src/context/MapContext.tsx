import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationObject,
  LocationAccuracy,
} from "expo-location";

export type MapContextDataProps = {
  positionUser: LocationObject | null;
  isMapLoading: boolean;
};

export type MapContextProviderProps = {
  children: ReactNode;
};

export const MapContext = createContext({} as MapContextDataProps);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [positionUser, setPositionUser] = useState<LocationObject | null>(null);
  const [permited, setPermited] = useState(false);

  // async function requestLocationPermitions() {
  //   setIsMapLoading(true);
  //   const { granted } = await requestForegroundPermissionsAsync();

  //   if (granted) {
  //     setPermited(true);
  //     const currentPosition = await getCurrentPositionAsync();
  //     setPositionUser(currentPosition);
  //   }
  //   setIsMapLoading(false);
  // }

  // useEffect(() => {
  //   requestLocationPermitions();
  // }, []);

  useEffect(() => {
    if (permited) {
      setIsMapLoading(false);
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (response) => {
          setPositionUser(response);
        }
      );
    }
  }, [permited]);

  return (
    <MapContext.Provider
      value={{
        positionUser,
        isMapLoading,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
