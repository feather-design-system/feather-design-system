<template>
  <div class="date-input-demo">
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
          <FeatherDateInput
            v-model="from"
            class="my-date-input"
            label="WITHOUT absolute-positioned attribute"
            hint="The date input menu IS NOT absolute-positioned"
          />
          <FeatherDateInput
            v-model="to"
            class="my-date-input"
            label="WITH absolute-positioned attribute"
            hint="The date input menu IS absolute-positioned"
            absolute-positioned
          />
        </div>
      </template>
    </FeatherExpansionPanel>
  </div>
</template>

<script lang="ts" setup>
import { FeatherExpansionPanel } from "@featherds/expansion";
import { FeatherDateInput } from "../src";
import { useDraggable } from "@featherds/composables/events/Drag";
import { ref } from "vue";

const {
  position: detailPos,
  beginDrag,
  continueDrag,
  endDrag,
} = useDraggable();

const from = ref(undefined) as unknown as Date;
const to = ref(undefined) as unknown as Date;
</script>

<style lang="scss" scoped>
.date-input-demo {
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
      .my-date-input {
        width: 26em;
      }
    }
  }
}
</style>
