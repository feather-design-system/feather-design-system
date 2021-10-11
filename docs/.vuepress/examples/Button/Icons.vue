<template>
  <section>
    <FeatherButton primary>
      <template v-slot:icon>
        <FeatherIcon :icon="check" aria-hidden="true" focusable="false" />
        Save
      </template>
    </FeatherButton>
    <FeatherButton secondary>
      <template v-slot:icon>
        <FeatherIcon :icon="cancel" aria-hidden="true" focusable="false" />
        Cancel
      </template>
    </FeatherButton>
    <FeatherButton text>
      <template v-slot:icon>
        <FeatherIcon :icon="account" aria-hidden="true" focusable="false" />
        Account
      </template>
    </FeatherButton>
  </section>
</template>
<script>
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import Support from "@featherds/icon/action/Help";
import CheckCircle from "@featherds/icon/action/CheckCircle";
import AccountCircle from "@featherds/icon/action/AccountCircle";
import Cancel from "@featherds/icon/action/Cancel";

export default {
  data() {
    return {
      support: Support,
      check: CheckCircle,
      account: AccountCircle,
      cancel: Cancel
    };
  },
  components: {
    FeatherButton,
    FeatherIcon
  },
};
</script>
