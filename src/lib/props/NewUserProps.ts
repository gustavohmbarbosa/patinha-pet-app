import { AddressUserProps } from "./UserProps";

export type NewAddressUserProps = {
  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  number?: string;
  complement?: string;
};

export type NewUserProps = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  address: NewAddressUserProps | null;
};
