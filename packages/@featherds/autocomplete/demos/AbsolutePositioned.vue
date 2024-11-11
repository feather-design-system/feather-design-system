<template>
  <div class="autocomplete-demo">
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
          <FeatherAutocomplete
            class="normal-select"
            data-ref-id="test2"
            label="WITHOUT absolute-positioned attribute"
            v-model="assignee"
            :loading="loading"
            :results="results"
            type="multi"
            @search="search"
            background
          ></FeatherAutocomplete>
          <FeatherAutocomplete
            class="normal-select"
            data-ref-id="test3"
            label="WITH absolute-positioned attribute"
            v-model="assignee2"
            :loading="loading"
            :results="results"
            type="multi"
            @search="search"
            background
            absolute-positioned
          ></FeatherAutocomplete>
        </div>
      </template>
    </FeatherExpansionPanel>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { FeatherExpansionPanel } from "@featherds/expansion";
import { FeatherAutocomplete } from "../src";
import { IAutocompleteItemType } from "@featherds/autocomplete";
import { useDraggable } from "@featherds/composables/events/Drag";

import {
  _setTimeout,
  TimeoutResult,
  _clearTimeout,
} from "@featherds/utils/setTimeout";

const {
  position: detailPos,
  beginDrag,
  continueDrag,
  endDrag,
} = useDraggable();

let timeout = ref(undefined) as unknown as TimeoutResult;

const names = ["Brian", "Charlie", "Jeff", "Scott"];

const assignee = ref(undefined) as unknown as IAutocompleteItemType;
const assignee2 = ref(undefined) as unknown as IAutocompleteItemType;
const loading = ref(false);
const results = ref([] as IAutocompleteItemType[]);

const search = async (qry: string) => {
  loading.value = true;
  _clearTimeout(timeout);

  timeout = _setTimeout(() => {
    results.value = names
      .filter((name) => name.toLowerCase().indexOf(qry.toLowerCase()) > -1)
      .map((name) => ({ _text: name }));
    loading.value = false;
  }, 500);
};
</script>

<style lang="scss" scoped>
.autocomplete-demo {
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
