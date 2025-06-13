<template>
  <div class="card card-side shadow-sm">
    <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
        alt="Movie"
      />
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
import {marked} from 'marked'

const latest = ref("0.0.1")
const hash = ref("")
const releaseNotes = ref("")

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
}

onMounted(async () => {
  await getLatestTagAndRelease("pocketstore-io", "demo")
})
</script>

<style>
</style>