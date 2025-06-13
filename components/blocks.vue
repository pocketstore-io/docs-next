<template>
  <img
    class="w-full h-16"
    src="https://www.pocketstore.io/pocketstore-logo.svg"
    alt=""
  />

  <section class="markdown grid grid-cols-6">
    <div v-for="block in blocks" class="page col-span-6 md:col-span-3">
      <div class="prose px-3 py-3" v-html="marked(block)" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { marked } from "marked";

const block = ref("");
const props = defineProps({
  name: { required: true, type: String },
});

onMounted(async () => {
  const response = await fetch("/articels/" + props.name + ".md");
  block.value = (await response.text()).split('---');
});
</script>