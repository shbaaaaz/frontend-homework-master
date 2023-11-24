import { useEffect, useReducer } from 'react'
import { createContext } from 'react'

export const FavCitiesContext = createContext({
  favCities: [],
  addToFavCities: () => {},
  deleteFromFavCities: () => {},
})

const FavCitiesContextProvider = ({ children }) => {
  const [favCities, favCityDispatch] = useReducer(favCityReducer, [])

  const addToFavCities = (city) => {
    const cityToAdd = city.trim().toUpperCase()
    if (favCities.length < 3 && !favCities.includes(cityToAdd)) {
      addToFavouriteCities(cityToAdd)
      return favCityDispatch({
        type: 'ADD',
        payload: cityToAdd,
      })
    }
  }

  const deleteFromFavCities = (city) => {
    const cityToDelete = city.trim().toUpperCase()
    if (favCities.includes(cityToDelete)) {
      deleteFromFavouriteCities(cityToDelete)
      return favCityDispatch({ type: 'DELETE', payload: cityToDelete })
    }
  }

  // get favourite cities from local storage on initial load
  useEffect(() => {
    const cities = getFavouriteCities()
    if (cities) {
      favCityDispatch({ type: 'REPLACE', payload: cities })
    }
  }, [])

  const contextValue = {
    favCities,
    addToFavCities,
    deleteFromFavCities,
  }

  return (
    <FavCitiesContext.Provider value={contextValue}>
      {children}
    </FavCitiesContext.Provider>
  )
}

export default FavCitiesContextProvider

function favCityReducer(favCities, action) {
  if (action.type === 'ADD') {
    return [...favCities, action.payload]
  } else if (action.type === 'DELETE') {
    return favCities.filter(
      (city) => city.trim().toUpperCase() !== action.payload
    )
  } else if (action.type === 'REPLACE') {
    return [...action.payload]
  } else {
    throw new Error(`Invalid action ${action.type}`)
  }
}

function getFavouriteCities() {
  const favouriteCities = localStorage.getItem('favouriteCities')
  if (favouriteCities) {
    return capitalizeNames(favouriteCities.split(','))
  } else return
}

function addToFavouriteCities(city) {
  let favouriteCities = getFavouriteCities()
  if (!favouriteCities) {
    favouriteCities = [city.toUpperCase()]
  } else {
    if (
      favouriteCities.length < 3 &&
      !favouriteCities.includes(city.trim().toUpperCase())
    ) {
      favouriteCities.push(city.toUpperCase())
    }
  }
  const updatedList = favouriteCities.join(',')
  localStorage.setItem('favouriteCities', updatedList)
}

function deleteFromFavouriteCities(city) {
  const favouriteCities = getFavouriteCities()
  if (favouriteCities) {
    const updatedList = favouriteCities.filter(
      (cityName) => cityName.trim().toUpperCase() !== city.trim().toUpperCase()
    )
    const newFavouriteCities = updatedList.join(',')
    localStorage.setItem('favouriteCities', newFavouriteCities)
  }
}

function capitalizeNames(cities) {
  return cities.map((city) => city.toUpperCase())
}
