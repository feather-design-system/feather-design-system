<template>
  <div class="select-demo">
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
          <p>
            <FeatherPopover
              :pointer-alignment="alignment"
              :placement="placement"
            >
              <template #default>
                <div>
                  <h4>Test heading</h4>

                  <p>lorem ipsum or something</p>
                  <a href="#"> random link i guess</a>
                </div>
              </template>
              <template #trigger="{ attrs, on }">
                <FeatherButton
                  v-bind="attrs"
                  v-on="on"
                  class=".more-info"
                  type="button"
                  text
                  >Disembodied Popover
                </FeatherButton>
              </template>
            </FeatherPopover>
          </p>
          <p>
            <FeatherPopover
              :pointer-alignment="alignment"
              :placement="placement"
              :absolute-positioned="true"
            >
              <template #default>
                <div>
                  <h4>Test heading</h4>

                  <p>lorem ipsum or something</p>
                  <a href="#"> random link i guess</a>
                </div>
              </template>
              <template #trigger="{ attrs, on }">
                <FeatherButton
                  v-bind="attrs"
                  v-on="on"
                  class=".more-info"
                  type="button"
                  text
                  >Absolute Positioned
                </FeatherButton>
              </template>
            </FeatherPopover>
          </p>
        </div>
      </template>
    </FeatherExpansionPanel>
  </div>
</template>

<script lang="ts" setup>
import { FeatherPopover } from "./../src";
import { PointerAlignment, PopoverPlacement } from "./../src";
import { FeatherExpansionPanel } from "@featherds/expansion";
import { FeatherButton } from "@featherds/button";
import { useDraggable } from "@featherds/composables/events/Drag";
import { ref } from "vue";

const {
  position: detailPos,
  beginDrag,
  continueDrag,
  endDrag,
} = useDraggable();

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
    width: 32em;
    top: 8rem;
    left: 12rem;
    .panel-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      .more-info {
        margin-top: 1rem;
      }
    }
  }
}
</style>
