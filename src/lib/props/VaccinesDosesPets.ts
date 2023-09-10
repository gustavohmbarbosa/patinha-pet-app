type IdAndName = { id: Number; name: string };

export type VaccinesDosesPets = {
  id: Number;
  pet: IdAndName;
  vaccine: IdAndName;
  scheduledDate: string;
  vaccinatedDate: string | null;
  observation: string | null;
  locale: string | null;
  batch: string | null;
  brand: string | null;
  professional: string | null;
};
