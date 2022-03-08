import { computed } from "vue";

const useInputInheritAttrs = (attrs: Record<string, unknown>) => {
  return {
    inherittedAttrs: computed(() => {
      return {
        class: attrs.class,
        "data-ref-id": attrs["data-ref-id"],
      };
    }),
  };
};

export { useInputInheritAttrs };
