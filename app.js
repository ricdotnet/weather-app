const mainBody = document.body; //main body tag

/*
create custom elements and give them ids if necessary
 */
let mainDiv = document.createElement('div'); //main div element
    mainDiv.setAttribute('id', 'main_div'); //set id main_div to main div element

let inputBoxCity = document.createElement('input'); //create a city input box

let mainTitle = document.createElement('h1'); //create main title element

let resultsDiv = document.createElement('div'); //create a div for the city results

let currentStyle = 'dark'; //current page style. for future reference to add a lighter style

/*
styling for the custom divs
 */
function styleMainBody() {
    mainBody.style = 'padding: 0;' +
        'margin: 0;' +
        'background-color: #2c3e50;' +
        'color: white;' +
        'font-family: sans-serif, monospaced;'
}

function styleMainDivDark() {
    mainDiv.style = 'width: 50%;' +
        'margin: 20px auto;' +
        'background-color: #34495e;' +
        'border: 1px solid #111921;' +
        'border-radius: 10px;' +
        'height: auto;' +
        'box-shadow: 0 3px 5px rgba(0,0,0,0.1);' +
        'text-align: center;' +
        'padding: 15px;'
}

let inputBoxCityStyle = 'background-color: rgba(255,255,255,0.2);' +
    'border: none;' +
    'box-shadow: 0 3px 5px rgba(0,0,0,0.3);' +
    'border-radius: 5px;' +
    'padding: 15px;' +
    'width: 50%;' +
    'outline: none;' +
    'color: white;' +
    'font-weight: bold;' +
    'font-size: 16px;';

let mainTitleStyle = 'font-size: 20px;';

/*
give small components their content
 */
mainTitle.textContent = `Write the name of your city and press 'Enter'.`;


function printWeather(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f59095b255decdf854a5ca0e339c7ee4`)
        .then(response => response.json())
        .then(data => {
            if(data.cod === '404') {
                resultsDiv.textContent = `City '${city}' was not found.`
            } else {

                resultsDiv.innerText = `City: ${data.name}, ${data.sys.country}\n
                                            Weather: ${data.weather[0].main} - ${data.weather[0].description}\n
                                            Temperature: ${tempConvert(data.main.temp).toFixed(1)} C`
            }
        })

}

function tempConvert(temp) {
    return temp - 273.15;
}

window.addEventListener('load', event => {

    styleMainBody()
    styleMainDivDark()

    inputBoxCity.style =  inputBoxCityStyle;
    inputBoxCity.placeholder = 'enter a city here';

    mainTitle.style = mainTitleStyle;
    resultsDiv.style = 'padding: 15px;';

    mainBody.appendChild(mainDiv);

    mainDiv.appendChild(mainTitle);
    mainDiv.appendChild(inputBoxCity);
    mainDiv.appendChild(resultsDiv);

    inputBoxCity.addEventListener('keydown', event => {
        if(event.key === 'Enter') {
            printWeather(inputBoxCity.value)
        }
    })
})