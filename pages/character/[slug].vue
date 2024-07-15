<template>
  <div>
    <h1>Character Data</h1>
    <p v-if="loading">Loading...</p>
    <div v-else>
      <pre> {{ character }}</pre>
      <BButton @click="goBack">Go Back</BButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type ApiParams from '~/models/api-params';

const characterStore = useCharacterStore()
const route = useRoute()
const router = useRouter()

const character = computed(() => characterStore.character)
const loading = computed(() => characterStore.fetchLoading)
const slug = computed(() => route.params.slug)

onMounted(() => {
  fetchCharacter()
})

const fetchCharacter = () => {
  const params: ApiParams = {
    name: slug.value as string,
    realm: 'ragnaros',
    region: 'us'
  }
  characterStore.fetchCharacterData(params)
}

const goBack = () => {
  router.back()
}
</script>