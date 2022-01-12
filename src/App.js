import React, { useState } from 'react'
import "./Styles/App.css";

function App() {
  const api = {
    key: `${process.env.REACT_APP_WEATHER_API_KEY}`,
    base: "https://api.openweathermap.org/data/2.5/"
  }
  const [query, setQuery] = useState ('');
  const [weather, setWeather] = useState ({});
  
  const search = evt => {
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
      .then(resp => resp.json())
      .then(result => {
        setQuery('');
        setWeather(result);
        console.log(result)
      })
    }
  }
  
  const currentDate = new Date();
  const date = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;

  return (
    <div className="app">
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Location..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main !="undefined") ? (
        <div className="data">
          <div className="location">
            <h1>{weather.name}</h1>
          </div>
          <div className="today-date">
            <h3>{date}</h3>
          </div>
          <div className="temputure">
            <h1>{Math.round(weather.main.temp)}°F</h1>
          </div>
            <div className='sub-temp'>
              <h3>H:{Math.round(weather.main.temp_max)}</h3>
              <h3>L:{Math.round(weather.main.temp_min)}</h3>
            </div>
          <div className="weather">
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
            <h2>{weather.weather[0].description}</h2>
          </div>
        </div>
          ):(' ')}
    </div>
  );
}

export default App;
