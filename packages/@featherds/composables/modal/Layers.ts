import { ref, computed, Ref, ComponentPublicInstance, isRef } from "vue";

const layers: Ref<ILayer[]> = ref([]);
type IRefElement =
  | Ref<HTMLElement | IFocusTrap | ComponentPublicInstance>
  | HTMLElement;
interface IFocusTrap {
  trapFocus: boolean;
  content: HTMLElement;
}
export interface ILayer {
  element: HTMLElement;
  z: number;
}
const getElement = (refElement: IRefElement) => {
  if (!isRef(refElement)) {
    return refElement as HTMLElement;
  }
  const value = refElement.value;
  if ((value as IFocusTrap).trapFocus) {
    //check for focus trap
    return (value as IFocusTrap).content;
  }
  return (value as ComponentPublicInstance).$el
    ? ((value as ComponentPublicInstance).$el as HTMLElement)
    : (value as HTMLElement);
};
const addLayer = (refElement: IRefElement, type: string) => {
  let z = 0;
  if (layers.value.length) {
    const current = layers.value[layers.value.length - 1];
    z = current.z;
  }
  const element = getElement(refElement);
  //calculate new z index
  const rawZ = window
    .getComputedStyle(element)
    .getPropertyValue(`--feather-zindex-${type}`);

  if (rawZ && !isNaN(parseInt(rawZ, 10))) {
    z = parseInt(rawZ, 10) + z;
  }
  element.style.zIndex = z.toString();

  const newLayer: ILayer = {
    element,
    z,
  };

  //push both back on to layers list
  layers.value.push(newLayer);

  return newLayer;
};
const removeLayer = (layer: ILayer) => {
  const index = layers.value.indexOf(layer);
  if (index > -1) {
    layers.value.splice(index, 1);
  }
};
const getElements = (layer: ILayer) => {
  return computed(() => {
    const index = layers.value.indexOf(layer);
    if (index > -1) {
      return layers.value.slice(index).map((x) => x.element);
    }
    return [];
  });
};

export { addLayer, getElements, removeLayer };
