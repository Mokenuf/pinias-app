<template>
  <BTable 
    :items="paginatedData" 
    :fields="columnsWithActions" 
    :busy="loading" 
    striped 
    hover
  >
    <template v-for="column in columns" #[`cell(${column.key})`]="cellData">
      <template v-if="isType(column.type, 'custom')">
        <slot 
          :name="`custom-cell-${column.key}`" 
          :column="column" 
          :item="cellData.item" 
        />
      </template>
      <template v-else>
        {{ cellData.value || '-' }}
      </template>
    </template>
    <template v-if="actions.length" #cell(actions)="cellData">
      <div 
        v-for="(action, index) in actions" 
        :key="`action-${action.name}-${index}`" 
        v-b-tooltip.hover="action.tooltip" 
        class="d-inline-block align-middle" 
        @click="emitAction(action.name, cellData.item)"
      >
        <BaseIcon 
          class="cursor-pointer mx-1" 
          :height="22" 
          :icon="action.icon" 
          :width="22" 
          :variant="action.variant" 
        />
      </div>
    </template>
  </BTable>
  <BPagination 
    v-model="currentPage" 
    :total-rows="metadata.total" 
    :per-page="metadata.pageSize" 
    @change="changePage" 
  />
</template>

<script setup lang="ts">
import type Metadata from '~/models/metadata';

export interface TableColumn {
  key: string,
  label: string,
  sortable?: boolean,
  sortDirection?: 'asc' | 'desc',
  sortKey?: string,
  type?: string
}

export interface TableAction {
  icon: string,
  name: string,
  tooltip: string,
  variant?: string
}

const props = defineProps<{
  actions: TableAction[],
  columns: TableColumn[],
  data: any[],
  loading: boolean,
  metadata: Metadata
}>()

const emits = defineEmits([
  'action'
])

const currentPage = ref(1)
const columnsWithActions = computed(() => {
  if (props.actions.length) {
    return [ ...props.columns, { key: 'actions', label: 'Actions' }]
  }
  return props.columns
})
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * props.metadata.pageSize
  const end = start + props.metadata.pageSize
  return props.data ? props.data.slice(start, end) : []
})

const changePage = (page: number) => {
  currentPage.value = page
}

const emitAction = (actionName: string, item: any) => {
  emits('action', { action: actionName, item})
}

const isType = (columnType: string | undefined, type: string) => {
  return columnType === type
}
</script>