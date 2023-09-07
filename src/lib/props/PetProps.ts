export type PetProps = {
  id: Number;
  name: string;
  type: "DOG" | "CAT";
  breed: string;
  weight: number | null;
  height: number | null;
  birth: string | null;
  createdOn: Date;
  updatedOn: Date;
};
