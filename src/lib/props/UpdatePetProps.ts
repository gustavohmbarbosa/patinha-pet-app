export type UpdatePetProps = {
  id: Number;
  name: string;
  type: "DOG" | "CAT";
  breed: string;
  weight: Number | null;
  height: Number | null;
  birth: Date | null;
};
