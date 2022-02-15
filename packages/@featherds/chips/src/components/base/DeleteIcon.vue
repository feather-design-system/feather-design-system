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
<script>
import { FeatherIcon } from "@featherds/icon";
import Cancel from "@featherds/icon/navigation/Cancel";
export default {
  emits: ["delete"],
  props: {
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
  },
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
};
</script>
<style lang="scss" scoped>
@import "../../../scss/mixins";

.chip-delete {
  @include chip-delete();
}
</style>
