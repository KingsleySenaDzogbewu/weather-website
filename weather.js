  const inputCity = document.querySelector('.input-city');
  const API_KEY = "b3f30b5dbb068f25b8510815f47549dc";

 

  function fetchWeatherInfo() {
    const city = inputCity.value.trim();
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
    `).then((response) => {
      return response.json();
    }).then((weatherInfo) => {
      if(weatherInfo.cod !== 200) {
        alert('City not found');
        return;
      }
   
     

      const cityName = weatherInfo.name;
      const temperature = weatherInfo.main.temp;
      const description = weatherInfo.weather[0].description;
      const windSpeed = weatherInfo.wind.speed;
      const iconCode = weatherInfo.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const time = weatherInfo.dt;
      const date = new Date(time * 1000);
      const  newTime= date.toLocaleString('en-US', {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        
      });
      const humid = weatherInfo.main.humidity;
      const sunrise = weatherInfo.sys.sunrise;
      const rise = new Date(sunrise * 1000);
      const riseTime = rise.toLocaleTimeString([], {
        hour:'2-digit',
        minute: '2-digit'
      });
      const sunset = weatherInfo.sys.sunset;
      const set = new Date(sunset * 1000);
      const setTime = set.toLocaleTimeString([], {
        hour:'2-digit',
        minute: '2-digit'
      });
      const feelsLike = weatherInfo.main.feels_like; 

      document.querySelector('.city-name').textContent = cityName;
      document.querySelector('.temp').textContent = `${temperature}°C`;
      document.querySelector('.description').textContent = description;
      document.querySelector('.wind-speed').textContent = `WindSpeed: ${windSpeed} m/s`;
      document.querySelector('.weather-icon').src = iconUrl;
      document.querySelector('.last-update').textContent = `Last updated: ${newTime}`;
      document.querySelector('.weather-humidity').textContent = `Humidity: ${humid}%`;
      document.querySelector('.sunrise').textContent = `Sunrise: ${riseTime}`;
      document.querySelector('.sunset').textContent = `Sunset: ${setTime}`;
      document.querySelector('.feels-Like').textContent = `Feels like: ${feelsLike}°C`;

      document.querySelector('.input-header').classList.add('hidden');
      document.querySelector('.background').classList.remove('hidden');

    })
  };

document.querySelector('.search-icon-button').addEventListener('click', () => {
  fetchWeatherInfo()
});


inputCity.addEventListener('keydown', (event) => {
  if(event.key === 'Enter') {
    fetchWeatherInfo();
  }
});



