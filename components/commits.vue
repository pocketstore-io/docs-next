<template>
  <div>
    <h2 class="font-bold text-lg my-3">Commits</h2>
    <p v-if="error">Error: {{ error }}</p>
    <ul v-else-if="commits.length > 0">
      <section
        v-for="commit in commits"
        :key="commit.sha"
        class="card bg-white text-black rounded-lg mb-3"
      >
        <div class="card-body">
          <li>
            <p>
              <strong>Author:</strong>
              {{ commit.commit.author.name }}
            </p>
            <p><strong>Message:</strong> {{ commit.commit.message }}</p>
            <p class="text-ellipsis line-clamp-1">
              <strong>Date:</strong>
              {{ new Date(commit.commit.author.date).toLocaleString() }}
            </p>
            <a :href="commit.html_url" target="_blank">View Commit on GitHub</a>
          </li>
        </div>
      </section>
    </ul>
    <p v-else>Loading commits...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const commits = ref([]);
const error = ref(null);
const repo = ref('demo');

onMounted(async () => {
  const today = new Date().toLocaleDateString();
  const lsCommits = localStorage.getItem(`commits-${repo.value}`);
  const lsDate = localStorage.getItem(`commits-${repo.value}-date`);

  if (!lsCommits || lsDate !== today) {
    try {
      const response = await fetch(
        `https://api.github.com/repos/pocketstore-io/${repo.value}/commits?per_page=3`
      );
      if (!response.ok) {
        throw new Error(`Error fetching commits: ${response.statusText}`);
      }
      const data = await response.json();
      commits.value = data;
      localStorage.setItem(`commits-${repo.value}`, JSON.stringify(data));
      localStorage.setItem(`commits-${repo.value}-date`, today);
    } catch (err) {
      error.value = err.message;
    }
  } else {
    commits.value = JSON.parse(lsCommits);
  }
});
</script>