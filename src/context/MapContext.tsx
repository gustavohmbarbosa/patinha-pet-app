import { createContext, ReactNode, useEffect, useState } from "react";
import { UserProps } from "../lib/props/UserProps";
import { api } from "../services/api";
import { Alert } from "react-native";
import { NewUserProps } from "../lib/props/NewUserProps";
import {
  UpdateUserAddressProps,
  UpdateUserContactProps,
} from "../lib/props/UpdateUserProps";
import { errorHandler } from "../utils/errorHandler";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationObject,
  LocationAccuracy,
} from "expo-location";

export type MapContextDataProps = {
  positionUser: LocationObject | null;
};

export type MapContextProviderProps = {
  children: ReactNode;
};

export const MapContext = createContext({} as MapContextDataProps);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [positionUser, setPositionUser] = useState<LocationObject | null>(null);

  async function requestLocationPermitions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setPositionUser(currentPosition);
      console.log("Position ==> ", currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermitions();
  }, []);

  useEffect(() => {
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
  }, []);

  return (
    <MapContext.Provider
      value={{
        positionUser,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
