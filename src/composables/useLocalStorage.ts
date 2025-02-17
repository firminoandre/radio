import { type Station } from '@/types/stations.type'

export function setFavoriteStations(stations: Station[]) {
  if (stations) {
    localStorage.setItem('favoriteStations', JSON.stringify(stations))
  }
}

export function getFavoriteStations() {
  const favoritesStationsOnLocalStorage = localStorage.getItem('favoriteStations')

  if (favoritesStationsOnLocalStorage) {
    return JSON.parse(favoritesStationsOnLocalStorage)
  }

  return []
}

export function removeStationFromFavoritesByUUID(station: Station) {
  try {
    const favoriteStations = getFavoriteStations()
    const newFavoriteStations = favoriteStations.filter(
      (stationItem: Station) => stationItem.stationuuid !== station.stationuuid
    )
    setFavoriteStations(newFavoriteStations)
  } catch (error) {
    console.error('Erro ao processar os dados do localStorage:', error)
  }
}
