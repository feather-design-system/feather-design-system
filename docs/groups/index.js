import fundamentals from "./fundamentals";
import components from "./components";
import form from "./form";

export default [
  {
    name: "Fundamentals",
    groups: [
      {
        name: "Style",
        description: "Core styling elements for Feather",
        elements: fundamentals,
      },
    ],
  },
  {
    name: "Components",
    groups: [
      {
        name: "Base Elements",
        description:
          "Low level components that a commonly used in Feather Applications",
        elements: components,
      },
      {
        name: "Form Elements",
        description: "Controls to be used inside forms",
        elements: form,
      },
    ],
  },
];
