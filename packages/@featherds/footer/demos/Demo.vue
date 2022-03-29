<template>
  <div>
    <div>
      Content of the page
      <button @click="toggleLinks">Toggle footer links</button>
      <div style="height: 1rem"></div>
      <feather-footer :copyright="copyright" v-if="render">
        <template v-slot:links>
          <feather-footer-link
            v-if="linkVisible"
            href="#termsofuse"
            @click="log('test')"
          >
            Terms of Use
          </feather-footer-link>
          <feather-footer-link v-if="linkVisible" href="#termsofuse1">
            Privacy Policy
          </feather-footer-link>
          <feather-footer-link v-if="linkVisible" href="#termsofuse2">
            Notice of Privacy Practices
          </feather-footer-link>
          <feather-footer-link
            v-if="linkVisible"
            href="http://google.com"
            target="_blank"
          >
            Google
          </feather-footer-link>
        </template>
      </feather-footer>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import * as components from "../src";
export default defineComponent({
  data: () => ({
    linkVisible: true,
    copyright: "Copyright © ${year} A COMPANY, Inc.  All Rights Reserved.  ",
    render: true,
  }),
  methods: {
    toggleLinks() {
      this.linkVisible = !this.linkVisible;
      this.rerender();
    },
    rerender() {
      this.render = false;
      this.$nextTick(() => {
        this.render = true;
      });
    },
    log(str) {
      console.log(str);
    },
  },
  components: {
    ...components,
  },
});
</script>
