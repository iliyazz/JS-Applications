import { html, render } from './node_modules/lit-html/lit-html.js';
const rootMenu = document.getElementById('menu');
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';
const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

onLoad();
async function onLoad() {
    const response = await fetch(url);
    const data = await response.json();
    const result = Object.values(data).map(option => createOptionTemplate(option));
    render(result, rootMenu);
}

function createOptionTemplate(option) {
    return html`
        <option value=${option._id}>${option.text}</option>
    `
}

function onSubmit(e) {
    e.preventDefault();
    const value = document.getElementById('itemText').value;
    value && addItem(value);
}

async function addItem(value) {
    const response = await fetch(url, {
        method: "post",
        headers: {
             "Content-Type": "application/json" 
            },
        body: JSON.stringify({ text: value })
    })
    form.reset();
    onLoad();
}