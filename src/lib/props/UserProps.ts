export type AddressUserProps = {
  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  number: string | null;
  complement: string | null;
};

export type UserProps = {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    address: AddressUserProps | null;
  };
};
