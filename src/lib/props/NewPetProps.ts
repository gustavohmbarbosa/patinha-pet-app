export type NewPetProps = {
  name: string;
  specie: "cat" | "dog";
  race: string;
  gender: 'female' | 'male';
  weight?: number;
  height?: number;
  birth?: Date;
};
