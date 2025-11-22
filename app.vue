<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  script: [
    {
      defer: true,
      "id": "pianjs",
      "src": "https://api.pirsch.io/pa.js",
      "data-code": "VdQ3pdGVifs7RYn9UH82AIjCAFcezRI6"
    }
  ]
});

</script>