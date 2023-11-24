import styles from './App.module.css'
import ImageContainer from './components/ImageContainer/ImageContainer'
import WeatherInfo from './components/WeatherInfo/WeatherInfo'
import SearchForm from './components/SearchForm/SearchForm'
import FavouriteCity from './components/FavouriteCity/FavouriteCity'
import { useEffect, useState } from 'react'
import { getUserLocation } from './helper/geoLocationAPI'
import { useWeatherData } from './hooks/useWeatherData'
import Loader from './components/Loader/Loader'
import ErrorContainer from './components/ErrorContainer/ErrorContainer'

function App() {
  const [coordinates, setCoordinates] = useState(null)
  const [city, setCity] = useState('')
  const { weatherData, isLoading, error } = useWeatherData(coordinates, city)

  // get user's current location on initial load
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const fetchedLocation = await getUserLocation()
        setCoordinates(fetchedLocation)
      } catch (error) {
        // set default location in case of error (including user's permission rejection)
        setCity('Frankfurt')
      }
    }
    fetchUserLocation()
  }, [])

  const cityChangeHandler = (newCity) => {
    setCity(newCity)
  }

  return (
    <div className={styles.app}>
      <ImageContainer city={error ? 'UNKNOWN' : weatherData?.name} />
      <div className={styles.container}>
        {error && <ErrorContainer>{error}</ErrorContainer>}
        {isLoading && <Loader />}
        {weatherData && <WeatherInfo weatherData={weatherData} />}
        <hr />
        {<SearchForm cityChangeHandler={cityChangeHandler} />}
        {<FavouriteCity cityChangeHandler={cityChangeHandler} />}
      </div>
    </div>
  )
}

export default App
