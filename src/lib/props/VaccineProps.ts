export type VaccineProps = {
  id: number;
  name: string;
  description: string;
  petType: "DOG" | "CAT";
  required: boolean;
  ageForFirstDose: number;
  ageFotSecondDose: number;
  ageForThirdDose: number;
  frequency: "UNIQUE" | "YEARLY" | "BIANNUAL";
  isActiveForChoice: boolean;
};
