import { useContext } from "react";
import { PetContext } from "../context/PetContext";

export function usePet() {
  const context = useContext(PetContext);
  return context;
}
