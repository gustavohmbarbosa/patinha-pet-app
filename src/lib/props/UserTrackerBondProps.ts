import { PetProps } from "./PetProps";
import { TrackerProps } from "./TrackerProps";

export type UserTarckerBondProps = {
  id: Number;
  pet: PetProps | null;
  tracker: TrackerProps;
  bondDate: string;
};
