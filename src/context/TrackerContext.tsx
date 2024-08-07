import { createContext, ReactNode, useEffect, useState } from "react";
import { TrackerProps } from "../lib/props/TrackerProps";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { errorHandler } from "../utils/errorHandler";
import { NewUserTrackerProps } from "../lib/props/NewUserTrackerProps";
import { UserTarckerBondProps } from "../lib/props/UserTrackerBondProps";
import { AxiosError } from "axios";
import { PositionWithTrackerAndPet } from "../lib/props/PositionWithTrackerAndPet";

export type TrackerContextDataProps = {
  trackers: TrackerProps[];
  petsPosition: PositionWithTrackerAndPet[];
  isTrackerLoading: boolean;
  addNewTracker: (tracker: NewUserTrackerProps) => Promise<Number | null>;
  addTrackerToPet: (petId: Number, trackerId: Number) => Promise<boolean>;
  removeTrackerPet: (petId: Number, trackerId: Number) => Promise<boolean>;
};

export type TrackerContextProviderProps = {
  children: ReactNode;
};

export const TrackerContext = createContext({} as TrackerContextDataProps);

export function TrackerContextProvider({
  children,
}: TrackerContextProviderProps) {
  const [trackers, setTrackers] = useState<TrackerProps[]>([]);
  const [petsPosition, setPetsPosition] = useState<PositionWithTrackerAndPet[]>(
    []
  );
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

  async function addNewTracker(tracker: NewUserTrackerProps) {
    setIsTrackerLoading(true);
    return await api
      .post("/trackers", tracker)
      .then((response) => {
        const data: UserTarckerBondProps = response.data;
        setTrackers([...trackers, data.tracker]);
        return data.tracker.id;
      })
      .catch((err) => {
        errorHandler(err);
        return null;
      })
      .finally(() => {
        setIsTrackerLoading(false);
      });
  }

  async function addTrackerToPet(petId: Number, trackerId: Number) {
    setIsTrackerLoading(true);
    return await api
      .post(`/pets/${petId}/tracker`, { trackerId: trackerId })
      .then(() => {
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

  async function removeTrackerPet(petId: Number, trackerId: Number) {
    setIsTrackerLoading(true);
    return await api
      .delete(`/pets/${petId}/tracker`, { data: { trackerId: trackerId } })
      .then(() => {
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

  async function getPetsPosition() {
    await api
      .get("/pets/positions")
      .then((response) => {
        const positions: PositionWithTrackerAndPet[] = response.data;
        setPetsPosition(positions);
      })
      .catch((err) => {
        errorHandler(err);
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
        petsPosition,
        isTrackerLoading,
        addNewTracker,
        addTrackerToPet,
        removeTrackerPet,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
