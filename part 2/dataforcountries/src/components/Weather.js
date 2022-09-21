import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({ city }) => {
    const [weather, setWeather] = useState({});
    const apikey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.split(" ").join("+")}&appid=${apikey}&units=metric`;

    const fetchWeather = async () => {
        try {
            const response = await axios.get(url);
            const data = response.data;
            setWeather(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchWeather();
    }, [])


    if (weather.main) {
        const imgsrc = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        console.log(weather);
        return (
            <div>
                <h2>Weather in {city}</h2>
                <p>Temperature is {weather.main.temp}</p>
                <img src={imgsrc} alt="weather icon" />
                <p>wind speed {weather.wind.speed}</p>
            </div>
        )
    } else {
        return <></>
    }
}

export default Weather;