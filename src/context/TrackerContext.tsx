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
import { NewUserTracker } from "../lib/props/NewUserTracker";
import { UserTarckerBond } from "../lib/props/UserTrackerBond";
import { AxiosError } from "axios";

export type TrackerContextDataProps = {
  trackers: TrackerProps[];
  isTrackerLoading: boolean;
  addNewTracker: (tracker: NewUserTracker) => Promise<boolean>;
};

export type TrackerContextProviderProps = {
  children: ReactNode;
};

export const TrackerContext = createContext({} as TrackerContextDataProps);

export function TrackerContextProvider({
  children,
}: TrackerContextProviderProps) {
  const [trackers, setTrackers] = useState<TrackerProps[]>([]);
  const [isTrackerLoading, setIsTrackerLoading] = useState(true);

  const { user } = useAuth();

  async function getUserTrackers() {
    setIsTrackerLoading(true);
    await api
      .get("/trackers")
      .then((response) => {
        const data: TrackerProps[] = response.data;
        setTrackers(data);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status !== 404) {
          errorHandler(err);
        }
      })
      .finally(() => {
        setIsTrackerLoading(false);
      });
  }

  async function addNewTracker(tracker: NewUserTracker) {
    setIsTrackerLoading(true);
    return await api
      .post("/trackers", tracker)
      .then((response) => {
        const data: UserTarckerBond = response.data;
        setTrackers([...trackers, data.tracker]);
        return true;
      })
      .catch((err) => {
        errorHandler(err);
        return false;
      })
      .finally(() => {
        setIsTrackerLoading(false);
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
        isTrackerLoading,
        addNewTracker,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
