function attachEvents() {
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    let current = document.getElementById('current');
    let upcoming = document.getElementById('upcoming');
    let forecast = document.getElementById('forecast');
    let divCurrent = elem('div', null, 'forecast');
    let divUpcoming = elem('div', null, 'forecast-info');

    const enums = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    }
    document.getElementById('submit').addEventListener('click', getInfo);
    async function getInfo() {
        divCurrent.innerHTML = '';
        divUpcoming.innerHTML = '';
        let location = document.getElementById('location');
        try {

            let responseLocation = await fetch(url);
            let dataLocation = await responseLocation.json();
            debugger
            let code = dataLocation.find(x => x.name === location.value).code

            let today = await (await fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)).json();
            let threeDay = await (await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)).json();

            createCurrentForecast(today);
            threeDayForecast(threeDay);
        }
        catch (err) {
            divCurrent.innerHTML = '';
            divUpcoming.innerHTML = '';
            forecast.style.display = 'block';
            let span = document.createElement('span');
            span.textContent = 'Error';
            forecast.appendChild(span)
        }
    }
    function createCurrentForecast(today) {
        forecast.style.display = 'block';
        divCurrent.appendChild(elem('span', enums[today.forecast.condition], 'condition symbol'));
        let spanData = elem('span', null, 'condition')
        divCurrent.appendChild(spanData);
        spanData.appendChild(elem('span', today.name, 'forecast-data'));
        spanData.appendChild(elem('span', `${today.forecast.low}${enums.Degrees}/${today.forecast.high}${enums.Degrees}`, 'forecast-data'));
        spanData.appendChild(elem('span', today.forecast.condition, 'forecast-data'));
        current.appendChild(divCurrent);
    }
    function threeDayForecast(threeDay) {
        for (let x of threeDay.forecast) {
            let span = elem('span', null, 'upcoming');
            span.appendChild(elem('span', enums[x.condition], 'symbol'));
            span.appendChild(elem('span', `${x.low}${enums.Degrees}/${x.high}${enums.Degrees}`, 'forecast-data'));
            span.appendChild(elem('span', x.condition, 'forecast-data'))
            divUpcoming.appendChild(span);
        }
        upcoming.appendChild(divUpcoming)
    }
    function elem(tag, text = null, className = null) {
        let el = document.createElement(tag);
        if (text) { el.textContent = text; }
        if (className) { el.className = className; }
        return el;
    }

}

attachEvents();