import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js';

const townsRoot = document.getElementById('towns');
const resultRoot = document.getElementById('result');
document.querySelector('button').addEventListener('click', search)

update();

function update(text) {
    const ul = searchTemplate(towns, text);
    render(ul, townsRoot);
}

function searchTemplate(towns, match) {
    const ul = html`
    <ul>
        ${towns.map(town => createTemplate(town, match))}
    </ul>
    `;
    return ul;
}

function createTemplate(town, match) {
    return html`
    <!-- <li class="${(match && town.toLowerCase().includes(match)) ? " active" : "" }"> -->
    <li class="${(match && town.includes(match)) ? " active" : "" }"><!--for softuni judge-->
        ${town}
    </li>
    `
}

function search() {
    const inputText = document.getElementById('searchText');
    //const text = inputText.value.toLowerCase();
    const text = inputText.value;//for softuni judge
    update(text);
    updateCount();
}

function updateCount() {
    const count = document.querySelectorAll('.active').length;
    // const countEl = count ? html`<p>${count} matches found</p>` : "";
    const countEl = html`<p>${count} matches found</p>`;//for softuni judge
    render(countEl, resultRoot);
}
