export type NewPetProps = {
  name: string;
  type: "cat" | "dog";
  race: string;
  gender: 'female' | 'male';
  weight?: number;
  height?: number;
  birth?: Date;
};
