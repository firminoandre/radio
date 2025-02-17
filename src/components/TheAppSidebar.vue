<script lang="ts" setup>
  import { ChevronDown } from 'lucide-vue-next'
  import { onMounted, ref, watch } from 'vue'
  import { type Station } from '@/types/stations.type'
  import { getFavoriteStations } from '@/composables/useLocalStorage'
  import UCheckbox from './UI/UCheckbox.vue'

  interface SidebarProps {
    items: Station[]
    selectedIdsAfterRemove: string[]
    openSidebar: boolean
    loadingItems: boolean
  }

  interface SidebarEmits {
    (event: 'onSearch', inputValue: string, searchOption: string): void
    (event: 'onSelectStation', selectedItems: string[]): void
    (event: 'onLoadMore', inputValue: string, searchOption: string): void
  }

  const emit = defineEmits<SidebarEmits>()
  const props = defineProps<SidebarProps>()

  const searchOption = ref<string>('name')
  const inputSearch = ref<string>('')
  const selectedItems = ref<string[]>([])

  const setSearchOption = (value: string) => {
    searchOption.value = value
  }

  watch(
    () => inputSearch.value,
    () => {
      emit('onSearch', inputSearch.value, searchOption.value)
    }
  )

  watch(
    () => searchOption.value,
    () => {
      emit('onSearch', inputSearch.value, searchOption.value)
    }
  )

  watch(
    () => selectedItems.value,
    () => {
      emit('onSelectStation', selectedItems.value)
    }
  )

  watch(
    () => props.selectedIdsAfterRemove,
    () => {
      selectedItems.value = props.selectedIdsAfterRemove
    }
  )

  onMounted(() => {
    const parsedFavoriteStations: Station[] = getFavoriteStations()
    selectedItems.value = parsedFavoriteStations.map(
      (stationItem: Station) => stationItem.stationuuid
    )
  })
</script>
<template>
  <div
    class="w-full h-screen lg:w-80 bg-gray-800 p-6 flex flex-col lg:block overflow-auto"
    :class="openSidebar ? 'block' : 'hidden'"
  >
    <div class="flex justify-center">
      <h2 class="text-xl font-semibold mb-4">Radio Browser</h2>
    </div>
    <div class="flex">
      <div class="relative flex-grow">
        <input
          v-model="inputSearch"
          type="search"
          placeholder="Busque por"
          class="w-full bg-gray-700 border-2 border-r-0 border-gray-600 rounded-l-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
        />
      </div>
      <div class="relative mb-6">
        <select
          v-model="searchOption"
          @change="(e) => setSearchOption(e.target ? (e.target as HTMLSelectElement).value : '')"
          class="bg-gray-700 border-2 border-l-0 border-gray-600 rounded-r-full py-2 pr-8 pl-2 text-white appearance-none focus:outline-none focus:border-blue-500 transition duration-300"
        >
          <option value="name">Nome</option>
          <option value="country">País</option>
          <option value="language">Idioma</option>
        </select>
        <ChevronDown class="absolute right-2 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>

    <div class="flex justify-center">
      <h2 class="text-lg font-semibold mb-4">Todas as estaçoes</h2>
    </div>

    <div v-if="loadingItems" class="flex justify-center mt-4 mb-12">
      <div class="border-gray-300 h-14 w-14 animate-spin rounded-full border-4 border-t-blue-600" />
    </div>

    <div v-if="!loadingItems">
      <div class="space-y-2 overflow-y-auto" v-for="item in props.items" :key="item.stationuuid">
        <label
          class="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 hover:bg-gray-700"
        >
          <UCheckbox v-model="selectedItems" :value="item.stationuuid" />
          <span class="text-gray-200">{{ item.name }}</span>
        </label>
      </div>
      <p v-if="props.items && props.items.length <= 0" class="flex justify-center">
        Nenhuma radio encontrada
      </p>
      <div
        v-if="props.items && props.items.length > 0"
        class="flex justify-center items-center mt-4 pt-4 border-t border-gray-700"
      >
        <span
          @click="emit('onLoadMore', inputSearch, searchOption)"
          class="text-sm text-gray-400 cursor-pointer hover:text-gray-500"
        >
          Carregar mais
        </span>
      </div>
    </div>
  </div>
</template>
