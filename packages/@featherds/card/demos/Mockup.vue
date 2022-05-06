<template>
  <h1>
    <a
      href="https://www.figma.com/file/izwFTuv6uso9dLC2G5B7ah/Cards?node-id=288%3A2125"
      >Mockup</a
    >
  </h1>
  <h3>Card</h3>
  <div class="container">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="card"
    >
      <template #image>
        <div class="image-container">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard title="Title Copy Goes Here" class="card">
      <template #image>
        <div class="image-container">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="card"
    >
      <template #image>
        <div class="image-container">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
  </div>
  <div class="container">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      class="card"
    >
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard title="Title Copy Goes Here" class="card">
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard title="Title Copy Goes Here" class="card">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
  </div>
  <h3>Card as Anchor</h3>
  <h5>Same Scnenarios as Above with HREF</h5>
  <div class="container">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      href="https://www.google.com"
      class="card"
    >
      <template #image>
        <div class="image-container">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard
      title="Title Copy Goes Here"
      href="https://www.google.com"
      class="card"
    >
      <template #image>
        <div class="image-container">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      href="https://www.google.com"
      class="card"
    >
      <template #image>
        <div class="image-container">
          <img src="./images/atom.png" class="image" />
        </div>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
  </div>
  <div class="container">
    <FeatherCard
      title="Title Copy Goes Here"
      subtitle="Subtitle goes here"
      href="https://www.google.com"
      class="card"
    >
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard
      title="Title Copy Goes Here"
      href="https://www.google.com"
      class="card"
    >
      <template #actions>
        <FeatherButton text>BUTTON 1</FeatherButton>
        <FeatherButton text>BUTTON 2</FeatherButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
    <FeatherCard
      title="Title Copy Goes Here"
      href="https://www.google.com"
      class="card"
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      temput labore et aliqua. Ut ad minim veniam, quis nostrud.
    </FeatherCard>
  </div>
</template>

<script>
import * as components from "./../src";
import { defineComponent } from "vue";
import { FeatherButton } from "@featherds/button";
export default defineComponent({
  components: {
    ...components,
    FeatherButton,
  },
});
</script>

<style scoped>
.container {
  margin: 2rem 0;
  display: flex;
  flex-grow: 3;
  flex-wrap: nowrap;
}
.card {
  margin: 1rem;
  min-width: 20.5rem;
}
.image-container {
  height: 12.25rem;
}
.image {
  object-fit: cover;
  object-position: center center;
  width: 100%;
  height: 100%;
}
</style>
