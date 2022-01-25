<template>
  <div>
    <div style="height: 1rem"></div>
    <FeatherFooter :copyright="copyright">
      <template v-slot:contact> Contact information </template>
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
  </div>
</template>
<script>
import * as components from "@featherds/footer";
export default {
  data: () => ({
    copyright: "Copyright © ${year} A COMPANY, Inc.  All Rights Reserved. ",
  }),
  methods: {
    log(str) {
      console.log(str);
    },
  },
  components: {
    ...components,
  },
};
</script>
