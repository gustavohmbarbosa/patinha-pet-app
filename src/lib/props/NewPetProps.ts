export type NewPetProps = {
  name: string;
  type: "CAT" | "DOG";
  breed: string;
  weight?: number;
  height?: number;
  birth?: Date;
};
