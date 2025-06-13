<template>
  <section class="mb-3">
    <h2 class="text-lg font-bold mb-3">
      Contributors
    </h2>
    <div class="grid grid-cols-12 gap-3">
      <template v-for="contributor in contributors" :key="contributor.login">
        <div class="col-span-6 md:col-span-2">
          <img :src="contributor.avatar_url" :alt="contributor.login" />
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// State variables
const contributors = ref([]);
const counter = ref(0);

// GitHub API fetch function
async function fetchContributors(owner, repo, token) {
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const today = new Date().toLocaleDateString();
  const localContributors = localStorage.getItem('contributors');
  const localDate = localStorage.getItem('contributors-date');

  // Only fetch if not cached or cache is outdated
  if (!localContributors || localDate !== today) {
    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      let data = await response.json();

      data.push({
        login: 'openai-chatgpt',
        avatar_url: 'https://avatars.githubusercontent.com/u/14957082?s=200&v=4',
      });

      // Save the length and contributors to localStorage
      counter.value = data.length;
      // Filter to specific contributors
      data = data.filter((contributor) =>
        [
          'dependabot[bot]',
          'openai-chatgpt',
          'jonathan-martz',
        ].includes(contributor.login)
      );
      contributors.value = data;
      localStorage.setItem('contributors', JSON.stringify(data));
      localStorage.setItem('contributors-date', today);
    } catch (error) {
      console.error('Failed to fetch contributors:', error);
    }
  } else {
    // Load from cache
    try {
      const parsed = JSON.parse(localContributors);
      contributors.value = parsed;
      counter.value = parsed.length;
    } catch {
      contributors.value = [];
      counter.value = 0;
    }
  }

  console.log('count of contributors: ' + contributors.value.length);
}

onMounted(() => {
  fetchContributors('pocketstore-io', 'demo');
});
</script>