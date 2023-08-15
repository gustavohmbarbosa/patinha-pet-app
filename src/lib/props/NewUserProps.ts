import { AddressUserProps } from "./UserProps";

export type NewUserProps = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address: AddressUserProps | null;
};
