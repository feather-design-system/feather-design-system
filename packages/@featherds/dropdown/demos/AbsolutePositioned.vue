<template>
  <div class="select-demo">
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
          <FeatherDropdown
            :standard="true"
            :value="nodeOption"
            class="my-dropdown"
            label="WITHOUT absolute-positioned attribute"
            hint="The dropdown menu IS NOT absolute-positioned"
          >
            <template #trigger="{ attrs, on }">
              <FeatherButton
                link
                href="#"
                v-bind="attrs"
                v-on="on"
                icon="Without Absolute Positioning"
              >
                <FeatherIcon :icon="NodesIcon" />
              </FeatherButton>
            </template>
            <FeatherDropdownItem>HTTP</FeatherDropdownItem>
            <FeatherDropdownItem>HTTPS</FeatherDropdownItem>
            <FeatherDropdownItem>SMTP</FeatherDropdownItem>
            <FeatherDropdownItem>Other</FeatherDropdownItem>
          </FeatherDropdown>
          <FeatherDropdown
            :standard="true"
            :value="powerOption"
            class="my-dropdown"
            label="WITH absolute-positioned attribute"
            hint="The dropdown menu IS absolute-positioned"
            absolute-positioned
          >
            <template #trigger="{ attrs, on }">
              <FeatherButton
                link
                href="#"
                v-bind="attrs"
                v-on="on"
                icon="With Absolute Positioning (standard)"
              >
                <FeatherIcon :icon="PowerIcon" />
              </FeatherButton>
            </template>
            <FeatherDropdownItem>Power Off</FeatherDropdownItem>
            <FeatherDropdownItem>Power On</FeatherDropdownItem>
            <FeatherDropdownItem>Reboot</FeatherDropdownItem>
          </FeatherDropdown>
          <FeatherDropdown
            :right="true"
            :value="powerOption"
            class="my-dropdown"
            absolute-positioned
          >
            <template #trigger="{ attrs, on }">
              <FeatherButton
                link
                href="#"
                v-bind="attrs"
                v-on="on"
                icon="With Absolute Positioning (right)"
              >
                <FeatherIcon :icon="NotificationsIcon" />
              </FeatherButton>
            </template>
            <FeatherDropdownItem>Notifications Off</FeatherDropdownItem>
            <FeatherDropdownItem>Notifications On</FeatherDropdownItem>
            <FeatherDropdownItem>Mute 4 hours</FeatherDropdownItem>
            <FeatherDropdownItem>Mute 8 hours</FeatherDropdownItem>
            <FeatherDropdownItem>Mute 24 hours</FeatherDropdownItem>
          </FeatherDropdown>
        </div>
      </template>
    </FeatherExpansionPanel>
  </div>
</template>

<script lang="ts" setup>
import { FeatherExpansionPanel } from "@featherds/expansion";
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import { FeatherDropdown, FeatherDropdownItem } from "../src";
import { useDraggable } from "@featherds/composables/events/Drag";

import Notifications from "@featherds/icon/action/Notifications";
import Nodes from "@featherds/icon/network/Nodes";
import Power from "@featherds/icon/network/Power";
import { computed, markRaw, ref } from "vue";

const {
  position: detailPos,
  beginDrag,
  continueDrag,
  endDrag,
} = useDraggable();

const NotificationsIcon = computed(() => {
  return markRaw(Notifications);
});

const NodesIcon = computed(() => {
  return markRaw(Nodes);
});

const PowerIcon = computed(() => {
  return markRaw(Power);
});

const nodeOption = ref("");
const powerOption = ref("");
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
      .my-dropdown {
        width: fit-content;
      }
    }
  }
}
</style>
