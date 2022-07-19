<template>
  <div>
    <table class="tr2 tc5 tc6" aria-label="Users table">
      <thead>
        <tr>
          <FeatherSortHeader
            scope="col"
            property="name"
            :sort="getSorting('name')"
            v-on:sort-changed="sortChanged"
          >
            Name
          </FeatherSortHeader>
          <FeatherSortHeader
            scope="col"
            property="balance"
            :sort="getSorting('balance')"
            v-on:sort-changed="sortChanged"
          >
            Balance
          </FeatherSortHeader>
          <th scope="col" class="small-col">Location of user</th>
          <FeatherSortHeader
            scope="col"
            property="joined"
            :sort="getSorting('joined')"
            v-on:sort-changed="sortChanged"
          >
            Joined
          </FeatherSortHeader>
          <th scope="col">Status</th>
          <th scope="col">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in page"
          :key="item.joined"
          v-row-action="fakeRowAction"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.balance }}</td>
          <td>{{ item.location }}</td>
          <td>{{ getDateFormat(item.joined) }}</td>
          <td class="icon-cell" :class="item.status">
            <FeatherIcon :icon="getIcon(item.status)" :title="item.status" />
          </td>
          <td>
            <FeatherDropdown>
              <template v-slot:trigger="{ attrs, on }">
                <FeatherButton icon="Item Actions" v-bind="attrs" v-on="on">
                  <FeatherIcon :icon="menu" />
                </FeatherButton>
              </template>
              <FeatherDropdownItem @click="fakeAction">
                Edit <span class="sr-only"> for {{ item.name }}</span>
              </FeatherDropdownItem>
              <FeatherDropdownItem @click="fakeAction">
                Delete <span class="sr-only"> for {{ item.name }}</span>
              </FeatherDropdownItem>
            </FeatherDropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <FeatherPagination
      :total="total"
      :page-size="pageSize"
      v-model="pageNumber"
      @update:pageSize="updatePageSize"
    />
  </div>
</template>
<script>
import { FeatherIcon } from "@featherds/icon";
import Available from "@featherds/icon/status/Available";
import Unavailable from "@featherds/icon/status/Unavailable";
import Menu from "@featherds/icon/navigation/MoreVert";
import { FeatherSortHeader, SORT, RowAction } from "@featherds/table";
import { FeatherPagination } from "@featherds/pagination";
import { FeatherButton } from "@featherds/button";
import { FeatherDropdown, FeatherDropdownItem } from "@featherds/dropdown";
import rawData from "./table-data";
import { markRaw } from "vue";
export default {
  directives: {
    RowAction,
  },
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      total: rawData.length,
      sortProp: "name", //default
      sortDirection: SORT.ASCENDING,
      menu: markRaw(Menu),
    };
  },
  computed: {
    page() {
      const start = (this.pageNumber - 1) * this.pageSize;
      let array = rawData;
      if (this.sortDirection !== SORT.NONE) {
        array = rawData.slice(0).sort((a, b) => {
          if (a[this.sortProp] < b[this.sortProp]) {
            return this.sortDirection === SORT.ASCENDING ? -1 : 1;
          }
          if (a[this.sortProp] > b[this.sortProp]) {
            return this.sortDirection === SORT.ASCENDING ? 1 : -1;
          }
          return 0;
        });
      }
      return array.slice(start, start + this.pageSize);
    },
  },
  methods: {
    fakeAction() {
      alert("Fake action");
    },
    fakeRowAction() {
      alert("Fake Row action");
    },
    sortChanged(e) {
      this.pageNumber = 1;
      this.sortProp = e.property;
      this.sortDirection = e.value;
    },
    getSorting(prop) {
      if (prop === this.sortProp) {
        return this.sortDirection;
      }
      return SORT.NONE;
    },
    getDateFormat(date) {
      return new Date(parseInt(date, 10)).toDateString();
    },
    getIcon(status) {
      if (status.toLowerCase() === "online") {
        return markRaw(Available);
      }
      return markRaw(Unavailable);
    },
    swallow() {},
    updatePageSize(v) {
      this.pageSize = v;
    },
  },
  components: {
    FeatherIcon,
    FeatherSortHeader,
    FeatherPagination,
    FeatherButton,
    FeatherDropdown,
    FeatherDropdownItem,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/table/scss/table";
@import "@featherds/styles/themes/variables";
@import "@featherds/styles/mixins/typography";
table {
  width: 100%;
  @include table();
  @include row-hover();
  .icon-cell {
    color: var($secondary-text-on-surface);
    &.Online {
      color: var($success);
    }
  }
  .small-col {
    width: 15%;
  }
  .sr-only {
    @include screen-reader;
  }
}
</style>
