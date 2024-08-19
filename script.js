class PocasickoApp {
    constructor(apiKey) {                   
        this.apiKey  = apiKey;         // APIklic
        this.places = [];              //prazdne pole pro ulozeni mest
        this.initialize();             //metoda pro pridani udalosti
    }

    initialize() {                                                       
        this.cityInput = document.getElementById('city');         //input pro zadani mesta
        this.cityInfo = document.getElementById('city-info');     // zobrazeni mesta
        this.tempDivInfo = document.getElementById('temp-div');   // zobrazeni teploty
        this.weatherInfoDiv = document.getElementById('weather-info');   //zobrazeni obrazku pocasi
        this.forecastDiv = document.getElementById('forecastTable');     // zobrazeni tabulky predpovedi

        document.getElementById('searchButton').addEventListener('click', () => this.getWeather());     //udalost na searchButton vyvola metodu getWeather
    }

    cityFromJson() {                                 //metoda nacteni mest z json
        fetch('city.list.json')                      // pozadavek na json
            .then(response => response.json())       // prevod na JSON
            .then(data => {
                this.places = data;                  // ulozi do pole places
            });
    }
  

    getWeather() {
        const city = this.cityInput.value;          //hodnota zadaneho mesta
        if (!city) {                                // praznde pole ?
            alert('Prosím zadejte místo');          // upozorneni
            return;
        }

        this.cityInput.value = '';                 // vymazani hodnoty

        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;       //aktualni pocasi
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}`;            // url na predpoved
       

        fetch(currentWeatherUrl)                 //pozadavek na API
        .then(response => response.json())       // prevod na JSON
        .then(data => this.displayWeather(data));  //zavola metodu

        fetch(forecastUrl)                           // pozadave API na predpoved
        .then(response => response.json())
        .then(data => this.displayForecast(data));   

         
    }

    displayWeather(data) {                        // metoda pro zobrazeni pocasi
        this.weatherInfoDiv.innerHTML = '';       // vymazani hodnoty
        this.tempDivInfo.innerHTML = '';          // vymazani hodnoty
        this.cityInfo.innerHTML = '';             // vymazani hodnoty

        if (data.cod === '404') {                 // kontrola chyby 
            this.weatherInfoDiv.innerHTML = ''; 
        } else {
            const cityName = data.name;                                   //nazev mesta z dat
            const temperature = Math.round(data.main.temp - 273.15);      //kelviny na stupne
            const description = data.weather[0].description;              // popis pocasi
            const iconCode = data.weather[0].icon;                        // obrazek pocasi
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;   // URL obrazku

            const cityHtml = `<h1>${cityName}</h1>`;                      // sestavi nazev
            const temperatureHTML = `<h2>${temperature}°</h2>`;           // sestavi teplotu
            const weatherHtml = `<img src="${iconUrl}">`;                 // sestavi obrazek

            this.cityInfo.innerHTML = cityHtml;                           // zobrazeni mesta
            this.tempDivInfo.innerHTML = temperatureHTML;                 // zobrazeni teploty
            this.weatherInfoDiv.innerHTML = weatherHtml;                  // zobrazeni obrazku
        }
    }   

    displayForecast(data)  {                          // metoda na predpoved
        this.forecastDiv.innerHTML = '';              // vymazani hodnoty

        if (data.cod === '404') {                     // kontrola chyby 
            this.forecastDiv.innerHTML = `<p>${data.message}</p>`;     //upozorneni city not found
        } else {
            const forecastList = data.list;
            const locale = navigator.language;                         // ziskani aktualniho jazyka prohlizece
            const isMobile = window.innerWidth < 700;                  // jiny format datumu pri zadani pod 700px
            const dateFormatter = new Intl.DateTimeFormat(locale, {    //format data na zaklade jazky a isMobile
                weekday: isMobile ? 'short' : 'long',
                month: isMobile ? 'short' : 'long',
                day: 'numeric'
            });
            let forecastHTML = '<h3>5denní předpověď</h3>';          //nadpis tabulky

            for (let i = 0; i < forecastList.length; i += 8) {
                const forecast = forecastList[i];                    // zobrazeni aktualni predpovedi     
                const date = new Date(forecast.dt * 1000);              // UNIX
                const temp = Math.round(forecast.main.temp - 273.15);   // kelviny na stupne
                const description = forecast.weather[0].description;    // popis pocasi
                const iconCode = forecast.weather[0].icon;              // kod obrazki predpovedi
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;  //obrazek ikony

                forecastHTML += `                                       
                    <table class="fiveDaysTable">
                        <tr>
                            <td class="align-left">${dateFormatter.format(date)}</td>
                            <td class="align-center">${temp}°</td>
                            <td class="align-center"><img src="${iconUrl}" alt="${description}"></td>
                            <td class="align-left">${description}</td>
                        </tr>
                    </table>
                `;                                                       // kod pro zobrazeni tabulky 
            }

            this.forecastDiv.innerHTML = forecastHTML;                  // zobrazeni tabulky v html

        }
    }
}


const app = new PocasickoApp('64f60853740a1ee3ba20d0fb595c97d5');  // APIklic pro PocasickoAPP