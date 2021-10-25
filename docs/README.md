<HomePageAdjust />
<div class="hero">
<Hero>
  <template v-slot:spacer></template>
  <h1>Welcome to the Feather Design System</h1>
  <p class="body-large">Feather DS is an open source design system used<br/>
  for NantHealth and OpenNMS products.</p>
  <FeatherButton primary>Get Started</FeatherButton>
  <FeatherButton text>
    <template v-slot:icon>
      <FeatherIcon :icon="icon" aria-hidden="true" focusable="false"></FeatherIcon>
    </template>
    Github
  </FeatherButton>

</Hero>

</div>

<script>
import { FeatherButton } from "@featherds/button";
import { FeatherIcon } from "@featherds/icon";
import icon from "@featherds/icon/actions/Help";
import atom from "@featherds/icon/branding/Atom";
import arrow from "@featherds/icon/navigation/ArrowBack";
import sections from "@source/groups";
  export default{
    components: {
      FeatherButton,
      FeatherIcon
    },
    computed:{
      icon(){
        return icon;
      },
      atom(){
        return atom;
      },
      arrow(){
        return arrow;
      }
    },
    data(){
      return {
        sections
      }
    },
  }
</script>

<section class="light">
  <div class="section-wrapper philosophy">
    <div class="left">
      <FeatherIcon class="atom" :icon="atom" focusable="false"></FeatherIcon>
      <span>
        <h2>Our Design Philosophy</h2>
        <p>
          Here we could add a couple sentences about the intent and purpose of the Feather Design System
        </p>
      </span>
    </div>
    <div class="right">
      <ol>
        <li>
          <dl>
            <dt>Simplicity</dt>
            <dd>Here we could add a couple sentences about the intent and purpose of the Feather Design System</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Consistency</dt>
            <dd>Here we could add a couple sentences about the intent and purpose of the Feather Design System</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Accessibility</dt>
            <dd>Here we could add a couple sentences about the intent and purpose of the Feather Design System</dd>
          </dl>
        </li>
      </ol>
    </div>
  </div>
</section>

<section class="gradient2">
  <div class="section-wrapper">
    <h2>Learn More About Feather DS</h2>
    <p class="body-small">
      Get started on your next project with our most popular<br/>
      development and design assets and resources.
    </p>
    <div class="card-group">
      <a class="sexy-card">
        <img :src="$withBase('/assets/branding/home-components.png')" title="Components"/>
        <span class="overline">Components</span>
        <h3>Getting Started</h3>
        <span>
          <FeatherIcon :icon="arrow" focusable="false"></FeatherIcon>
        </span>
      </a>
    </div>
  </div>
</section>

<section>
<Hero>
  <template v-slot:spacer></template>
  <div class="section-wrapper">
    <h2>{{sections[0].name}}</h2>
    <Group v-for="group in sections[0].groups" :title="group.name" :description="group.description">
      <GroupItem v-for="item in group.elements"
          :title="item.name"
          :description="item.description">
        <template v-slot:default>
          <img :src="$withBase(item.image)" :title="item.name"/>
        </template>
        <template v-slot:footer>
          <ButtonLink  v-for="button in item.buttons" :href="button.href">{{button.text}}</ButtonLink>
        </template>
      </GroupItem>
    </Group>
  </div>
</Hero>
</section>

<template v-for="(section, index) in sections.slice(1,sections.length)">
<section :class="{ light: index % 2 }">
  <div class="section-wrapper">
    <h2>{{section.name}}</h2>
    <Group v-for="group in section.groups" :title="group.name" :description="group.description">
      <GroupItem v-for="item in group.elements"
          :title="item.name"
          :description="item.description">
        <template v-slot:default>
          <img :src="$withBase(item.image)" :title="item.name"/>
        </template>
        <template v-slot:footer>
          <ButtonLink  v-for="button in item.buttons" :href="button.href">{{button.text}}</ButtonLink>
        </template>
      </GroupItem>
    </Group>
  </div>
</section>
</template>
