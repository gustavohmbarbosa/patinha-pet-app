import { VaccinesPetProps } from "../lib/props/VaccinesPetProps";
import { errorHandler } from "../utils/errorHandler";
import { api } from "./api";

export async function getVaccinesPet(petId: Number) {
  var vaccines: VaccinesPetProps[] | null = null;
  await api
    .get(`/pets/${petId}/vaccines/`)
    .then((response) => {
      vaccines = response.data;
    })
    .catch((error) => errorHandler(error));

  return vaccines;
}
