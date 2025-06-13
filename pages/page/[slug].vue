<template>
  <div>
    <blocks :name="route.params.slug" />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
