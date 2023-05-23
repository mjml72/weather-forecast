const submitButton = document.getElementById("submit");
const temperature = document.getElementsByClassName("temperature");
const rain = document.getElementsByClassName("rain");
const wind = document.getElementsByClassName("wind");
const time = document.getElementsByClassName("time");

submitButton.addEventListener("click", getData);

async function getData(event) {
    event.preventDefault();
    let latitude = document.getElementById("latitude").value;
    let longitude = document.getElementById("longitude").value;

    try{

        let response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,precipitation_probability_max,windspeed_10m_max&timezone=auto`);
    
        let data = await response.json();
    
        for (let i = 0; i < 7; i++) {
            temperature[i].textContent = `Temp: ${data.daily.temperature_2m_max[i]}º`;
            rain[i].textContent = `Rain: ${data.daily.precipitation_probability_max[i]}%`;
            wind[i].textContent = `wind: ${data.daily.windspeed_10m_max[i]} Km/h`;
            time[i].textContent = `Time: ${data.daily.time[i]}`;         
        }
    } catch(error){
        console.error(error);
    }

}

