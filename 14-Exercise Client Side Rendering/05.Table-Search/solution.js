import { html, render } from './node_modules/lit-html/lit-html.js';
const url = 'http://localhost:3030/jsonstore/advanced/table';
const root = document.querySelector('tbody');
const table = document.querySelector('table');
solve();
function solve() {
    onLoad();
    document.querySelector('#searchBtn').addEventListener('click', onClick);


    function onClick() {
        const inputField = document.getElementById('searchField');
        const inputText = inputField.value.toLowerCase();
        inputField.value = null;
        updateTable(inputText);
    }
}

function updateTable(inputText) {
    for (let row of table.rows) {
        let isIncludeStr = false;
        for(let cell of row.cells){
            if(cell.textContent.toLocaleLowerCase().includes(inputText)){
                isIncludeStr = true;
                break;
            }
        }
        if(inputText && isIncludeStr){
            row.classList.add('select');
        }
        else{
            row.classList.remove('select');
        }
    }
    onLoad();
}

async function onLoad() {
    const response = await fetch(url);
    const data = await response.json();
    const result = Object.values(data).map(stInfo => createRow(stInfo));
    render(result, root);
}

function createRow(stInfo) {
    return html`
        <tr>
            <td>${stInfo.firstName} ${stInfo.lastName}</td>
            <td>${stInfo.email}</td>
            <td>${stInfo.course}
        </tr>
        </tr>
    `
}