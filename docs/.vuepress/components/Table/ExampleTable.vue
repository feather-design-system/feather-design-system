<template>
  <section>
    <FeatherCheckbox v-model="striped">Striped</FeatherCheckbox>
    <FeatherCheckbox v-model="condensed">Condensed</FeatherCheckbox>
    <FeatherCheckbox v-model="hover">Hover</FeatherCheckbox>
    <FeatherCheckbox v-model="selected">Selected</FeatherCheckbox>
    <div>
      <table
        class="tc1 tr2 tc4 tr6"
        :class="{ condensed: condensed, striped: striped, hover: hover }"
      >
        <thead>
          <tr>
            <th class="checkbox-cell">
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
          </tr>
        </thead>
        <tbody>
          <tr :class="{ selected: selected }">
            <td class="checkbox-cell">
              <FeatherCheckbox v-model="checkbox1" label="Checkbox1" />
            </td>
            <td>2:56:26 pm</td>
            <td>Example 1</td>
            <td class="icon-cell">
              <FeatherIcon :icon="icon"> </FeatherIcon>
            </td>
            <td>07/25/2016</td>
            <td>£ 178.45</td>
          </tr>
          <tr>
            <td class="checkbox-cell">
              <FeatherCheckbox v-model="checkbox2" label="Checkbox2" />
            </td>
            <td>2:23:06 pm</td>
            <td>Example 2</td>
            <td class="icon-cell">
              <FeatherIcon :icon="icon"> </FeatherIcon>
            </td>
            <td>04/12/2006</td>
            <td>£ 17.00</td>
          </tr>
        </tbody>
      </table>
      <FeatherPagination :total="100" :page-size="10" :modelValue="1" />
    </div>
  </section>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import { FeatherPagination } from "@featherds/pagination";
import Face from "@featherds/icon/actions/AccountCircle";
import { markRaw } from "vue";

import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherSortHeader, SORT } from "@featherds/table";

export default {
  data() {
    return {
      striped: false,
      condensed: false,
      hover: false,
      selected: false,
      icon: (Face),
      all: false,
      checkbox1: true,
      checkbox2: false,
      sortTime: SORT.ASCENDING,
      sortDate: SORT.NONE,
      sortIcon: SORT.NONE,
    };
  },
  methods: {
    sortChanged: function (sortObj) {
      //You will want to do any actual data sorting here
      this["sort" + sortObj.property] = sortObj.value;
    },
  },
  components: {
    FeatherIcon,
    FeatherCheckbox,
    FeatherSortHeader,
    FeatherPagination,
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/table/scss/table";
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
