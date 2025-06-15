<template>
  <div class="card card-side shadow-sm">
    <figure>
      <div class="w-32 h-64 bg-cover" style="background-image: url('https://avatars.githubusercontent.com/u/20771653?v=4')">

      </div>
    </figure>
    <div class="card-body bg-white rounded-r-xl">
      <h2 class="card-title">New Version - {{ latest }}</h2>
      <p v-if="releaseNotes">
        <strong>Release notes:</strong><br />
        <span v-html="marked(releaseNotes)"></span>
      </p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Watch</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { marked } from 'marked'

const owner = "pocketstore-io"
const repo = "demo"
const CACHE_KEY = `latest-release:${owner}:${repo}`

const latest = ref("0.0.1")
const hash = ref("")
const releaseNotes = ref("")

const cache = useLocalStorage<{
  latest: string
  hash: string
  releaseNotes: string
  cachedAt: number
} | null>(CACHE_KEY, null)

async function getLatestTagAndRelease(owner: string, repo: string) {
  // 1. Fetch the latest tag
  const tagUrl = `https://api.github.com/repos/${owner}/${repo}/tags?per_page=1`
  const tagResponse = await fetch(tagUrl)
  if (!tagResponse.ok) {
    throw new Error(`Failed to fetch tags: ${tagResponse.statusText}`)
  }
  const tags = await tagResponse.json()
  if (!tags.length) return
  latest.value = tags[0].name
  hash.value = tags[0].commit.sha

  // 2. Fetch the corresponding release by tag name
  const releaseUrl = `https://api.github.com/repos/${owner}/${repo}/releases/tags/${latest.value}`
  const releaseResponse = await fetch(releaseUrl)
  if (!releaseResponse.ok) {
    releaseNotes.value = '(No release notes found for this tag)'
    return
  }
  const release = await releaseResponse.json()
  releaseNotes.value = release.body || '(No notes in this release)'

  // 3. Cache the result with timestamp
  cache.value = {
    latest: latest.value,
    hash: hash.value,
    releaseNotes: releaseNotes.value,
    cachedAt: Date.now()
  }
}

function isCacheValid(cached: typeof cache.value) {
  if (!cached) return false
  // One day = 24h * 60m * 60s * 1000ms
  const oneDayMs = 24 * 60 * 60 * 1000
  return (Date.now() - cached.cachedAt) < oneDayMs
}

onMounted(async () => {
  if (isCacheValid(cache.value)) {
    latest.value = cache.value!.latest
    hash.value = cache.value!.hash
    releaseNotes.value = cache.value!.releaseNotes
  } else {
    await getLatestTagAndRelease(owner, repo)
  }
})
</script>