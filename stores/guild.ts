import { baseURL } from '~/helpers/config'
import type ApiParams from '~/models/api-params'
import Guild from '~/models/guild'


export const useGuildStore = defineStore('guild', () => {
  // State
  const guild = ref<Guild | null>(null)
  const fetchLoading = ref(false)

  // Actions
  const fetchGuildData = async (params: ApiParams) => {
    try {
      fetchLoading.value = true
      const response = await $fetch<Guild>('/guilds/profile', { baseURL, params })
      guild.value = new Guild(response)
    } catch (error) {
      console.error('Error fetching guild data:', error)
    } finally {
      fetchLoading.value = false
    }
  }

  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGuildStore, import.meta.hot))
  }

  return { guild, fetchLoading, fetchGuildData }
})