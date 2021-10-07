<template>
  <section>
    <div class="test">
      <InputWrapper :label="myLabel" :for="myId" background>
        <div :id="myId">Test</div>
      </InputWrapper>
      <InputSubText id="test" :hint="myHint"></InputSubText>
    </div>
  </section>
</template>
<script>
import {
  InputWrapper,
  InputSubText,
  InputWrapperMixin,
  InputSubTextMixin,
  InputInheritAttrsMixin,
} from "./../src";
export default {
  mixins: [InputWrapperMixin, InputSubTextMixin, InputInheritAttrsMixin],
  data() {
    return {
      myLabel: "Test Label",
      myId: "TEST123",
      myHint: "hint text for a div?",
    };
  },
  components: {
    InputWrapper,
    InputSubText,
  },
};
</script>
