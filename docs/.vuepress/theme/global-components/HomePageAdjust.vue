<template></template>
<script>
export default {
  mounted() {
    this.recalc();
    window.addEventListener("scroll", this.recalc);
  },
  unmounted() {
    window.removeEventListener("scroll", this.recalc);
  },
  methods: {
    recalc() {
      //if we've scrolled the page at all
      if (window.scrollY) {
        document.body.classList.add("pagescroll");
        document.body.classList.remove("pagetop");
      } else {
        document.body.classList.remove("pagescroll");
        document.body.classList.add("pagetop");
      }
    },
  },
};
</script>
