function solve() {
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    const box = document.querySelector('.info');
    let stoptId = 'depot';
    let currentStop = '';
    const url = `http://localhost:3030/jsonstore/bus/schedule/`;
    async function depart() {
        departBtn.disabled= true;
        arriveBtn.disabled= false;
        const response = await fetch(url + `${stoptId}`);
        const data = await response.json();
        currentStop = data.name;
        box.textContent = `Next stop ${currentStop}`;
        stoptId = data.next;
    }
    function arrive() {
        departBtn.disabled= false;
        arriveBtn.disabled= true;
        box.textContent = `Arriving at ${currentStop}`;
    }
    return {
        depart,
        arrive
    };
}
let result = solve();