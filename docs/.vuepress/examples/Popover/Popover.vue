<template>
  <section>
    <div class="configuration">
      <div>
        Placement
        <select name="placement" id="placement" v-model="placement">
          <option v-for="item in placements" :key="item">{{ item }}</option>
        </select>
      </div>
      <div>
        Pointer Alignment
        <select name="alignment" id="alignment" v-model="alignment">
          <option v-for="item in alignments" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
    <FeatherPopover :pointer-alignment="alignment" :placement="placement">
      <template #default>
        <div>
          <h4>Test heading</h4>

          <p>lorem ipsum or something</p>
          <a href="#"> random link i guess</a>
        </div>
      </template>
      <template #trigger="{ attrs, on }">
        <FeatherButton secondary v-bind="attrs" v-on="on"
          >Find out more</FeatherButton
        >
      </template>
    </FeatherPopover>
  </section>
</template>
<script lang="ts">
import {
  FeatherPopover,
  PointerAlignment,
  PopoverPlacement,
} from "@featherds/popover";
import { FeatherButton } from "@featherds/button";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const placement = ref(PopoverPlacement.top);
    const placements = [
      PopoverPlacement.top,
      PopoverPlacement.bottom,
      PopoverPlacement.left,
      PopoverPlacement.right,
    ];
    const alignment = ref(PointerAlignment.center);
    const alignments = [
      PointerAlignment.center,
      PointerAlignment.left,
      PointerAlignment.right,
    ];

    return { placement, placements, alignment, alignments };
  },
  components: {
    FeatherPopover,
    FeatherButton,
  },
});
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  .configuration {
    margin-bottom: 24px;
  }
}
</style>
