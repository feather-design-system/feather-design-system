import { ref, computed } from "vue";

const layers = ref([]);
const getElement = (refElement) => {
  const value = refElement.value;
  if (value.trapFocus) {
    //check for focus trap
    return value.content;
  }
  return value.$el ? value.$el : value;
};
const addLayer = (refElement, type) => {
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
  element.style.zIndex = z;

  const newLayer = {
    element,
    z,
  };

  //push both back on to layers list
  layers.value.push(newLayer);

  return newLayer;
};
const removeLayer = (layer) => {
  const index = layers.value.indexOf(layer);
  if (index > -1) {
    layers.value.splice(index, 1);
  }
};
const getElements = (layer) => {
  return computed(() => {
    const index = layers.value.indexOf(layer);
    if (index > -1) {
      return layers.value.slice(index).map((x) => x.element);
    }
    return [];
  });
};

export { addLayer, getElements, removeLayer };
