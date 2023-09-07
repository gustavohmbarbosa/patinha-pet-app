import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { errorHandler } from "../utils/errorHandler";
import { useAuth } from "../hooks/useAuth";
import { NewPetProps } from "../lib/props/NewPetProps";
import { PetProps } from "../lib/props/PetProps";
import { AxiosError } from "axios";
import { VaccineProps } from "../lib/props/VaccineProps";
import { NewVaccineDoseProps } from "../lib/props/NewVaccineDoseProps";

export type PetContextDataProps = {
  pets: PetProps[];
  isPetLoading: boolean;
  reloadPets: () => Promise<void>;
  addNewPet: (newPet: NewPetProps) => Promise<void>;
  updatePet: () => Promise<void>;
  deletePet: () => Promise<void>;
  dogVaccines: VaccineProps[];
  catVaccines: VaccineProps[];
  addVaccineToPet: (
    petId: Number,
    vaccineId: Number,
    vaccineDose: NewVaccineDoseProps
  ) => Promise<void>;
};

export type PetContextProviderProps = {
  children: ReactNode;
};

export const PetContext = createContext({} as PetContextDataProps);

export function PetContextProvider({ children }: PetContextProviderProps) {
  const { user } = useAuth();

  const [pets, setPets] = useState<PetProps[]>([]);
  const [dogVaccines, setDogVaccines] = useState<VaccineProps[]>([]);
  const [catVaccines, setCatVaccines] = useState<VaccineProps[]>([]);
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
      .then(() => {
        reloadPets();
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

  async function getVaccines() {
    await api
      .get("/vaccines")
      .then((response) => {
        const vaccines: VaccineProps[] = response.data;
        var cat: VaccineProps[] = [];
        var dog: VaccineProps[] = [];

        vaccines.forEach((vaccine) => {
          if (vaccine.petType === "DOG") {
            dog.push(vaccine);
          } else {
            cat.push(vaccine);
          }
        });

        setDogVaccines(dog);
        setCatVaccines(cat);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }

  async function addVaccineToPet(
    petId: Number,
    vaccineId: Number,
    vaccineDose: NewVaccineDoseProps
  ) {
    setIsPetLoading(true);
    await api
      .post(`/pets/${petId}/vaccines/${vaccineId}/doses`, vaccineDose)
      .then()
      .catch((error) => errorHandler(error))
      .finally(() => {
        setIsPetLoading(false);
      });
  }

  useEffect(() => {
    if (user.token) {
      reloadPets();
    }
  }, [user]);

  useEffect(() => {
    getVaccines();
  }, []);

  return (
    <PetContext.Provider
      value={{
        pets,
        isPetLoading,
        reloadPets,
        addNewPet,
        updatePet,
        deletePet,
        dogVaccines,
        catVaccines,
        addVaccineToPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
