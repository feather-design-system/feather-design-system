<template>
  <div class="header-mask" :class="{ frosted: transparent && frosted }" ref="mask" />
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      frosted: false
    }
  },
  mounted() {
    this.resize();
    if(this.transparent) {
      this.recalc();
      window.addEventListener('scroll', this.recalc);
    }
    window.addEventListener('resize', this.resize);
  },
  setup() {
    const mask = ref(null);
    return {mask};
  },
  methods: {
    recalc() {
      //if we've scrolled the page at all
      //and the element is not at top 0
      //then add frosted class, otherwise remove it
      if(this.transparent && window.scrollY && this.mask.getBoundingClientRect().top < 1) {
        this.frosted = true;
      } else {
        this.frosted = false;
      }
    },
    resize() {
      //check the height of the header
      //apply that height to this element
      let header = document.querySelector(".header-content.center-horiz");
      this.mask.style.height = `${header.getBoundingClientRect().height}px`;
    }
  }
};
</script>
<style lang="scss">
@import "~@featherds/styles/themes/variables";
  .header-mask {
    background: inherit;
    position: sticky;
    top: 0;
    left: 0;
    height: 60px;
    width: 100%;
    z-index: 2;
    transition: all 0.2s linear;
  }
  .frosted {
    background-color: rgba(var($surface) .8);
    backdrop-filter: blur(8px);
  }
</style>
