import {
  FeatherChartDimensions,
  FeatherChartShirtSize,
  FeatherChartType,
} from "./types";

// DANGER: THIS IS MAKING IT IMPOSSIBLE TO OVERRIDE HEIGHT (dengrogram and radial)
export const getSizing = (
  size: FeatherChartShirtSize,
  type: FeatherChartType
) => {
  // Can set defaults here (if needed)

  const dm: FeatherChartDimensions = {
    control: { width: 0, height: 400 },
    chart: { width: 0, height: 400 },
    margin: {
      top: 21,
      right: 21,
      bottom: 31,
      left: 41,
    },
  };

  // TODO:  the dimension height controls the overall size of the radial / dendrogram;
  if (type === "dendrogram") {
    dm.control.height = 400;
    dm.chart.height = 400;
  }
  if (type === "radial") {
    dm.control.height = 800;
    dm.chart.height = 1000;
  }
  switch (size) {
    case "xs":
      dm.control.width = 370;
      break;
    case "sm":
      dm.control.width = 576;
      break;
    case "md":
      dm.control.width = 768;
      break;
    case "lg":
      dm.control.width = 992;
      break;
    case "xl":
      dm.control.width = 1200;
      break;
    case "xxl":
      dm.control.width = 1400;
      break;
  }

  // Let the chart width start equal to the control width; the effective drawable
  // width (minus margins) will now be derived dynamically in FeatherChart.vue
  // so that the SVG and its draggable container stop growing at the same time
  // regardless of the actual margin configuration.
  dm.chart.width = dm.control.width;

  return dm;
};
