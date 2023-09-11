type trackerProps = { code: string; model: string; bondDate: Date };
export type PositionWithTrackerAndPet = {
  pet: IdAndNameProps;
  tracker: trackerProps;
  latitude: number;
  longitude: number;
};
