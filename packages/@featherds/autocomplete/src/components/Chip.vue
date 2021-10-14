<template>
  <BaseChip
    class="focus autocomplete-chip"
    :class="{ focused: focused }"
    condensed
    :disabled="disabled"
  >
    <BaseChipPreIcon v-if="showPreIcon">
      <FeatherIcon :icon="pre.icon" :title="pre.title"> </FeatherIcon
    ></BaseChipPreIcon>
    <BaseChipLabel>{{ text }}</BaseChipLabel>
    <span class="chip-delete" @click.stop="handleClick" v-if="!disabled">
      <FeatherIcon class="delete-icon" flex :title="removeLabel"
        ><Cancel />
      </FeatherIcon>
    </span>
  </BaseChip>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Cancel from "@featherds/icon/navigation/Cancel";
import { BaseChip, BaseChipLabel, BaseChipPreIcon } from "@featherds/chips";
export default {
  name: "Chip",
  emits: ["delete"],
  props: {
    focused: {
      type: Boolean,
      default: false,
    },
    removeLabel: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    pre: {
      type: Object,
    },
  },
  computed: {
    showPreIcon() {
      return this.pre && this.pre.icon && this.pre.title;
    },
  },
  methods: {
    handleClick() {
      this.$emit("delete");
    },
  },
  components: {
    FeatherIcon,
    Cancel,
    BaseChip,
    BaseChipLabel,
    BaseChipPreIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/chips/scss/mixins";
.autocomplete-chip.chip {
  margin: 4px 0;
  margin-right: 8px;
}

.chip-delete {
  @include chip-delete();
}
</style>
