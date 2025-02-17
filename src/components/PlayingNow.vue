<script setup lang="ts">
  import { Play, Pause, Volume2, VolumeX } from 'lucide-vue-next'
  import { computed, ref, watch } from 'vue'
  import { LottieAnimation } from 'lottie-web-vue'
  import discAnimation from '@/assets/discAnimation.json'
  import type { Station } from '@/types/stations.type'
  import URangeSelector from './UI/URangeSelector.vue'

  interface PlayingNowProps {
    playingStation: Station
  }
  const props = defineProps<PlayingNowProps>()

  const stationAudioStream = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(false)
  const volume = ref(0.5)

  const haveStationToPlay = computed(() => {
    return props.playingStation && props.playingStation.url
  })

  const playStation = () => {
    if (stationAudioStream.value) {
      stationAudioStream.value.play().catch((error) => {
        console.error('Erro ao reproduzir o áudio:', error)
      })
      isPlaying.value = true
    }
  }

  const pauseStation = () => {
    if (stationAudioStream.value) {
      stationAudioStream.value.pause()
      isPlaying.value = false
    }
  }

  const changeVolume = () => {
    if (stationAudioStream.value) {
      stationAudioStream.value.volume = volume.value
    }
  }

  const resetStation = () => {
    stationAudioStream.value?.pause()
    stationAudioStream.value = null
  }

  watch(
    () => props.playingStation.url,
    (newUrl) => {
      resetStation()
      if (props.playingStation.url) {
        stationAudioStream.value = new Audio(newUrl)
        stationAudioStream.value.play()

        isPlaying.value = true
      }
      if (isPlaying.value) {
        stationAudioStream.value?.play().catch((error) => {
          console.error('Erro ao reproduzir o áudio:', error)
        })
      }
    },
    { immediate: true }
  )
</script>

<template>
  <div class="bg-gradient-to-r from-sky-400 to-emerald-600 p-6 rounded-xl mb-8 shadow-lg">
    <h3 class="text-2xl font-bold mb-2">Tocando no momento</h3>
    <div class="flex items-center space-x-4">
      <div
        class="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-200"
      >
        <Pause
          @click="haveStationToPlay ? pauseStation() : null"
          v-if="isPlaying"
          class="h-8 w-8 text-blue-600"
        />
        <Play
          @click="haveStationToPlay ? playStation() : null"
          v-else
          class="h-8 w-8 text-blue-600"
        />
      </div>
      <div>
        <h4 class="text-xl font-semibold">
          {{ haveStationToPlay ? playingStation.name : 'Nenhuma radio no momento' }}
        </h4>
        <p v-if="haveStationToPlay" class="text-gray-200">• {{ playingStation.country }}</p>
        <div class="w-32 md:w-40" v-if="haveStationToPlay">
          <div class="flex items-center">
            <VolumeX class="h-6 w-6 mr-2" />
            <URangeSelector v-model="volume" min="0" max="1" step="0.01" @input="changeVolume" />
            <Volume2 class="h-6 w-6" />
          </div>
        </div>
      </div>
      <LottieAnimation
        v-if="isPlaying"
        class="w-24"
        :animation-data="discAnimation"
        :auto-play="true"
        :loop="true"
        :speed="1"
        ref="anim"
      />
    </div>
  </div>
</template>
