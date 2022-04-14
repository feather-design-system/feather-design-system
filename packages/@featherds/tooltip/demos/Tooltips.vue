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
        Alignment
        <select name="alignment" id="alignment" v-model="alignment">
          <option v-for="item in alignments" :key="item">{{ item }}</option>
        </select>
      </div>
    </div>
    <FeatherTooltip
      title="Example tooltip Example tooltip Example tooltip Example tooltip Example tooltip Example tooltip Example tooltip Example tooltip Example tooltip"
      v-slot="{ attrs }"
      :alignment="alignment"
      :placement="placement"
    >
      <FeatherButton primary v-bind="attrs" icon="Add"
        ><FeatherIcon :icon="icon"> </FeatherIcon
      ></FeatherButton>
    </FeatherTooltip>
  </section>
</template>
<script lang="ts">
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
import { TooltipAlignment, TooltipPlacement } from "../src/types";
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
    const alignment = ref(TooltipAlignment.center);
    const alignments = [
      TooltipAlignment.center,
      TooltipAlignment.left,
      TooltipAlignment.right,
    ];

    return { placement, placements, alignment, alignments, icon };
  },
  components: {
    ...components,
    FeatherIcon,
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
