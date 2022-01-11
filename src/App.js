import React, { useState } from 'react'
import './App.css';

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
    <div className="App">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Location..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
        {(typeof weather.main !="undefined") ? (
        <div className="data">
          <div className="location">
            <h2>{weather.name}</h2>
          </div>
          <div className="today-date">
            <h2>{date}</h2>
          </div>
          <div className="temputure">
            <h1>CURRENT: {Math.round(weather.main.temp)}</h1>
            <div className='sub-temp'>
              <h3>HIGH : {Math.round(weather.main.temp_max)}</h3>
              <h3>LOW: {Math.round(weather.main.temp_min)}</h3>
            </div>
          </div>
          <div className="weather">
            <h2>{weather.weather[0].main}</h2>
          </div>
        </div>
          ):(' ')}
      </main>
    </div>
  );
}

export default App;
