<template>
  <div>
    <feather-checkbox
      id="parent"
      :modelValue="allChildren"
      @update:modelValue="handleParent"
      :indeterminate="indeterminate"
      >Some children</feather-checkbox
    >
    <ul>
      <li>
        <feather-checkbox id="child" v-model="child">Child</feather-checkbox>
      </li>
      <li>
        <feather-checkbox id="secondChild" v-model="secondChild"
          >Child</feather-checkbox
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { FeatherCheckbox } from "../src";
import { defineComponent } from "vue";
export default defineComponent({
  data: () => {
    return {
      child: false,
      secondChild: false,
    };
  },
  computed: {
    allChildren() {
      return this.child && this.secondChild;
    },
    indeterminate() {
      if (this.child && !this.secondChild) {
        return true;
      }
      if (!this.child && this.secondChild) {
        return true;
      }
      return false;
    },
  },
  methods: {
    handleParent(v: boolean | undefined) {
      if (v === undefined) {
        return;
      }
      this.child = v;
      this.secondChild = v;
    },
  },
  components: {
    FeatherCheckbox,
  },
});
</script>
