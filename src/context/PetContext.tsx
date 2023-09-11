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
import { VaccineDoseWithVaccineProps } from "../lib/props/VaccineDoseWithVaccineProps";
import { VaccineDoseWithPetAndVaccineProps } from "../lib/props/VaccineDoseWithPetAndVaccineProps";
import { UpdateVaccineDoseProps } from "../lib/props/UpdateVaccineDoseProps";

export type PetContextDataProps = {
  pets: PetProps[];
  isPetLoading: boolean;
  isVaccineDosesLoading: boolean;
  reloadPets: () => Promise<void>;
  addNewPet: (newPet: NewPetProps) => Promise<boolean>;
  updatePet: (pet: UpdatePetProps) => Promise<PetProps | null>;
  dogVaccines: VaccineProps[];
  catVaccines: VaccineProps[];
  addVaccineToPet: (
    petId: Number,
    vaccineId: Number,
    vaccineDose: NewVaccineDoseProps
  ) => Promise<boolean>;
  updateVaccineDosePet: (
    petId: Number,
    doseId: Number,
    vaccineDose: UpdateVaccineDoseProps
  ) => Promise<boolean>;
  getPetVaccinesDoses: (
    petId: Number
  ) => Promise<VaccineDoseWithVaccineProps[]>;
  getAllVaccinesDosesOnTime: () => Promise<VaccineDoseWithPetAndVaccineProps[]>;
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
  const [isVaccineDosesLoading, setIsVaccineDosesLoading] = useState(false);

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
        var petsTemp = pets;
        const index = pets.findIndex((item) => item.id === pet.id);
        if (index !== -1) {
          petsTemp[index] = {
            ...pets[index],
            ...pet,
            birth: pet.birth ? String(pet.birth) : null,
          };
        }
        returnPet = petsTemp[index];
        setPets(petsTemp);
      })
      .catch((err) => {
        errorHandler(err);
      })
      .finally(() => {
        setIsPetLoading(false);
      });
    return returnPet;
  }

  async function getVaccines() {
    await api
      .get("/vaccines")
      .then((response) => {
        const vaccines: VaccineProps[] = response.data;
        var cat: VaccineProps[] = [];
        var dog: VaccineProps[] = [];

        vaccines.forEach((vaccine) => {
          if (vaccine.isActiveForChoice) {
            if (vaccine.petType === "DOG") {
              dog.push(vaccine);
            } else {
              cat.push(vaccine);
            }
          }
        });

        setDogVaccines(dog);
        setCatVaccines(cat);
      })
      .catch((error) => {
        errorHandler(error);
      });
  }

  async function getPetVaccinesDoses(petId: Number) {
    setIsVaccineDosesLoading(true);
    var doses: VaccineDoseWithVaccineProps[] = [];
    await api
      .get(`/pets/${petId}/doses`)
      .then((response) => {
        const data: VaccineDoseWithVaccineProps[] = response.data;
        doses = data;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status !== 404) {
          errorHandler(err);
        }
      })
      .finally(() => {
        setIsVaccineDosesLoading(false);
      });
    return doses;
  }

  async function getAllVaccinesDosesOnTime() {
    setIsVaccineDosesLoading(true);
    var doses: VaccineDoseWithPetAndVaccineProps[] = [];
    await api
      .get(`/pets/doses`)
      .then((response) => {
        const data: VaccineDoseWithPetAndVaccineProps[] = response.data;
        doses = data;
      })
      .catch((err: AxiosError) => {
        if (err.response?.status !== 404) {
          errorHandler(err);
        }
      })
      .finally(() => {
        setIsVaccineDosesLoading(false);
      });
    return doses;
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

  async function updateVaccineDosePet(
    petId: Number,
    doseId: Number,
    vaccineDose: UpdateVaccineDoseProps
  ) {
    setIsVaccineDosesLoading(true);
    return await api
      .put(`/pets/${petId}/doses/${doseId}`, vaccineDose)
      .then(() => {
        return true;
      })
      .catch((err) => {
        errorHandler(err);
        return false;
      })
      .finally(() => {
        setIsVaccineDosesLoading(false);
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
        isVaccineDosesLoading,
        reloadPets,
        addNewPet,
        updatePet,
        dogVaccines,
        catVaccines,
        addVaccineToPet,
        updateVaccineDosePet,
        getPetVaccinesDoses,
        getAllVaccinesDosesOnTime,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
