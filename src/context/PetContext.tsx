import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { errorHandler } from "../utils/errorHandler";
import { useAuth } from "../hooks/useAuth";
import { NewPetProps } from "../lib/props/NewPetProps";
import { PetProps } from "../lib/props/PetProps";
import { AxiosError } from "axios";

export type PetContextDataProps = {
  pets: PetProps[];
  isPetLoading: boolean;
  reloadPets: () => Promise<void>;
  addNewPet: (newPet: NewPetProps) => Promise<void>;
  updatePet: () => Promise<void>;
  deletePet: () => Promise<void>;
};

export type PetContextProviderProps = {
  children: ReactNode;
};

export const PetContext = createContext({} as PetContextDataProps);

export function PetContextProvider({ children }: PetContextProviderProps) {
  const { user } = useAuth();

  const [pets, setPets] = useState<PetProps[]>([]);
  const [isPetLoading, setIsPetLoading] = useState(false);

  async function reloadPets() {
    setIsPetLoading(true);
    await api
      .get("/pets")
      .then((response) => {
        const data: PetProps[] = response.data;
        setPets(data);
      })
      .catch((err: AxiosError) => {
        if (err.response?.status !== 404) {
          errorHandler(err);
        }
      })
      .finally(() => {
        setIsPetLoading(false);
      });
  }

  async function addNewPet(newPet: NewPetProps) {
    setIsPetLoading(true);

    await api
      .post("/pets", newPet)
      .then((retorno) => {
        const addedPet: PetProps = retorno.data;
        setPets([...pets, addedPet]);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsPetLoading(false);
      });
  }

  async function updatePet() {}

  async function deletePet() {}

  useEffect(() => {
    if (user.token) {
      reloadPets();
    }
  }, [user]);

  return (
    <PetContext.Provider
      value={{
        pets,
        isPetLoading,
        reloadPets,
        addNewPet,
        updatePet,
        deletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
