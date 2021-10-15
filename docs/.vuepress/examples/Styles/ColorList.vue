<template>
  <div class="col">
    <h4>{{ title }}</h4>
    <ul>
      <li v-for="color in vars" :key="color" :class="getClass(color)">
        {{ getText(color) }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    vars: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    getClass(color) {
      return `bg-${color}`;
    },
    getText(color) {
      return `$${color}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  padding: 8px;
  color: var($primary-text-on-color);
  &.bg-surface,
  &.bg-background {
    color: var($secondary-text-on-surface);
  }
  &.bg-warning {
    color: var($secondary-text-on-warning);
  }
}
</style>
