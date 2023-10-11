
const search = document.querySelector('.search input');
const searchbtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

const apiKey = 'd756c2789b763ff02facba2282ecd517'; // Replace with your Weatherbit API key

// Make the API request
const weather = async function (city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            document.querySelector('.weather').style.opacity=0;
            document.querySelector('.incorrect').style.opacity=1;
            throw new Error(`HTTP error! Status: ${response.status}`);

        }
        document.querySelector('.incorrect').style.opacity=0;
        const data = await response.json();
        // Print the API response in the console
        console.log(data);

        //city
        document.querySelector('.city').innerHTML = data.name;

        //Temprature
        let temprature = data.main.temp;
        temprature = temprature - 273.15;
        document.querySelector('.temp').innerHTML = `${Math.trunc(temprature)}°C`;

        //humidity
        document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}`;

        //Wind
        document.querySelector('.wind').innerHTML = `Wind: ${data.wind.speed} km/h`;

        //image
        weatherIcon.src = `images/${data.weather[0].main}.png`
        document.querySelector('.weatheName').innerHTML=`${data.weather[0].main}`

        document.querySelector('.weather').style.opacity=1;
    } catch (error) {
        // weatherIcon.src = `images/incorrect.png`;
        console.error("Error:", error);
    }
};

searchbtn.addEventListener('click', function () {

    weather(search.value);
})
// Call the 'weather' function to make the API request


