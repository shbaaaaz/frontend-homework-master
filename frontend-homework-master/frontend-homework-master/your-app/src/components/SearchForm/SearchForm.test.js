import { render, screen } from '@testing-library/react'
import SearchForm from './SearchForm'
import userEvent from '@testing-library/user-event'

describe('Search Form Component', () => {
  test('handles form submission with city name', () => {
    const mockCityChangeHandler = jest.fn()

    render(<SearchForm cityChangeHandler={mockCityChangeHandler} />)

    const input = screen.getByPlaceholderText('Enter city name')
    const searchButton = screen.getByRole('button')
    const cityName = 'Berlin'
    userEvent.type(input, cityName)
    userEvent.click(searchButton)

    expect(mockCityChangeHandler).toHaveBeenCalledWith(cityName)
    expect(input.value).toBe('')
  })

  test('Prevents form submission without city input', () => {
    const mockCityChangeHandler = jest.fn()
    render(<SearchForm cityChangeHandler={mockCityChangeHandler} />)

    const searchButton = screen.getByRole('button')
    userEvent.click(searchButton)
    expect(mockCityChangeHandler).not.toHaveBeenCalled()
  })
})
