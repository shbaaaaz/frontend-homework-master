import axios from 'axios'

export const getWeatherData = async (coordinates, city) => {
  try {
    if (city || coordinates) {
      const apiKey = process.env.REACT_APP_WEATHER_API_TOKEN
      const baseURL = process.env.REACT_APP_WEATHER_API_BASE_URL
      const unit = 'metric'
      let apiEndpoint = city.trim()
        ? `${baseURL}?q=${city}&appid=${apiKey}&units=${unit}`
        : `${baseURL}?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&appid=${apiKey}&units=${unit}`
      return await axios.get(apiEndpoint)
    }
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("Couldn't find the city, try another one")
    } else {
      throw new Error(error.message)
    }
  }
}
