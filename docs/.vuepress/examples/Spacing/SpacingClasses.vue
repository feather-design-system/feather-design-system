<template>
  <form>
    <FeatherSelect
      label="State"
      :options="sizes"
      v-model="size"
    >
    </FeatherSelect>
    <p>Using margin top and bottom at <em>{{size?._text}}</em> on each Input.</p>
    <FeatherInput
      label="Test 1"
      :modelValue="test"
      :class="spacingClasses"
    />
    <FeatherInput
      label="Test 2"
      :modelValue="test"
      :class="spacingClasses"
    />
    <FeatherInput
      label="Test 3"
      :modelValue="test"
      :class="spacingClasses"
    />
  </form>
</template>
<script>
import { ref } from "vue";
import { FeatherInput } from "@featherds/input";
import { FeatherSelect } from "@featherds/select";

export default {
  data() {
    return {
      sizes: [
        { _text:"xxs" },
        { _text:"xs" },
        { _text:"s" },
        { _text:"m" },
        { _text:"l" },
        { _text:"xl" },
        { _text:"xxl" }
      ],
      size: undefined,
      test: ""
    };
  },
  computed: {
    spacingClasses() {
      const selected = this.size?._text;
      return `mt-${selected} mb-${selected}`;
    }
  },
  components: {
    FeatherInput,
    FeatherSelect
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/input-helper/scss/spacing";

</style>
