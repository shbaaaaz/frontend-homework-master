export const getUserLocation = async () => {
  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
      const { latitude, longitude } = position.coords
      return { latitude, longitude }
    } else {
      throw new Error("Browser doesn't support geolocation")
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
