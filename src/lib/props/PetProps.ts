export type PetProps = {
  id: Number;
  name: string;
  type: "DOG" | "CAT";
  breed: string;
  weight: Number | null;
  height: Number | null;
  birth: string | null;
  createdOn: Date;
  updatedOn: Date;
};
