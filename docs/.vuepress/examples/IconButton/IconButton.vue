<template>
  <FeatherButton icon="Add">
    <FeatherIcon :icon="icon"> </FeatherIcon>
  </FeatherButton>
</template>
<script>
  import { FeatherButton } from "@featherds/button";
  import { FeatherIcon } from "@featherds/icon";
  import icon from "@featherds/icon/actions/Add"
  export default{
    computed:{
      icon(){
        return icon;
      }
    },
    components:{
      FeatherIcon,
      FeatherButton
    }
  }
</script>
