export type PetProps = {
  id: Number;
  name: string;
  type: "dog" | "cat";
  race: string;
  gender: 'female' | 'male';
  castrated: boolean;
  weight: Number | null;
  height: Number | null;
  birth: string | null;
  createdOn: Date;
  updatedOn: Date;
};
