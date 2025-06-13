<template>
  <h3 class="font-bold text-lg mb-3">Related Repos on Github.com</h3>
  <ul class="list rounded-box shadow-md bg-white">
    <li v-for="repo in repos" class="list-row">
      <div>
        <img class="size-10 rounded-box" :src="repo.image" />
      </div>
      <div>
        <div>{{ repo.name }}</div>
        <div class="text-xs mt-1 font-semibold opacity-60">
          {{ repo.desc }}
        </div>
      </div>
      <a
        v-if="repo.website"
        :href="repo.website"
        target="_blank"
        class="btn btn-square btn-ghost"
      >
        <FontAwesomeIcon :icon="faLink" />
      </a>
      <a
        v-if="repo.link"
        :href="repo.link"
        target="_blank"
        class="btn btn-square btn-ghost"
      >
        <FontAwesomeIcon :icon="faGithub" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const repos = ref([
  {
    link: "https://www.github.com/pocketstore-io/demo",
    website: "https://demo.pocketstore.io",
    image: "https://cdn.jmse.cloud/avatar-2024.png",
    name: "Github.com - Demo",
    desc: "Docker Storefront with PocketBase",
  },
  {
    link: "https://www.github.com/pocketstore-io/docs",
    website: "https://www.pocketstore.io",
    image: "https://cdn.jmse.cloud/avatar-2024.png",
    name: "Github.com - Docs",
    desc: "This Project Repo for Documentation.",
  },
  {
    link: "https://www.github.com/pocketstore-io/storefront",
    image: "https://cdn.jmse.cloud/avatar-2024.png",
    name: "Github.com - Storefront",
    desc: "Standard Storefront, also Called Baseline.",
  },
]);
</script>
