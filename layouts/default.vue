<template>
  <header class="bg-black text-white px-3 py-3 flex justify-between">
    <section class="logo">
      <a href="/">
        Docs - PocketStore.io
      </a>
    </section>
    <nav class="mobile">
      <section v-if="!open" class="bars">
        <button @click="open = !open">
          <FontAwesomeIcon :icon="faBars" />
        </button>
      </section>
      <section v-else class="times">
        <button @click="open = !open">
          <FontAwesomeIcon :icon="faTimes" />
        </button>
      </section>
    </nav>
  </header>
  <section v-if="open" class="mobile-nav py-2 px-3 bg-red-600">
    <section class="grid grid-cols-6 gap-3">
      <div class="col-span-3">
        <a href="/page/requirements" class="btn btn-primary btn-block btn-sm"
          >Requirements</a
        >
      </div>
      <div class="col-span-3">
        <a href="/page/getting-started" class="btn btn-primary btn-block btn-sm"
          >Getting Started</a
        >
      </div>
    </section>
  </section>
  <main class="px-3 py-3 bg-gray-400 min-h-screen">
    <slot />
  </main>
  <footer>Footer</footer>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "@vueuse/core";

const open = useLocalStorage("open", false, {});

useHead({
  link: [
    { 
      rel: 'icon', 
      type: 'image/png', 
      href: '/pocketstore-favicon-512x512.png' // Replace with your SVG file path
    },
    { rel: 'manifest', href: '/manifest.json' }
  ]
})



onMounted(() => {
  open.value = false;

  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => {
        console.log('Service worker registered.', reg);
      })
      .catch(err => {
        console.error('Service worker registration failed:', err);
      });
  });
}
});
</script>