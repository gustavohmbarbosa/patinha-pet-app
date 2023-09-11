export type UpdateUserContactProps = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type UpdateUserAddressProps = {
  zipCode: string;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  number: string | null;
  complement: string | null;
};
