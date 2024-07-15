<template>
  <div>
    <h1>Nuxt 3 Guild App</h1>
    <BaseTable 
      :data="guildMembers ?? []" 
      :actions="actions" 
      :columns="columns" 
      :metadata="metadata" 
      :loading="loading"
      @action="handleAction"
    >
      <template #custom-cell-rank="{ item }">
        <span :class="`rank-${item.rank}`">{{ getRankLabel(item.rank) }}</span>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import type { TableAction, TableColumn } from '~/components/base/BaseTable.vue';
import { CatalogGuildRanks, CatalogTableActions } from '~/helpers/catalogs';
import type ApiParams from '~/models/api-params';
import Metadata from '~/models/metadata';

const guildStore = useGuildStore()
const router = useRouter()

const guild = computed(() => guildStore.guild)
const guildMembers = computed(() => guild.value?.members)
const loading = computed(() => guildStore.fetchLoading)
const actions: TableAction[] = [
  CatalogTableActions.view,
]
const columns: TableColumn[] = [
  { key: 'character.name', label: 'Name' },
  { key: 'character.race', label: 'Race' },
  { key: 'character.class', label: 'Class' },
  { key: 'character.activeSpecName', label: 'Spec' },
  { key: 'rank', label: 'Guild Rank', type: 'custom', sortable: true, sortDirection: 'asc'}
]

const metadata = new Metadata({
  total: computed(() => guildMembers.value?.length ?? 0),
  pageSize: 10,
  page: 1
})

onMounted(() => {
  fetchGuild()
})

const fetchGuild = () => {
  const params: ApiParams = {
    name: 'hair recovery',
    realm: 'ragnaros',
    region: 'us',
    fields: ['members']
  }
  guildStore.fetchGuildData(params)
}

const handleAction = ({ action, item }) => {
  switch (action) {
    case CatalogTableActions.view.name:
      router.push(`character/${item.character.name}`)
      break
    default:
      break
  }
}

const getRankLabel = (rank) => {
  return CatalogGuildRanks.find(r => r.rank === rank)?.name || '-'
}
</script>