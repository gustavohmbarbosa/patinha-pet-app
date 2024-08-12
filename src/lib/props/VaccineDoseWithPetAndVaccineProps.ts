export type VaccineDoseWithPetAndVaccineProps = {
  id: Number;
  pet: IdAndNameProps;
  vaccine: IdAndNameProps;
  scheduledDate: string;
  vaccinatedDate: string | null;
  observation: string | null;
  locale: string | null;
  batch: string | null;
  brand: string | null;
  professional: string | null;
};
