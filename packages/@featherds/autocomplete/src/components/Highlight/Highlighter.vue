<template>
  <span>
    <span>{{ beginning }}</span>
    <span class="highlight" v-if="highlighted">{{ highlighted }}</span>
    <span v-if="end">{{ end }}</span>
  </span>
</template>

<script lang="ts">
import Highlight from "./HighlightProps";
import Highlighter from "./HighlighterProps";
import { defineComponent } from "vue";
export default defineComponent({
  mixins: [],
  props: {
    text: {
      type: String,
      required: true,
    },
    ...Highlight,
    ...Highlighter,
  },
  computed: {
    index() {
      if (this.query && this.query.length === 0) {
        return -1;
      }
      if (this.query && this.highlight) {
        switch (this.highlight.toLowerCase()) {
          case "ignore-case":
            return this.text.toLowerCase().indexOf(this.query.toLowerCase());
          default:
            return -1;
        }
      }
      return -1;
    },
    beginning() {
      if (this.index === -1) {
        return this.text;
      }
      return this.text.slice(0, this.index);
    },
    highlighted() {
      if (this.index === -1 || !this.query) {
        return;
      }
      return this.text.slice(this.index, this.index + this.query.length);
    },
    end() {
      if (this.index === -1 || !this.query) {
        return;
      }
      return this.text.slice(this.index + this.query.length);
    },
  },
});
</script>
<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.highlight {
  font-weight: var($font-bold);
}
</style>
