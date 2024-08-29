export type AddressUserProps = {
  cep: string | null;
  city: string | null;
  state: string | null;
  street: string | null;
  district: string | null;
  number: string | null;
  complement: string | null;
};

export type UserBasicProps = {
  name: string;
  email: string;
};

export type UserProps = {
  token: string;
  user: {
    id: string;
    name: string;
    cpf: string;
    email: string;
    phone_number: string;
    address: AddressUserProps;
  };
};
