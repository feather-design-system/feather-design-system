<template>
  <section>
    <FeatherCard
      title="Agenda 2022"
      subtitle="Our Corporate Vision"
      href="https://www.google.com"
      target="_blank"
      class="card"
    >
      <template #image>
        <div class="image-container">
          <AtomBranded class="image" />
        </div>
      </template>
      Synergistically evolve 2.0 technologies rather than just in time
      initiatives. Quickly deploy strategic networks with compelling e-business.
      Credibly pontificate highly efficient manufactured products and enabled
      data.
    </FeatherCard>
  </section>
</template>

<script lang="ts">
import { FeatherButton } from "@featherds/button";
import { FeatherCard } from "@featherds/card";
import AtomBranded from "../../theme/components/AtomBranded.vue";

import { defineComponent } from "vue";
export default defineComponent({
  components: {
    AtomBranded,
    FeatherButton,
    FeatherCard,
  },
});
</script>

<style scoped>
.card {
  margin: 1rem;
  max-width: 25rem;
  min-width: 15rem;
}

.image-container {
  margin: 0;
  width: 100%;
  border: 2px solid var(--feather-primary);
}
.image {
  display: inline-block;
  object-fit: fill;
  object-position: center;
  padding: 2rem;
  width: 100%;
  min-height: 12.25rem;
}
</style>
