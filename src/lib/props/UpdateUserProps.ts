export type UpdateUserContactProps = {
  name: string;
  cpf: string;
  email: string;
  phone_number: string;
};

export type UpdateUserAddressProps = {
  cep: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number?: string;
  complement?: string;
};
