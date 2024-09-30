import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import searchicon from '../assets/searchicon.png';
import clearicon from '../assets/clearicon.png';
import cloudyicon from '../assets/cloudyicon.png';
import rainicon from '../assets/rainicon.png';
import drizzleicon from '../assets/drizzleicon.png';
import humidicon from '../assets/humidicon.png';
import snowicon from '../assets/snowicon.png';
import windicon from '../assets/windicon.png';


const Weather = () => {

    const ipref=useRef();

    const [weather, setWeather] = useState(true);

    const allicons={
        "01d": clearicon,
        "01n": clearicon,
        "02d": cloudyicon,
        "02n": cloudyicon,
        "03d": cloudyicon,
        "03n": cloudyicon,
        "04d": drizzleicon,
        "04n": drizzleicon,
        "09d": rainicon,
        "09n": rainicon,
        "10d": rainicon,
        "10n": rainicon,
        "13d": snowicon,
        "13n": snowicon
    }

    const search = async (city) => {
        if(!city){
            alert("Please enter a city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=d6c1531c29e203136f3c9d67cf61d647`;
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            const icon = allicons[data.weather[0].icon] || clearicon;
            setWeather({
                humidity: data.main.humidity,
                windspeed: Math.floor(data.wind.speed),
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
        })
        } catch (error) {}
    }

    useEffect(() => {
        search("Hyderabad");
    }, [])

    return (
        <>
        <div className="weather">
            <div className="searchbar">
                <input ref={ipref} type="text" placeholder='Search for a City...'/>
                <img src={searchicon} onClick={()=>search(ipref.current.value)} />
            </div>
            <img src={weather.icon} className='weathericon' />
            <p className='temperature'>{weather.temperature}°c</p>
            <p className='location'>{weather.location}</p>
            <div className="weatherdata">
                <div className="col">
                    <img src={humidicon} />
                    <div>
                        <p>{weather.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={windicon} alt="" />
                    <div>
                        <p>{weather.windspeed} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>    
            </div>
        </div>
        </>
    );
}

export default Weather;