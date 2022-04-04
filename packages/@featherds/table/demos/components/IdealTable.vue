<template>
  <div>
    <table
      class="tc1 tr2 tc4 tr6 tc7"
      :class="{ condensed: condensed, striped: striped, hover: hover }"
      summary="A demo dataset to show feather-table"
    >
      <thead>
        <tr>
          <th scope="col" class="checkbox-cell">
            <FeatherCheckbox v-model="all" label="All" />
          </th>
          <FeatherSortHeader
            scope="col"
            property="Time"
            :sort="sortTime"
            v-on:sort-changed="sortChanged"
          >
            Time
          </FeatherSortHeader>
          <th scope="col">Text</th>
          <th scope="col">Icon</th>
          <FeatherSortHeader
            scope="col"
            property="Date"
            :sort="sortDate"
            v-on:sort-changed="sortChanged"
          >
            Date
          </FeatherSortHeader>
          <th scope="col">Currency</th>

          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr :class="{ selected: selected }" v-row-action="alert">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox1" label="Checkbox1">
              <slot></slot>
            </FeatherCheckbox>
          </td>
          <td>2:56:26 pm</td>
          <td>Example 1</td>
          <td class="icon-cell">
            <FeatherIcon :icon="icon"> </FeatherIcon>
          </td>
          <td>07/25/2016</td>
          <td>£ 178.45</td>

          <td class="icon-cell">
            <FeatherButton href="#" icon="Menu" @click="menuAction">
              <FeatherIcon :icon="ellipsis"> </FeatherIcon>
            </FeatherButton>
          </td>
        </tr>
        <tr :class="{ selected: selected }" v-row-action="alert">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox2" label="Checkbox2">
              <slot></slot>
            </FeatherCheckbox>
          </td>
          <td>2:23:06 pm</td>
          <td>Example 2</td>
          <td class="icon-cell">
            <FeatherIcon :icon="icon"> </FeatherIcon>
          </td>
          <td>04/12/2006</td>
          <td>£ 17.00</td>

          <td class="icon-cell">
            <FeatherButton href="#" icon="Menu" @click="menuAction">
              <FeatherIcon :icon="ellipsis"> </FeatherIcon>
            </FeatherButton>
          </td>
        </tr>
        <tr v-row-action="alert">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox3" label="Checkbox3">
              <slot></slot>
            </FeatherCheckbox>
          </td>
          <td>6:09:46 am</td>
          <td>Example 3</td>
          <td class="icon-cell">
            <FeatherIcon :icon="icon"> </FeatherIcon>
          </td>
          <td>09/09/2020</td>
          <td>£ 45.00</td>

          <td class="icon-cell">
            <FeatherButton href="#" icon="Menu" @click="menuAction">
              <FeatherIcon :icon="ellipsis"> </FeatherIcon>
            </FeatherButton>
          </td>
        </tr>
        <tr v-row-action="alert">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox4" label="Checkbox4">
              <slot></slot>
            </FeatherCheckbox>
          </td>
          <td>2:56:23 pm</td>
          <td>Example 4</td>
          <td class="icon-cell">
            <FeatherIcon :icon="icon"> </FeatherIcon>
          </td>
          <td>05/10/1987</td>
          <td>£ 6.18</td>

          <td class="icon-cell">
            <FeatherButton href="#" icon="Menu" @click="menuAction">
              <FeatherIcon :icon="ellipsis"> </FeatherIcon>
            </FeatherButton>
          </td>
        </tr>
        <tr v-row-action="alert">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox5" label="Checkbox5">
              <slot></slot>
            </FeatherCheckbox>
          </td>
          <td>2:48:06 pm</td>
          <td>Example 5</td>
          <td class="icon-cell">
            <FeatherIcon :icon="icon"> </FeatherIcon>
          </td>
          <td>03/03/1994</td>
          <td>£ 44.44</td>

          <td class="icon-cell">
            <FeatherButton href="#" icon="Menu" @click="menuAction">
              <FeatherIcon :icon="ellipsis"> </FeatherIcon>
            </FeatherButton>
          </td>
        </tr>
      </tbody>
    </table>
    <FeatherPagination :total="100" :page-size="10" :modelValue="1" />
  </div>
</template>
<script lang="ts">
import { FeatherIcon } from "@featherds/icon";
import { FeatherPagination } from "@featherds/pagination";
import Face from "@featherds/icon/action/AccountCircle";
import MoreVert from "@featherds/icon/navigation/MoreVert";
import { defineComponent } from "vue";

import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherButton } from "@featherds/button";
import { FeatherSortHeader, SORT, RowAction } from "../../src";

export default defineComponent({
  directives: { RowAction },
  props: {
    condensed: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
    hover: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      icon: Face,
      ellipsis: MoreVert,
      checkbox1: true,
      all: false,
      checkbox2: false,
      checkbox3: true,
      checkbox4: false,
      checkbox5: true,
      sortTime: SORT.ASCENDING,
      sortDate: SORT.NONE,
      sortIcon: SORT.NONE,
    };
  },
  methods: {
    sortChanged: function (sortObj: { value: SORT; property: string }) {
      //You will want to do any actual data sorting here
      (this as unknown as Record<string, unknown>)[`sort${sortObj.property}`] =
        sortObj.value;
    },
    alert() {
      console.log("heheheh");
    },
    menuAction() {
      console.log("MENU");
    },
  },
  components: {
    FeatherIcon,
    FeatherCheckbox,
    FeatherSortHeader,
    FeatherButton,
    FeatherPagination,
  },
});
</script>
<style lang="scss" scoped>
@import "../../scss/table";
table {
  width: 100%;
  @include table();
  @include row-select();
  &.hover {
    @include row-hover();
  }
  &.condensed {
    @include table-condensed();
  }
  &.striped {
    @include row-striped();
  }
}
</style>
