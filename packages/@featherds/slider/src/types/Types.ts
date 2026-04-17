export type SliderTick = {
  tick?: number;
  label: string;
  color: string;
  icon?: string;
};

export type FeatherSliderProps = {
  id: string;
  label: string;
  value: number;
  floor?: number;
  ticks: SliderTick[];
};
