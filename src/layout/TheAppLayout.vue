<script setup lang="ts">
  import { Menu } from 'lucide-vue-next'
  import TheAppSidebar from '@/components/TheAppSidebar.vue'
  import { onMounted, ref } from 'vue'
  import useHttp from '@/composables/useFetch'
  import { useDebouncedFn } from '@/composables/useDebounceFn'
  import {
    getFavoriteStations,
    removeStationFromFavoritesByUUID,
    setFavoriteStations,
  } from '@/composables/useLocalStorage'
  import type { Station } from '@/types/stations.type'
  import FavoriteStations from '@/views/FavoriteStations.vue'

  const { get } = useHttp()

  const sidebarOpen = ref<boolean>(false)
  const stations = ref<Station[]>()
  const loadingStations = ref<boolean>(false)
  const stationsRequestLimit = ref<number>(10)
  const sidebarSelectedStations = ref<Station[]>([])
  const selectedIdsAfterRemove = ref<string[]>([])

  const getAllStations = async () => {
    try {
      loadingStations.value = true
      const response: { data: Station[] } = await get('/stations', {
        params: { limit: stationsRequestLimit.value },
      })
      if (response) {
        stations.value = response.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      loadingStations.value = false
    }
  }

  const handleStationFilter = async (
    inputSearchValue: string,
    optionSearchValue: 'name' | 'country' | 'language'
  ) => {
    if (!inputSearchValue.length) {
      return getAllStations()
    }

    const endpointMapByOption: Record<string, string> = {
      name: 'byname',
      country: 'bycountry',
      language: 'bylanguage',
    }

    const endpoint = endpointMapByOption[optionSearchValue]
    const url = `stations/${endpoint}/${encodeURIComponent(inputSearchValue)}`

    const { get } = useHttp()

    try {
      loadingStations.value = true
      const response: { data: Station[] } = await get(url, {
        params: { limit: stationsRequestLimit.value },
      })
      if (response) {
        stations.value = response.data
      }
    } catch (error) {
      console.log(error)
    } finally {
      loadingStations.value = false
    }
  }

  const handleLoadMoreStations = (
    inputSearchValue: string,
    optionSearchValue: 'name' | 'country' | 'language'
  ) => {
    stationsRequestLimit.value += 10
    handleStationFilter(inputSearchValue, optionSearchValue)
  }

  const handleFavoriteStations = (selectedStations: string[]) => {
    const stationsByUuid = stations.value?.filter((stationItem: Station) =>
      selectedStations.includes(stationItem.stationuuid)
    )
    sidebarSelectedStations.value = stationsByUuid as Station[]
    setFavoriteStations(stationsByUuid as Station[])
  }

  const handleToRemoveStation = (stationToRemove: Station) => {
    removeStationFromFavoritesByUUID(stationToRemove)
    const favoriteStations: Station[] = getFavoriteStations()
    selectedIdsAfterRemove.value = favoriteStations.map((item) => item.stationuuid)
    sidebarSelectedStations.value = favoriteStations
  }

  const handleSearchFavoriteStation = (inputSearchFavoriteStationValue: string) => {
    const favoriteStations: Station[] = getFavoriteStations()

    if (inputSearchFavoriteStationValue.length === 0)
      return (sidebarSelectedStations.value = favoriteStations)

    const filteredFavoriteStations = favoriteStations?.filter((stationItem) =>
      stationItem.name.toLowerCase().includes(inputSearchFavoriteStationValue.toLowerCase())
    )
    sidebarSelectedStations.value = filteredFavoriteStations as Station[]
  }

  const debouncedFilterResults = useDebouncedFn(handleStationFilter, 500)
  const debouncedLoadMoreResults = useDebouncedFn(handleLoadMoreStations, 500)
  const debouncedSearchFavoriteStation = useDebouncedFn(handleSearchFavoriteStation, 500)

  onMounted(async () => {
    await getAllStations()
    const parsedFavoriteStations = getFavoriteStations()
    sidebarSelectedStations.value = parsedFavoriteStations
  })
</script>
<template>
  <div class="flex flex-col h-screen bg-gray-900 text-gray-100">
    <div class="lg:hidden flex items-center justify-between p-4 bg-gray-800">
      <h1 class="text-2xl text-white font-bold mb-2">Radio Browser</h1>
      <button @click="sidebarOpen = !sidebarOpen" class="text-gray-400 hover:text-white">
        <Menu class="h-6 w-6" />
      </button>
    </div>
    <div class="flex h-screen bg-gray-900 text-gray-100">
      <TheAppSidebar
        :items="stations as Station[]"
        :selected-ids-after-remove="selectedIdsAfterRemove"
        :loading-items="loadingStations"
        :open-sidebar="sidebarOpen"
        @on-search="
          (inputSearchValue, optionSearchValue) =>
            debouncedFilterResults(inputSearchValue, optionSearchValue)
        "
        @on-load-more="
          (inputSearchValue, optionSearchValue) =>
            debouncedLoadMoreResults(inputSearchValue, optionSearchValue)
        "
        @on-select-station="(selectedStations) => handleFavoriteStations(selectedStations)"
      />
      <div class="flex-1 p-4 md:p-8 overflow-y-auto">
        <FavoriteStations
          :favorite-stations="sidebarSelectedStations"
          @on-remove-station="(stationToRemove) => handleToRemoveStation(stationToRemove)"
          @on-search-favorite-station="
            (inputSearchFavoriteStationValue) =>
              debouncedSearchFavoriteStation(inputSearchFavoriteStationValue)
          "
        />
      </div>
    </div>
  </div>
</template>
