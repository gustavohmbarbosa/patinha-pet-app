export type VaccinesDosesPetProps = {
  id: Number;
  vaccine: { id: Number; name: string };
  scheduledDate: string;
  vaccinatedDate: string | null;
  observation: string | null;
  locale: string | null;
  batch: string | null;
  brand: string | null;
  professional: string | null;
};
