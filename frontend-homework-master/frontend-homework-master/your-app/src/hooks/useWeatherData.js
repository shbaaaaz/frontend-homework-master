import { useEffect, useState } from 'react'
import { getWeatherData } from '../helper/weatherAPI'

export const useWeatherData = (coordinates, city) => {
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await getWeatherData(coordinates, city)
        if (response) {
          setWeatherData(response.data)
        }
        setIsLoading(false)
      } catch (error) {
        setWeatherData(null)
        setError(error.message)
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [coordinates, city])

  return { weatherData, isLoading, error }
}
