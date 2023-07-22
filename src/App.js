import { useState } from 'react';
import './App.css';

const api = {
    key: "a401aa7b6ab41f0e8b08660f4c8981e1",
    base: "https://api.openweathermap.org/data/2.5/"
}

function getIcon(result) {
    var icon = result.weather[0].icon;
    const image = document.getElementById("icon");
    image.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = event => {
        if(event.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
            .then(response => response.json())
            .then(result => {
                setQuery('');
                setWeather(result);
                getIcon(result);
            });
        }
    }

    return (
        <div className={(typeof weather.main != "undefined") ? (
            (weather.weather[0].main === "Clouds") ? 'app clouds' : 
            (weather.weather[0].main === "Rain") ? 'app rain' : 
            'app clear') : 'app clear'}>
            <main>
                <div className="app-content">
                    <div className="search-box">
                        <input type="text" className="search-bar" placeholder="Search City..." 
                        onChange={e => setQuery(e.target.value)} value={query} onKeyDown={search}></input>
                    </div>
                    {(typeof weather.main == "undefined") ? (
                    <div>
                        <h1>City Not Found :&#40;</h1>
                    </div>
                    ) : ('')}

                    {(typeof weather.main != "undefined") ? (
                    <div>
                        <div className="info-box">
                            <div className="temp-icon">
                                <div className="temp">{Math.round(weather.main.temp)}°</div>
                                <img src="" alt="Weather Icon" id="icon" className="icon"></img>
                            </div>
                            <div className="weather">{weather.weather[0].main}</div>
                            <div className="location">{weather.name}, {weather.sys.country}</div>
                            <div className="extra">{Math.round(weather.main.temp_max)}
                            ° / {Math.round(weather.main.temp_min)}
                            ° Feels like {Math.round(weather.main.feels_like)}°</div>
                        </div>
                        <div className="small-info-container">
                            <div className="small-info-box">
                                <p className="extra">Humidity</p>
                                <div className="extra">{Math.round(weather.main.humidity)}%</div>
                            </div>
                            <div className="small-info-box">
                                <p className="extra">Pressure</p>
                                <div className="extra">{Math.round(weather.main.pressure)} hPa</div>
                            </div>
                            <div className="small-info-box">
                                <p className="extra">Wind</p>
                                <div className="extra">{Math.round(weather.wind.speed)} m/s</div>
                            </div>
                            <div className="small-info-box">
                                <p className="extra">Wind Direction</p>
                                <div className="extra">{Math.round(weather.wind.deg)}°</div>
                            </div>
                        </div>
                    </div>
                    ) : ('')}
                </div>
            </main>
        </div>
    );
}

export default App;
