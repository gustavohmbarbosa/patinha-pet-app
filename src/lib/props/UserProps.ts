export type AddressUserProps = {
  zipCode: string | null;
  city: string | null;
  state: string | null;
  street: string | null;
  neighborhood: string | null;
  number: string | null;
  complement: string | null;
};

export type UserProps = {
  token: string;
  // user: {
  //   id: string;
  //   name: string;
  //   cpf: string;
  //   email: string;
  //   phone: string;
  //   address: AddressUserProps;
  // };
};
