<template>
  <h1>Figma Demo</h1>
  <div class="mockup">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="mockup-one"
    >
      <template #image>
        <div class="image-container-one">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
    </FeatherCard>
  </div>
  <div class="mockup">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="mockup-two"
    >
      <template #image>
        <div class="image-container-two">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
    </FeatherCard>
  </div>
  <div class="mockup">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="mockup-three"
    >
      <template #image>
        <div class="image-container-three">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
    </FeatherCard>
  </div>
  <div class="mockup">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="mockup-four"
    >
      <template #image>
        <div class="image-container-four">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
    </FeatherCard>
  </div>
</template>

<script lang="ts">
import * as components from "./../src";
import { FeatherButton } from "@featherds/button";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    ...components,
    FeatherButton,
  },
});
</script>

<style scoped>
.mockup {
  margin: 2rem;
}
.mockup-one {
  width: 40rem;
}
.mockup-two {
  width: 30rem;
}
.mockup-three {
  width: 22.5rem;
}
.mockup-four {
  width: 18rem;
}
.image-container-one {
  width: 40rem;
  height: 12.25rem;
}
.image-container-two {
  width: 30rem;
  height: 12.25rem;
}
.image-container-three {
  width: 22.5rem;
  height: 12.25rem;
}
.image-container-four {
  width: 18rem;
  height: 12.25rem;
}
.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center center;
}
</style>
