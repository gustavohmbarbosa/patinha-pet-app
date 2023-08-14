export type AdressUserProps = {
  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  number: number;
  complement: string;
};

export type UserProps = {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    adress?: AdressUserProps | null;
  };
};
