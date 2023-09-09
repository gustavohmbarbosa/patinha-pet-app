import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { errorHandler } from "../utils/errorHandler";
import { useAuth } from "../hooks/useAuth";
import { NewPetProps } from "../lib/props/NewPetProps";
import { PetProps } from "../lib/props/PetProps";
import { AxiosError } from "axios";
import { VaccineProps } from "../lib/props/VaccineProps";
import { NewVaccineDoseProps } from "../lib/props/NewVaccineDoseProps";
import { UpdatePetProps } from "../lib/props/UpdatePetProps";

export type PetContextDataProps = {
  pets: PetProps[];
  isPetLoading: boolean;
  reloadPets: () => Promise<void>;
  addNewPet: (newPet: NewPetProps) => Promise<boolean>;
  updatePet: (pet: UpdatePetProps) => Promise<PetProps | null>;
  deletePet: () => Promise<void>;
  dogVaccines: VaccineProps[];
  catVaccines: VaccineProps[];
  addVaccineToPet: (
    petId: Number,
    vaccineId: Number,
    vaccineDose: NewVaccineDoseProps
  ) => Promise<boolean>;
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

  async function getPet(id: Number) {
    setIsPetLoading(true);
    var pet: PetProps | null = null;
    await api.get(`/pets/${id}`).then((response) => {
      const data: PetProps = response.data;
      pet = data;
    });
    return pet;
  }

  async function addNewPet(newPet: NewPetProps) {
    setIsPetLoading(true);

    return await api
      .post("/pets", newPet)
      .then(() => {
        reloadPets();
        return true;
      })
      .catch((err) => {
        errorHandler(err);
        return true;
      })
      .finally(() => {
        setIsPetLoading(false);
      });
  }

  async function updatePet(pet: UpdatePetProps) {
    setIsPetLoading(true);
    var returnPet: PetProps | null = null;
    await api
      .put(`/pets/${pet.id}`, pet)
      .then(async () => {
        const response = await getPet(pet.id);
        if (response) {
          var petsTemp = pets;
          const index = pets.findIndex((item) => item.id === pet.id);
          if (index !== -1) {
            petsTemp[index] = response;
          }
          returnPet = response;
          setPets(petsTemp);
        }
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsPetLoading(false);
      });
    return returnPet;
  }

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
    return await api
      .post(`/pets/${petId}/vaccines/${vaccineId}/doses`, vaccineDose)
      .then(() => {
        return true;
      })
      .catch((error) => {
        errorHandler(error);
        return false;
      })
      .finally(() => {
        setIsPetLoading(false);
      });
  }

  useEffect(() => {
    if (user.token) {
      reloadPets();
      getVaccines();
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
        dogVaccines,
        catVaccines,
        addVaccineToPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
