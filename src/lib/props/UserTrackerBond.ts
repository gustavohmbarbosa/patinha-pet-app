import { PetProps } from "./PetProps";
import { TrackerProps } from "./TrackerProps";

export type UserTarckerBond = {
  id: Number;
  pet: PetProps | null;
  tracker: TrackerProps;
  bondDate: string;
};
