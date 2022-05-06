<template>
  <section>
    <FeatherCard title="Agenda 2022" subtitle="Our Corporate Vision" class="card">
      <template #image>
        <div class="image-container">
          <AtomBranded class="image" />
        </div>
      </template>
      Phosfluorescently engage worldwide methodologies with web-enabled
      technology. Interactively coordinate proactive e-commerce via
      process-centric "outside the box" thinking. Completely pursue scalable
      customer service through sustainable potentialities.
      <template #actions>
        <FeatherButton text @click="learnMore">Learn More</FeatherButton>
      </template>
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
  methods: {
    learnMore() {
      window.open("https://www.weather.com");
    }
  }
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
  border: 20px solid var(--feather-primary);
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
