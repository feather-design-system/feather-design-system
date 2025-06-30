<template>
  <div>
    <section>
      <div>
        Alerts can have content. It is possible for an alert to contain other
        alerts. It is unclear how this would be useful.
      </div>
      <FeatherAlert
        message="Just letting you know..."
        type="success"
        :active="alertActive"
        closeable
        v-on:close="alertActive = false"
      >
        <template #actions>
          <FeatherButton text @click="alertActive = false"> Ok </FeatherButton>
        </template>
        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          temporibus iste cum velit dolorum quae perferendis eum, dolorem
          exercitationem sit nemo ratione, nihil quia quasi ab optio eaque?
          Vero, reprehenderit!
        </template>
      </FeatherAlert>

      <div>
        Quisquam, cumque. Quod, voluptatibus. Quisquam, cumque. Quod,
        voluptatibus. Quisquam, cumque. Quod, voluptatibus.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FeatherAlert } from "@featherds/alert";
import { FeatherButton } from "@featherds/button";

const alertActive = ref(true);
</script>

<style scoped></style>
