<template>
  <section data-theme="light" class="bg-gray-400">
    <header class="bg-black text-white px-3 py-3">
      <section class="mx-auto max-w-6xl flex justify-between px-3">
        <section class="logo">
          <a href="/"> Docs - PocketStore.io </a>
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
      </section>
    </header>
    <section v-if="open" class="mobile-nav py-2 px-3 bg-gray-600 mx-auto max-w-6xl">
      <section class="grid grid-cols-8 gap-3">
        <div class="col-span-4 md:col-span-2">
          <a href="/page/requirements" class="btn btn-primary btn-block btn-sm"
            >Requirements</a
          >
        </div>
        <div class="col-span-4 md:col-span-2">
          <a
              href="/page/plugins"
              class="btn btn-primary btn-block btn-sm"
          >Plugins</a
          >
        </div>
        <div class="col-span-4 md:col-span-2">
          <a
            href="/page/binaries"
            class="btn btn-primary btn-block btn-sm"
            >Biniaries</a
          >
        </div>
        <div class="col-span-4 md:col-span-2">
          <a
            href="/page/nginx-proxy"
            class="btn btn-primary btn-block btn-sm"
            >Nginx Proxy</a
          >
        </div>
      </section>
    </section>
    <main class="px-3 py-3 min-h-screen max-w-6xl mx-auto">
      <slot />
    </main>
    <footer>Footer</footer>
  </section>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "@vueuse/core";

const open = useLocalStorage("open", false, {});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/pocketstore-favicon-512x512.png", // Replace with your SVG file path
    },
    { rel: "manifest", href: "/manifest.json" },
  ],
});

onMounted(() => {
  open.value = false;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((reg) => {
          console.log("Service worker registered.", reg);
        })
        .catch((err) => {
          console.error("Service worker registration failed:", err);
        });
    });
  }
});
</script>