export type UpdatePetProps = {
  id: Number;
  name: string;
  specie: "dog" | "cat";
  race: string;
  gender: 'female' | 'male';
  weight?: Number | null;
  height?: Number | null;
  birth: Date | null;
};
