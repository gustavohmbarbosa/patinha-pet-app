import { createContext, ReactNode, useEffect, useState } from "react";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  LocationObject,
  LocationAccuracy,
} from "expo-location";
import { TrackerProps } from "../lib/props/TrackerProps";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { errorHandler } from "../utils/errorHandler";

export type TrackerContextDataProps = {
  trackers: TrackerProps[];
  isLoadingTrackers: boolean;
};

export type TrackerContextProviderProps = {
  children: ReactNode;
};

export const TrackerContext = createContext({} as TrackerContextDataProps);

export function TrackerContextProvider({
  children,
}: TrackerContextProviderProps) {
  const [trackers, setTrackers] = useState<TrackerProps[]>([]);
  const [isLoadingTrackers, setIsLoadingTrackers] = useState(true);

  const { user } = useAuth();

  async function getUserTrackers() {
    setIsLoadingTrackers(true);
    await api
      .get("/trackers")
      .then((response) => {
        const data: TrackerProps[] = response.data;
        setTrackers(data);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsLoadingTrackers(false);
      });
  }

  useEffect(() => {
    if (user.token) {
      getUserTrackers();
    }
  }, [user]);

  return (
    <TrackerContext.Provider
      value={{
        trackers,
        isLoadingTrackers,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
