export type VaccineDoseProps = {
  id: Number;
  scheduledDate: string;
  vaccinatedDate: string | null;
  dose: Number | null;
  observation: string | null;
  locale: string | null;
  batch: string | null;
  brand: string | null;
  professional: string | null;
};
