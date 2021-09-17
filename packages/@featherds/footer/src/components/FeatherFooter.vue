<template>
  <footer data-ref-id="feather-footer">
    <div class="footer-content">
      <div class="contact footer-row" v-if="hasContact">
        <slot name="contact" />
      </div>
      <div class="copyright footer-row" data-ref-id="feather-footer-copyright">
        {{ copyrightMessage }}
      </div>
      <div class="links footer-row" v-if="hasLinks">
        <ul>
          <slot name="links" />
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    copyright: {
      type: String,
      required: true,
    },
  },
  computed: {
    copyrightMessage() {
      const year = new Date().getFullYear();
      return this.copyright.replace(/\$\{year\}/g, year);
    },
    hasContact() {
      const hasContact =
        this.$slots.contact &&
        this.$slots
          .contact()
          .findIndex((o) => o.children && o.children.length !== 0) !== -1;
      return hasContact;
    },
    hasLinks() {
      const hasLinks =
        this.$slots.links &&
        this.$slots
          .links()
          .findIndex((o) => o.children && o.children.length !== 0) !== -1;
      return hasLinks;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@featherds/styles/themes/variables";
@import "~@featherds/styles/mixins/typography";
footer {
  margin-top: 64px;
  padding: 32px 0;
  text-align: center;
  border-top: 1px solid var($border-on-surface);
  .footer-content {
    max-width: var($content-width);
    margin: 0 auto;
  }
  .footer-row {
    margin-bottom: 16px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .copyright {
    @include body-small();
  }
  .links ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
