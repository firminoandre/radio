<script setup lang="ts">
  import { Trash2, Play, Search } from 'lucide-vue-next'
  import PlayingNow from '@/components/PlayingNow.vue'
  import { computed, ref, watch } from 'vue'
  import type { Station } from '@/types/stations.type'
  import { LottieAnimation } from 'lottie-web-vue'
  import soundAnimation from '@/assets/soundAnimation.json'
  import UInput from '@/components/UI/UInput.vue'

  interface FavoriteStationsProps {
    favoriteStations: Station[]
  }

  interface FavoriteStationsEmit {
    (event: 'onRemoveStation', stationToRemove: Station): void
    (event: 'onSearchFavoriteStation', searchFavoriteStation: string): void
  }

  const props = defineProps<FavoriteStationsProps>()
  const emit = defineEmits<FavoriteStationsEmit>()

  const selectedPlayingStation = ref<Station | []>([])
  const searchFavoriteStation = ref<string>('')

  const haveFavoriteStations = computed(() => {
    return props.favoriteStations && props.favoriteStations.length
  })

  watch(
    () => searchFavoriteStation.value,
    () => {
      emit('onSearchFavoriteStation', searchFavoriteStation.value)
    }
  )
</script>
<template>
  <div class="flex-1 p-4 md:p-8">
    <h1 class="text-4xl font-bold mb-2">Radio Browser</h1>
    <h2 class="text-xl text-gray-400 mb-8">Aqui estao listadas todas suas radios favoritas!</h2>

    <PlayingNow :playing-station="selectedPlayingStation as Station" />

    <div class="mt-8 mb-4">
      <div class="relative">
        <UInput v-model="searchFavoriteStation" placeholder="Filtre suas rádios favoritas..." />
        <Search class="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
      </div>
    </div>
    <div v-if="haveFavoriteStations">
      <div
        class="space-y-4 mb-2 cursor-pointer"
        v-for="favoriteStation in props.favoriteStations"
        :key="favoriteStation.stationuuid"
      >
        <div
          class="flex items-center gap-4 p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors duration-300"
        >
          <div
            class="w-12 h-12 bg-gradient-to-br from-sky-400 to-emerald-600 rounded-full flex items-center justify-center text-xl font-bold"
          >
            <img :src="favoriteStation.favicon" width="10" alt="station_icon" />
          </div>
          <div class="flex-1" @click="selectedPlayingStation = favoriteStation">
            <h3 class="text-lg font-semibold">{{ favoriteStation.name }}</h3>
            <p class="text-sm text-gray-400">{{ favoriteStation.country }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="selectedPlayingStation = favoriteStation"
              class="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors duration-300"
            >
              <Play class="h-5 w-5" />
            </button>

            <button
              @click="emit('onRemoveStation', favoriteStation)"
              class="p-2 text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors duration-300"
            >
              <Trash2 class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center">
        <h2 class="text-xl text-gray-400">Não foi possível encontrar nenhuma rádio favoritada</h2>
        <LottieAnimation
          :animation-data="soundAnimation"
          :auto-play="true"
          :loop="true"
          :speed="1"
        />
      </div>
    </div>
  </div>
</template>
