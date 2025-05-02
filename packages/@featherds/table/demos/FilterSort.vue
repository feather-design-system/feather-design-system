<template>
  <div class="filter-sort-demo">
    <div class="properties">
      <div>
        <h5>Table Properties</h5>
        <FeatherCheckbox v-model="condensed">Condensed</FeatherCheckbox>
        <FeatherCheckbox v-model="striped">Striped</FeatherCheckbox>
      </div>
      <div>
        <FeatherRadioGroup :label="'Animation'" v-model="selectedAnimation">
          <FeatherRadio
            v-for="animation in animations"
            :value="animation.value"
            :key="animation.name"
            >{{ animation.name }}</FeatherRadio
          >
        </FeatherRadioGroup>
      </div>
    </div>

    <div>
      <FeatherInput
        label="Filter"
        hint="This is a global filter for the table below"
        clear="Clear the filter"
        class="search-filter"
        @update:modelValue="filterChange"
        :modelValue="searchFilter"
      >
      </FeatherInput>
    </div>
    <table
      class="tc1 tl2 tl3"
      :class="{ condensed: condensed, striped: striped }"
    >
      <caption>
        A sortable, filterable table
      </caption>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.property">
            <FeatherSortHeader
              v-if="column.sortable"
              :property="column.property"
              :sort="sortDirection(column.property)"
              @sort-changed="sortChanged"
              @keydown="handleKeydown($event, column.property)"
            >
              {{ column.title }}
            </FeatherSortHeader>
            <span v-else>{{ column.title }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup :name="selectedAnimation">
          <tr v-for="i in filteredItems" :key="i.id">
            <td>{{ i.id }}</td>
            <td>{{ i.name }}</td>
            <td>{{ i.dept }}</td>
            <td>{{ i.location }}</td>
          </tr>
        </TransitionGroup>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { FeatherSortHeader, SORT } from "@featherds/table";
import { FeatherCheckbox } from "@featherds/checkbox";
import { FeatherInput } from "@featherds/input";
import { FeatherRadioGroup, FeatherRadio } from "@featherds/radio";

type Employee = {
  id: number;
  name: string;
  dept: string;
  location: string;
};

type Column = {
  title: string;
  property: string;
  sortable: boolean;
};

type Animation = {
  name: string;
  value: string;
};
const animations = ref<Animation[]>([
  { name: "flip", value: "flip" },
  { name: "translateX", value: "translateX" },
  { name: "translateY", value: "translateY" },
  { name: "scale", value: "scaleIt" },
  { name: "none", value: "none" },
]);

const selectedAnimation = ref(animations.value[0]!.value);
const condensed = ref(false);
const striped = ref(false);

const activeSort = ref<{ property: keyof Employee; direction: SORT }>({
  property: "name",
  direction: SORT.NONE,
});
const nameSort = ref(SORT.NONE);
const deptSort = ref(SORT.NONE);
const locationSort = ref(SORT.NONE);

const searchFilter = ref("");

const items = ref<Employee[]>([
  { id: 1, name: "John Doe", dept: "Marketing", location: "Boston" },
  { id: 2, name: "Susan Boston", dept: "Accounting", location: "Dallas" },
  { id: 3, name: "Dallas Smith", dept: "Management", location: "Raleigh" },
  { id: 4, name: "Jane Smith", dept: "Engineering", location: "Boston" },
  { id: 5, name: "John Johnson", dept: "Engineering", location: "New York" },
  { id: 6, name: "Jane White", dept: "Design", location: "Dallas" },
  { id: 7, name: "Sadie Boswell", dept: "Design", location: "Dallas" },
]);
const filteredItems = ref<Employee[]>([...items.value]);

const columns = reactive<Column[]>([
  {
    title: "Id",
    property: "id",
    sortable: false,
  },
  {
    title: "Name",
    property: "name",
    sortable: true,
  },
  {
    title: "Department",
    property: "dept",
    sortable: true,
  },
  {
    title: "Location",
    property: "location",
    sortable: true,
  },
  {
    title: "",
    property: "actions",
    sortable: false,
  },
]);

const handleKeydown = (event: KeyboardEvent, property: string) => {
  if (event.key === "Enter" || event.key === " ") {
    const sortDir = new Array(SORT.ASCENDING, SORT.DESCENDING, SORT.NONE);
    const currentDir = sortDir.indexOf(sortDirection(property));
    const direction = sortDir[(currentDir + 1) % sortDir.length];

    event.preventDefault();

    if (direction) sortChanged({ property, value: direction });
  }
};

const sortDirection = (property: string) => {
  switch (property) {
    case "name":
      return nameSort.value;
    case "dept":
      return deptSort.value;
    case "location":
      return locationSort.value;
    default:
      return SORT.NONE;
  }
};

const sortItems = (property: keyof Employee, direction: SORT) => {
  activeSort.value = { property, direction };
  console.log("property: ", property, " | direction: ", direction);

  if (activeSort.value.direction === SORT.NONE) {
    filteredItems.value = [...filteredItems.value];
    return;
  }

  filteredItems.value = [...filteredItems.value].sort((a, b) => {
    if (direction === SORT.ASCENDING) {
      return (a[property] as string).localeCompare(b[property] as string);
    } else {
      return (b[property] as string).localeCompare(a[property] as string);
    }
  });
};

const sortChanged = (sort: { property: string; value: SORT }) => {
  console.log("sortChanged", sort);
  console.log("items", items.value);

  switch (sort.property) {
    case "name":
      nameSort.value = sort.value;
      break;
    case "dept":
      deptSort.value = sort.value;
      break;
    case "location":
      locationSort.value = sort.value;
      break;
  }
  console.log("calling sortItems");
  sortItems(sort.property as keyof Employee, sort.value);
};

const filterChange = (value: string | number | undefined) => {
  console.log(value);
  if (items.value == undefined) return;
  switch (typeof value) {
    case "string":
      filteredItems.value = items.value.filter((item) => {
        return (
          item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          item.dept.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
          item.location.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
      });
  }
  if (activeSort.value.property && activeSort.value.direction != SORT.NONE) {
    sortItems(activeSort.value.property, activeSort.value.direction);
  }
};
</script>

<style lang="scss" scoped>
@use "@featherds/table/scss/table" as table;

.filter-sort-demo {
  --animation-duration: 0.3s;
  interpolate-size: allow-keywords;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .properties {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 1rem;
    h5 {
      padding-bottom: 1em;
    }
  }
  .search-filter {
    width: 20rem;
  }
  table {
    @include table.table();
    width: 100%;
    &.condensed {
      @include table.table-condensed();
    }
    &.striped {
      @include table.row-striped();
    }
    // Add transitions for rows and cells
    tbody {
      tr {
        transition: all var(--animation-duration) ease-in-out;
        background-color: var(--feather-background);

        &:not(.none):nth-child(2) {
          transition: all calc(var(--animation-duration) + 0.125s) ease-in-out;
        }
        &:not(.none):nth-child(3) {
          transition: all calc(var(--animation-duration) + 0.25s) ease-in-out;
        }
        &:not(.none):nth-child(4) {
          transition: all calc(var(--animation-duration) + 0.375s) ease-in-out;
        }
        &:not(.none):nth-child(5) {
          transition: all calc(var(--animation-duration) + 0.5s) ease-in-out;
        }
        &:not(.none):nth-child(6) {
          transition: all calc(var(--animation-duration) + 0.625s) ease-in-out;
        }
        &:not(.none):nth-child(7) {
          transition: all calc(var(--animation-duration) + 0.75s) ease-in-out;
        }
        &:not(.none):nth-child(8) {
          transition: all calc(var(--animation-duration) + 0.875s) ease-in-out;
        }
        &:not(.none):nth-child(9) {
          transition: all calc(var(--animation-duration) + 1s) ease-in-out;
        }

        // Row enter/leave transitions
        &.flip-enter-active {
          animation: flipInX var(--animation-duration) ease-in-out backwards;
          background-color: var(--feather-surface);
          border: 1px solid var(--feather-background);
        }
        &.flip-leave-active {
          animation: flipInX var(--animation-duration) ease-in-out forwards;
          background-color: var(--feather-surface);
        }
        &.flip-enter-from,
        &.flip-leave-to {
          animation: flipOutX var(--animation-duration) ease-in-out forwards;
        }
        &.flip-leave-to {
          transform: translate3d(0);
        }
        // Row enter/leave transitions
        &.translateX-enter-active {
          transform: translateX(-5rem);
          background-color: var(--feather-surface);
          border: 1px solid var(--feather-background);
        }
        &.translateX-leave-active {
          transform: translateX(-5rem);
          opacity: 0;
        }
        &.translateX-enter-from,
        &.translateX-leave-to {
          opacity: 0;
        }
        &.translateX-leave-to {
          transform: translateX(10rem);
        }
        &.translateX-enter-active,
        &.translateX-leave-active {
          display: absolute;
        }
        // Row enter/leave transitions
        &.translateY-enter-active {
          transform: translateY(5rem);
          background-color: var(--feather-surface);
          border: 1px solid var(--feather-background);
        }
        &.translateY-leave-active {
          transform: translateY(-5rem);
        }
        &.translateY-enter-from,
        &.translateY-leave-to {
          transform: translateY(5rem);
          opacity: 0;
        }
        &.translateY-leave-to {
          transform: translateY(5rem);
        }
        &.translateY-enter-active,
        &.translateY-leave-active {
          display: absolute;
        }

        // Row enter/leave transitions
        &.scaleIt-enter-active {
          animation: scaleIn var(--animation-duration) ease-in-out backwards;
          background-color: var(--feather-surface);
        }
        &.scaleIt-leave-active {
          animation: scaleIn var(--animation-duration) ease-in-out forwards;
          background-color: var(--feather-surface);
        }
        &.scaleIt-enter-from,
        &.scaleIt-leave-to {
          animation: scaleOut var(--animation-duration) ease-in-out forwards;
        }
        &.scaleIt-leave-to {
          transform: translate3d(0);
          transform: scale(0);
        }
      }
    }
    th,
    td {
      white-space: nowrap;
      padding-inline: min(0.5rem, 5%);
    }
  }
}

@keyframes flipInX {
  0% {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  100% {
    transform: perspective(400px) rotateX(0);
    opacity: 1;
  }
}
@keyframes flipOutX {
  0% {
    transform: perspective(400px) rotateX(0);
    opacity: 1;
  }
  100% {
    transform: perspective(400px) rotateX(90deg);
    transition: rotateX 1s ease;
    opacity: 0;
  }
}
@keyframes scaleIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scaleOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .filter-sort-demo {
    --animation-duration: 0s;
    interpolate-size: unset;

    tbody {
      tr {
        transition: unset;

        &.flip-enter-active,
        &.flip-leave-active,
        &.flip-enter-from,
        &.flip-leave-to,
        &.translateX-enter-active,
        &.translateX-leave-active,
        &.translateX-enter-from,
        &.translateX-leave-to,
        &.translateY-enter-active,
        &.translateY-leave-active,
        &.translateY-enter-from,
        &.translateY-leave-to,
        &.scaleIt-enter-active,
        &.scaleIt-leave-active,
        &.scaleIt-enter-from,
        &.scaleIt-leave-to {
          animation: none;
        }
        &:nth-child(2) {
          transition: none;
        }
        &:nth-child(3) {
          transition: none;
        }
        &:nth-child(4) {
          transition: none;
        }
        &:nth-child(5) {
          transition: none;
        }
        &:nth-child(6) {
          transition: none;
        }
        &:nth-child(7) {
          transition: none;
        }
        &:nth-child(8) {
          transition: none;
        }
        &:nth-child(9) {
          transition: none;
        }
      }
    }
  }
}
</style>
