import { useEffect, useState } from 'react'
import { getImage } from '../helper/imageAPI'

export const useCityImage = (city) => {
  const [imageURL, setImageURL] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCityImage = async () => {
      if (city) {
        setError('')
        setIsLoading(true)
        try {
          const url = await getImage(city)
          setImageURL(url)
          setIsLoading(false)
        } catch (error) {
          setError(error.message)
          setIsLoading(false)
        }
      }
    }

    getCityImage()
  }, [city])

  return { imageURL, error, isLoading }
}
