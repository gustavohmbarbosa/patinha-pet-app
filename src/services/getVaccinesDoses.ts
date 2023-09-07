import { VaccineDoseProps } from "../lib/props/VaccineDoseProps";
import { errorHandler } from "../utils/errorHandler";
import { api } from "./api";

export async function getVaccinesDoses(petId: Number, vaccineId: Number) {
  var doses: VaccineDoseProps[] | null = null;
  await api
    .get(`/pets/${petId}/vaccines/${vaccineId}/doses`)
    .then((response) => {
      doses = response.data;
    })
    .catch((error) => errorHandler(error));

  return doses;
}
