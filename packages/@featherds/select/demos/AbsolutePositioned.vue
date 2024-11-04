<template>
  <div class="select-demo">
    <FeatherSelect
      class="normal-select"
      data-ref-id="test"
      label="State"
      clear="Clear State"
      hint="This is a select within a 'position: relative' container"
      :options="states"
      v-model="state"
    />
    <FeatherExpansionPanel
      no-expand
      title="Draggable Absolute Positioning Example"
      class="feather-panel"
      draggable="true"
      @mousedown.prevent="beginDrag"
      @mousemove="continueDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      :style="{
        transform: `translate(${detailPos.x}px, ${detailPos.y}px)`,
      }"
    >
      <template #default>
        <div class="panel-content">
          <p :style="{ fontStyle: 'italic' }">
            Drag expansion panel and change selections below.
          </p>
          <FeatherSelect
            class="normal-select"
            data-ref-id="test2"
            label="WITHOUT absolute-positioned attribute"
            clear="Clear State"
            hint="The dropdown menu IS NOT absolute-positioned"
            :options="states"
            v-model="state2"
          />
          <FeatherSelect
            class="normal-select"
            data-ref-id="test3"
            label="WITH absolute-positioned attribute"
            clear="Clear State"
            hint="The dropdown menu IS absolute-positioned"
            :options="states"
            v-model="state3"
            absolute-positioned
          />
        </div>
      </template>
    </FeatherExpansionPanel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FeatherExpansionPanel } from "@featherds/expansion";
import { FeatherSelect } from "../src";
import { ISelectItemType } from "../src/components/types";
import { useDraggable } from "@featherds/composables/events/Drag";
import states from "./states";

const state = ref(undefined) as unknown as ISelectItemType;
const state2 = ref(undefined) as unknown as ISelectItemType;
const state3 = ref(undefined) as unknown as ISelectItemType;

const {
  position: detailPos,
  beginDrag,
  continueDrag,
  endDrag,
} = useDraggable();
</script>

<style lang="scss" scoped>
.select-demo {
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .feather-panel {
    cursor: move;
    position: absolute;
    width: 44em;
    top: 8rem;
    left: 12rem;
    .panel-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  }
}
</style>
