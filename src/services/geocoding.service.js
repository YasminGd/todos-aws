import { WeatherDBService } from "./weatherDB.service"

export const geocodingService = {
    getCityWeather
}

async function getCityWeather(string) {
    const API_KEY = 'ba7a616d95864461ac550245232101'
    try {
        const apiData = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${string}`)
        const data = await apiData.json()
        if (!data.error) {
            const weather = {
                temprature: data.current.temp_c,
                image: data.current.condition.icon,
                cityName: data.location.name.toLowerCase(),
                lastUpdated: Date.now()
            }
            WeatherDBService.putInDB(weather)
            return weather
        } else return
    } catch (err) {
        console.error(err)
        return
    }
}