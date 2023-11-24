import axios from 'axios'

export const getImage = async (cityName) => {
  try {
    const apiKey = process.env.REACT_APP_UNSPLASH_API_KEY
    const query = `${cityName} city`
    const page = 1
    const orientation = 'landscape'
    const itemPerPage = 2
    const url = `${process.env.REACT_APP_USPLASH_API_BASE_URL}?query=${query}&page=${page}&client_id=${apiKey}&orientation=${orientation}&per_page=${itemPerPage}`
    const response = await axios.get(url)
    return response.data.results[1].urls.regular
  } catch (error) {
    throw new Error(error.message)
  }
}
