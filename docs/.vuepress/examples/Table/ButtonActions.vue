<template>
  <section>
    <table class="tc1 tr2 tr5 tr6">
      <thead>
        <tr>
          <th class="checkbox-cell">
            <FeatherCheckbox v-model="all" label="All" />
          </th>
          <th>Time</th>
          <th scope="col">Text</th>
          <th>Date</th>
          <th scope="col">Currency</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-row-action="actionRow">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox1" label="Checkbox1" />
          </td>
          <td>2:56:26 pm</td>
          <td>Example 1</td>
          <td>07/25/2016</td>
          <td>£ 178.45</td>

          <td>
            <FeatherButton
              icon="Backup for Example 1"
              @click="action('backup')"
            >
              <FeatherIcon :icon="backup" />
            </FeatherButton>
            <FeatherButton
              icon="View Source of Example 1"
              @click="action('view source')"
            >
              <FeatherIcon :icon="code" />
            </FeatherButton>
            <FeatherDropdown>
              <template v-slot:trigger="{ attrs, on }">
                <FeatherButton
                  icon="Item Actions for Example 1"
                  v-on="on"
                  v-bind="attrs"
                >
                  <FeatherIcon :icon="menu" />
                </FeatherButton>
              </template>

              <FeatherDropdownItem @click="action('edit')">
                Edit <span class="sr-only"> for Example 1</span>
              </FeatherDropdownItem>
              <FeatherDropdownItem @click="action('delete')">
                Delete <span class="sr-only"> for Example 1</span>
              </FeatherDropdownItem>
            </FeatherDropdown>
          </td>
        </tr>
        <tr v-row-action="actionRow">
          <td class="checkbox-cell">
            <FeatherCheckbox v-model="checkbox2" label="Checkbox2" />
          </td>
          <td>2:23:06 pm</td>
          <td>Example 2</td>
          <td>04/12/2006</td>
          <td>£ 17.00</td>

          <td>
            <FeatherButton
              icon="Backup for Example 2"
              @click="action('backup')"
            >
              <FeatherIcon :icon="backup" />
            </FeatherButton>
            <FeatherButton
              icon="View Source of Example 2"
              @click="action('view source')"
            >
              <FeatherIcon :icon="code" />
            </FeatherButton>
            <FeatherDropdown>
              <template v-slot:trigger="{ attrs, on }">
                <FeatherButton
                  icon="Item Actions for Example 2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <FeatherIcon :icon="menu" />
                </FeatherButton>
              </template>
              <FeatherDropdownItem @click="action('edit')">
                Edit <span class="sr-only"> for Example 2</span>
              </FeatherDropdownItem>
              <FeatherDropdownItem @click="action('delete')">
                Delete <span class="sr-only"> for Example 2</span>
              </FeatherDropdownItem>
            </FeatherDropdown>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import menu from "@featherds/icon/navigation/MoreVert";
import code from "@featherds/icon/action/Code";
import backup from "@featherds/icon/action/AddComment";
import { FeatherDropdown, FeatherDropdownItem } from "@featherds/dropdown";
import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherButton } from "@featherds/button";
import { FeatherSortHeader, RowAction } from "@featherds/table";
import { markRaw } from "vue";

export default {
  directives: {
    RowAction,
  },
  data() {
    return {
      menu: markRaw(menu),
      code: markRaw(code),
      backup: markRaw(backup),
      all: false,
      checkbox1: true,
      checkbox2: false,
    };
  },
  methods: {
    action(str) {
      console.log("ACTION " + str);
    },
    actionRow() {
      console.log("ACTION on the row");
    },
  },
  components: {
    FeatherIcon,
    FeatherCheckbox,
    FeatherButton,
    FeatherDropdown,
    FeatherDropdownItem,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/table/scss/table";
@import "@featherds/styles/mixins/typography";
table {
  width: 100%;
  @include table();
  @include row-select();
  @include row-hover();
  tbody tr {
    cursor: pointer;
  }

  .sr-only {
    @include screen-reader;
  }
}
</style>
