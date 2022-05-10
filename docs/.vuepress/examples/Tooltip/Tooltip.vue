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
    <FeatherTooltip
      title="Add an item"
      v-slot="{ attrs, on }"
      :pointer-alignment="alignment"
      :placement="placement"
    >
      <FeatherButton v-bind="attrs" v-on="on" icon="Add"
        ><FeatherIcon :icon="icon"> </FeatherIcon
      ></FeatherButton>
    </FeatherTooltip>
  </section>
</template>
<script lang="ts">
import { FeatherButton } from "@featherds/button";
import {
  PointerAlignment,
  TooltipPlacement,
  FeatherTooltip,
} from "@featherds/tooltip";
import { FeatherIcon } from "@featherds/icon";
import icon from "@featherds/icon/action/Add";
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const placement = ref(TooltipPlacement.top);
    const placements = [
      TooltipPlacement.top,
      TooltipPlacement.bottom,
      TooltipPlacement.left,
      TooltipPlacement.right,
    ];
    const alignment = ref(PointerAlignment.center);
    const alignments = [
      PointerAlignment.center,
      PointerAlignment.left,
      PointerAlignment.right,
    ];

    return { placement, placements, alignment, alignments, icon };
  },
  components: {
    FeatherButton,
    FeatherTooltip,
    FeatherIcon,
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
