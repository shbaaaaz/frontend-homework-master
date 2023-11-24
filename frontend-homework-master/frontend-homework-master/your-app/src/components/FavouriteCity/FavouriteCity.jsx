import styles from './FavouriteCity.module.css'
import { IoLocationSharp } from 'react-icons/io5'
import { nanoid } from 'nanoid'
import { useContext } from 'react'
import { FavCitiesContext } from '../../context/fav-cities-context'

const FavouriteCity = ({ cityChangeHandler }) => {
  const { favCities, deleteFromFavCities } = useContext(FavCitiesContext)

  return (
    <div>
      <h2>Favourite Cities</h2>
      <div className={styles.cityContainer}>
        {favCities.length > 0 ? (
          favCities.map((city) => (
            <div
              key={nanoid()}
              className={styles.city}
              onClick={(event) => {
                if (event.target.id !== 'delete-button') cityChangeHandler(city)
              }}
            >
              <IoLocationSharp />
              {city}
              <span
                onClick={(event) => {
                  event.preventDefault()
                  deleteFromFavCities(city)
                }}
                className={styles.deleteCity}
                id='delete-button'
                title='Delete from favourite cities'
              >
                &times;
              </span>
            </div>
          ))
        ) : (
          <p className={styles.message}>
            Nothing to show <br />
            <em className={styles.instruction}>
              (You can add upto 3 cities to favourites by clicking on the star
              next to the city name)
            </em>
          </p>
        )}
      </div>
    </div>
  )
}

export default FavouriteCity
