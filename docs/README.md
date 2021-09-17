<div class="hero">

<h1>Welcome to Feather Design Patterns</h1>

</div>

<script>
import sections from "@source/groups";
  export default{
    data(){
      return {
 sections
      }
    }
  }
</script>

<template v-for="section in sections">
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

</template>
