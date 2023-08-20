export type NewPetProps = {
  name: string;
  type: "CAT" | "DOG";
  race: string;
  weight?: number | null;
  height?: number | null;
  birth?: Date;
};
