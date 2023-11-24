import styles from './ImageContainer.module.css'
import { IoLocationSharp } from 'react-icons/io5'
import { BiStar, BiSolidStar } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FavCitiesContext } from '../../context/fav-cities-context'
import { useCityImage } from '../../hooks/useCityImage'
import Loader from '../Loader/Loader'

const ImageContainer = ({ city = 'Frankfurt' }) => {
  const { imageURL, error, isLoading } = useCityImage(city)
  const { favCities, addToFavCities, deleteFromFavCities } =
    useContext(FavCitiesContext)
  const [isFavouriteCity, setIsFavouriteCity] = useState(false)
  const [starLimitReached, setStarLimitReached] = useState(false)

  const fallbackImageURL =
    'https://images.unsplash.com/photo-1502759683299-cdcd6974244f?h=220&w=440&auto=format&fit=crop&q=60'

  // Check if the current city is favourite and if there is any space left in the favourite cities stack
  useEffect(() => {
    favCities.includes(city.trim().toUpperCase())
      ? setIsFavouriteCity(true)
      : setIsFavouriteCity(false)
    favCities.length < 3
      ? setStarLimitReached(false)
      : setStarLimitReached(true)
  }, [city, favCities])

  const handleAddToFavourite = () => {
    if (favCities.length < 3) addToFavCities(city)
  }

  const handleDeleteFromFavourite = () => {
    deleteFromFavCities(city)
  }

  return (
    <div className={styles.imageContainer}>
      {isLoading && <Loader />}
      {!isLoading && (
        <img
          src={imageURL || fallbackImageURL}
          alt={city}
          className={styles.responsiveImage}
        />
      )}
      {city !== 'UNKNOWN' && (
        <div className={styles.cityName}>
          <IoLocationSharp className={styles.locationIcon} />
          <h1>{city.toUpperCase()}</h1>

          {isFavouriteCity && (
            <BiSolidStar
              title='Delete from favourite cities'
              className={styles.star}
              onClick={handleDeleteFromFavourite}
            />
          )}
          {!isFavouriteCity && !starLimitReached ? (
            <BiStar
              title='Add to favourite cities'
              className={styles.star}
              onClick={handleAddToFavourite}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  )
}

export default ImageContainer
