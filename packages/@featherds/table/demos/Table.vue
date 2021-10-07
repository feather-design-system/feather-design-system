<template>
  <table id="feather-table" class="tr2 tr4 tr5 tr6 tc8 tc9">
    <caption>
      A demo dataset to show feather-table
    </caption>
    <thead>
      <tr>
        <th scope="col">Empty Row</th>
        <FeatherSortHeader
          scope="col"
          property="Time"
          :sort="sortTime"
          v-on:sort-changed="sortChanged"
        >
          Time
        </FeatherSortHeader>
        <th scope="col">Text</th>
        <th scope="col">Percentage</th>
        <th scope="col">Integer</th>
        <th scope="col">Floating point</th>
        <th scope="col">Zip</th>
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
        <th scope="col">Checkbox</th>
        <th scope="col">Badge</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td>2:56:26 pm</td>
        <td>Example 1</td>
        <td>79.80 %</td>
        <td>33</td>
        <td>-33.33</td>
        <td>3461973144</td>
        <td class="icon-cell">
          <FeatherIcon :icon="icon" />
        </td>
        <td>07/25/2016</td>
        <td>£ 178.45</td>
        <td class="checkbox-cell">
          <feather-checkbox v-model="checkbox1" label="Checkbox1">
            <slot></slot>
          </feather-checkbox>
        </td>
        <td>success</td>
      </tr>
      <tr>
        <td></td>
        <td>2:23:06 pm</td>
        <td>Example 2</td>
        <td>12.60 %</td>
        <td>66</td>
        <td>66.67</td>
        <td>1216545664</td>
        <td class="icon-cell">
          <FeatherIcon :icon="icon" />
        </td>
        <td>04/12/2006</td>
        <td>£ 17.00</td>
        <td class="checkbox-cell">
          <feather-checkbox v-model="checkbox2" label="Checkbox2">
            <slot></slot>
          </feather-checkbox>
        </td>
        <td>failure</td>
      </tr>
      <tr>
        <td></td>
        <td>6:09:46 am</td>
        <td>Example 3</td>
        <td>1.40 %</td>
        <td>22</td>
        <td>23.23</td>
        <td>9466784264</td>
        <td class="icon-cell">
          <FeatherIcon :icon="icon" />
        </td>
        <td>09/09/2020</td>
        <td>£ 45.00</td>
        <td class="checkbox-cell">
          <feather-checkbox v-model="checkbox3" label="Checkbox3">
            <slot></slot>
          </feather-checkbox>
        </td>
        <td>success</td>
      </tr>
      <tr>
        <td></td>
        <td>2:56:23 pm</td>
        <td>Example 4</td>
        <td>100.00 %</td>
        <td>666</td>
        <td>11.98</td>
        <td>6666666666</td>
        <td class="icon-cell">
          <FeatherIcon :icon="icon" />
        </td>
        <td>05/10/1987</td>
        <td>£ 6.18</td>
        <td class="checkbox-cell">
          <feather-checkbox v-model="checkbox4" label="Checkbox4">
            <slot></slot>
          </feather-checkbox>
        </td>
        <td>success</td>
      </tr>
      <tr>
        <td></td>
        <td>2:48:06 pm</td>
        <td>Example 5</td>
        <td>66.70 %</td>
        <td>80,085</td>
        <td>1,234.57</td>
        <td>3461973144</td>
        <td class="icon-cell">
          <FeatherIcon :icon="icon" />
        </td>
        <td>03/03/1994</td>
        <td>£ 44.44</td>
        <td class="checkbox-cell">
          <feather-checkbox v-model="checkbox5" label="Checkbox5">
            <slot></slot>
          </feather-checkbox>
        </td>
        <td>success</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Face from "@featherds/icon/actions/AccountCircle";
import { markRaw } from "vue";

import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherSortHeader, SORT } from "../src";

export default {
  data: function () {
    return {
      icon: markRaw(Face),
      checkbox1: true,
      checkbox2: false,
      checkbox3: true,
      checkbox4: false,
      checkbox5: true,
      sortTime: SORT.ASCENDING,
      sortDate: SORT.NONE,
    };
  },
  methods: {
    sortChanged: function (sortObj) {
      /*
        sortObj returned will be of format;
        {
          property,
          value
        }
      */

      //You will want to do any actual data sorting here
      this[`sort${sortObj.property}`] = sortObj.value;
    },
  },
  components: {
    FeatherIcon,
    FeatherCheckbox,
    FeatherSortHeader,
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/table";
table {
  @include table();
}
</style>
