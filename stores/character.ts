import { baseURL } from "~/helpers/config"
import type ApiParams from "~/models/api-params"
import Character from "~/models/character"

export const useCharacterStore = defineStore('character', () => {
  // State
  const character = ref<Character | null>(null)
  const fetchLoading = ref(false)

  // Actions
  const fetchCharacterData = async (params: ApiParams) => {
    try {
      fetchLoading.value = true
      const response = await $fetch<Character>('/characters/profile', { baseURL, params })
      character.value = new Character(response)
    } catch (error) {
      console.error('Error fetching character data:', error)
    } finally {
      fetchLoading.value = false
    }
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCharacterStore, import.meta.hot))
  }

  return { character, fetchLoading, fetchCharacterData }
})