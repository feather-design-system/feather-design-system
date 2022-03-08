<template>
  <FeatherFooter :copyright="copyright">
    <template v-slot:links>
      <FeatherFooterLink href="#termsofuse" @click="log('test')">
        Terms of Use
      </FeatherFooterLink>
      <FeatherFooterLink href="#termsofuse1">
        Privacy Policy
      </FeatherFooterLink>
      <FeatherFooterLink href="#termsofuse2">
        Notice of Privacy Practices
      </FeatherFooterLink>
      <FeatherFooterLink href="http://google.com" target="_blank">
        Google
      </FeatherFooterLink>
    </template>
  </FeatherFooter>
</template>
<script lang="ts">
import * as components from "@featherds/footer";
import { defineComponent } from "vue";
export default defineComponent({
  data: () => ({
    copyright: "Copyright © ${year} A COMPANY, Inc.  All Rights Reserved. ",
  }),
  methods: {
    log(x: string) {
      console.log(x);
    },
  },
  components: {
    ...components,
  },
});
</script>
