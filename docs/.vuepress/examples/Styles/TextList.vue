<template>
  <div class="col">
    <h4>{{ title }}</h4>
    <ul>
      <li v-for="row in rows" :key="row" :class="getClass(row)">
        {{ getText(row) }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    background: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    on: {
      type: String,
      required: true,
    },
  },
  computed: {
    rows() {
      return ["primary", "secondary", "disabled"]
        .map((level) => {
          return `${level}-text-on-${this.on}`;
        })
        .concat([`border-on-${this.on}`, `border-light-on-${this.on}`]);
    },
  },
  methods: {
    getClass(color) {
      return `bg-${this.background} ${color}`;
    },
    getText(color) {
      return `$${color}`;
    },
  },
};
</script>
<style lang="scss" scoped>
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  padding: 8px;
}
</style>
