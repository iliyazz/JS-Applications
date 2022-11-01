

async function getInfo() {
    const stopId = document.getElementById('stopId');
    const busId = stopId.value;
    stopId.value = null;
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId}`;
    const stopName = document.getElementById('stopName');
    const buses = document.getElementById('buses');

    try {
        const response = await fetch(url);
        const data = await response.json();
        stopName.textContent = data.name;
        buses.innerHTML = "";
        Object.entries(data.buses).map(([busNum, time]) => {
            buses.appendChild(elem("li", "", `Bus ${busNum} arrives in ${time} minutes`));
        });
    }
    catch(err){
        stopName.textContent = 'Error'
        buses.innerHTML = "";
    }




}



function elem(type, attributes, ...content) {
    const result = document.createElement(type);
    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(el => {
        if (typeof el == 'string' || typeof el == 'number') {
            const node = document.createTextNode(el);
            result.appendChild(node);
        } else {
            result.appendChild(el);
        }
    });
    return result;
}

module.exports = getInfo;