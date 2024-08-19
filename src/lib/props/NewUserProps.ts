export type NewAddressUserProps = {
  cep: string;
  city: string;
  state: string;
  district: string;
  street: string;
  number?: string;
  complement?: string;
};

export type NewUserProps = {
  name: string;
  cpf: string;
  phone_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  address?: NewAddressUserProps | null;
};
