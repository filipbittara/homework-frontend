<template>
  {{username}} sent everyone this beautiful picture on {{date}}
  <div v-html="svg"/>
</template>

<script>
export default {
  name: 'Message',
  props: ['username', 'date', 'svg'],
}
</script>