import { useContext } from "react";
import { TrackerContext } from "../context/TrackerContext";

export function useTracker() {
  const context = useContext(TrackerContext);
  return context;
}
