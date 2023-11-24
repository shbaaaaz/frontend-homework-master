import { useRef } from 'react'
import styles from './SearchForm.module.css'
import { IoSearch } from 'react-icons/io5'

const SearchForm = ({ cityChangeHandler }) => {
  const inputCityRef = useRef('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const citySelected = inputCityRef.current.value.trim()
    if (citySelected) {
      cityChangeHandler(citySelected)
      inputCityRef.current.value = ''
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor='city' className={styles.label}>
        Check weather in your city
      </label>
      <input
        type='text'
        placeholder='Enter city name'
        id='city'
        className={styles.input}
        ref={inputCityRef}
      />
      <IoSearch
        className={styles.searchIcon}
        onClick={handleSubmit}
        role='button'
      />
    </form>
  )
}

export default SearchForm
