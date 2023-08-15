import { AdressUserProps } from "./UserProps";

export type NewUserProps = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  adress: AdressUserProps | null;
};
