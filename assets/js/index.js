function getWeather(){
    const apiKey='Enter_Your_API-Key'; // you need to get the Api- key from openweather API and past it here 
    const city=document.getElementById('city').value;

    if(!city){
        alert("Please enter a city name first..");
        return;
    }
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response=>response.json())
        .then(data=>{
            displayWeather(data);
        })
        .catch(error=>{
            console.error("Error fetching current weather data:",error);
            alert("Error fetching current weather data. Please try again.");
        });

    fetch(forecastUrl)
        .then(response=>response.json())
        .then(data=>{
            displayHourlyForecast(data.list);
        })
        .catch(error=>{
            console.error("Error fetching hourly forecast data:", error);
            alert("Error fetching hourly forecast data . Please try again.");
        });
}
    function displayWeather(data){
        const tempDivInfo=document.getElementById('temp-div')
        const WeatherInfoDiv=document.getElementById('weather-info')
        const WeatherIcon=document.getElementById('weather-icon')
        const hourlyForecastDiv=document.getElementById('hourly-forecast')

        WeatherInfoDiv.innerHTML="";
        hourlyForecastDiv.innerHTML="";
        tempDivInfo.innerHTML="";


        // function displayWeather(data){
            if(data.cod ==='404'){
                WeatherInfoDiv.innerHTML=`<p>${data.message}</p>`
            }else{
                const cityName=data.name;
                const temperature=Math.round(data.main.temp-273.15);
                const description=data.weather[0].description;
                const iconCode=data.weather[0].icon;
                const iconUrl=`https://openweathermap.org/img/wn/${iconCode}@4x.png`;
                
                const temperatureHTML=`<p>${temperature} °C </p>`;
                const weatherHtml=`<p>${cityName}</p>
                                 <p>${description}</p>`;

                tempDivInfo.innerHTML=temperatureHTML;
                WeatherInfoDiv.innerHTML=weatherHtml;
                WeatherIcon.src=iconUrl;
                WeatherIcon.alt=description

                showImage();

            }
        // }
    }
    function displayHourlyForecast(hourlyData){
        const hourlyForecastDiv = document.getElementById('hourly-forecast');

        const next24hours= hourlyData.slice(0,8);
        next24hours.forEach(item => {
                
            const dataTime = new Date(item.dt * 1000);
            const hour = dataTime.getHours();
            const temperature= Math.round(item.main.temp -273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;

            const hourlyItemHtml=`
            <div class ="hourly-item">
            <span>${hour}:00</span>
            <img src ="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature} °C </span>
            </div> ` ;

            hourlyForecastDiv.innerHTML+=hourlyItemHtml;
        });
    }

    function showImage(){
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display='block';
    }

