<template>
  <div>
    <table class="tr2 tc5" aria-label="Users table">
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
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in page" :key="item.joined">
          <td>{{ item.name }}</td>
          <td>{{ item.balance }}</td>
          <td>{{ item.location }}</td>
          <td>{{ getDateFormat(item.joined) }}</td>
          <td class="icon-cell" :class="item.status">
            <FeatherIcon :icon="getIcon(item.status)" :title="item.status" />
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
import { FeatherSortHeader, SORT } from "@featherds/table";
import { FeatherPagination } from "@featherds/pagination";
import rawData from "./table-data";
import { markRaw } from "vue";
export default {
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      total: rawData.length,
      sortProp: "name", //default
      sortDirection: SORT.ASCENDING,
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
    updatePageSize(v) {
      this.pageSize = v;
    },
  },
  components: {
    FeatherIcon,
    FeatherSortHeader,
    FeatherPagination,
  },
};
</script>
<style lang="scss" scoped>
@import "@featherds/table/scss/table";
@import "@featherds/styles/themes/variables";
table {
  width: 100%;
  @include table();
  @include row-striped();
  .icon-cell {
    color: var($secondary-text-on-surface);
    &.Online {
      color: var($success);
    }
  }
  .small-col {
    width: 15%;
  }
}
</style>
