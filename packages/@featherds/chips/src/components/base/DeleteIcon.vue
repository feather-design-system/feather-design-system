<template>
  <span class="chip-delete">
    <a
      href="#"
      class="delete-icon"
      role="button"
      @click.stop.prevent="handleDelete"
      :aria-label="label"
      :aria-describedby="textId"
    >
      <FeatherIcon :icon="icon" flex></FeatherIcon>
    </a>
  </span>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import Cancel from "@featherds/icon/navigation/Cancel";
import { defineComponent } from "vue";
export const props = {
  disabled: {
    type: Boolean,
    default: false,
  },
  textId: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
};
export default defineComponent({
  emits: ["delete"],
  props,
  setup(props, context) {
    const handleDelete = () => {
      if (props.disabled) {
        return;
      }
      context.emit("delete");
    };
    return {
      handleDelete,
      icon: Cancel,
    };
  },
  components: {
    FeatherIcon,
  },
});
</script>
<style lang="scss" scoped>
@import "../../../scss/mixins";

.chip-delete {
  @include chip-delete();
}
</style>
