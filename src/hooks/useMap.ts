import { useContext } from "react";
import { MapContext } from "../context/MapContext";

export function useMap() {
  const context = useContext(MapContext);
  return context;
}
