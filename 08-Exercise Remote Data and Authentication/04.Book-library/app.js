let url = 'http://localhost:3030/jsonstore/collections/books';
document.getElementById('loadBooks').addEventListener('click', onLoad);
let tbody = document.querySelector('tbody');
Array.from(tbody.querySelectorAll('button')).map(x => {
    if (x.textContent === 'Edit') { x.addEventListener('click', edit); }
    else if (x.textContent === 'delete') { x.addEventListener('click', deleteBook); }
});

const formElement = document.querySelector('form');
formElement.addEventListener('submit', onSubmit);


async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(formElement);
    const entries = [...data.entries()];
    let isEmptyFields = false;
    entries.forEach(x => {if (x[1].trim() === '') {isEmptyFields = true;}})
    if (isEmptyFields) {return;}
    if (document.querySelector('form button').textContent === 'Save') {
        onSave(e); return;}
    await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "author": entries[1][1],
            "title": entries[0][1]
        })
    })

    e.target.reset();
}


async function onSave(e) {
    id = sessionStorage.getItem('idForEditedBook');
    let title = document.querySelector('[name="title"]').value;
    let author = document.querySelector('[name="author"]').value;
    let object = { author: author, title: title };
    const response = await fetch(`${url}/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
    })
    document.querySelector('form').reset();
    document.querySelector('form h3').textContent = 'FORM';
    document.querySelector('form button').textContent = 'Submit';
}


async function onLoad() {
    let response = await fetch(url);
    let data = await response.json()
    await createTableData(Object.entries(data));
}


function createTableData(data) {
    tbody.innerHTML = '';
    Object.entries(data).map(x => {
        let tr = document.createElement('tr');
        let tdAuthor = document.createElement('td');
        tdAuthor.innerText = x[1][1].title;
        tr.appendChild(tdAuthor);
        let tdTitle = document.createElement('td');
        tdTitle.textContent = x[1][1].author;
        tr.appendChild(tdTitle);
        let tdButtons = document.createElement('td');
        let editBtn = document.createElement('button');
        editBtn.addEventListener('click', edit);
        editBtn.textContent = 'Edit';
        tdButtons.appendChild(editBtn);
        tdButtons.id = x[1][0];
        let deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', deleteBook);
        deleteBtn.innerText = 'Delete';
        tdButtons.appendChild(deleteBtn);
        tr.appendChild(tdButtons);
        tbody.appendChild(tr);
    })
}


function edit(e) {
    let title = e.target.parentElement.parentElement.children[0].innerText;
    let author = e.target.parentElement.parentElement.children[1].innerText;
    let id = e.target.parentElement.id;
    document.querySelector('[name="title"]').value = title;
    document.querySelector('[name="author"]').value = author;
    document.querySelector('form h3').textContent = 'Edit FORM';
    document.querySelector('form button').textContent = 'Save';
    e.target.parentElement.parentElement.remove();
    sessionStorage.setItem('idForEditedBook', id);
}


async function deleteBook(e) {
    let id = e.target.parentElement.id;
    await fetch(`${url}/${id}`, {
        method: 'delete',
    });
    e.target.parentNode.parentNode.remove();
}



function createTag(tag, text = null, className = null, id = null, type = null) {
    let el = document.createElement(tag);
    if (text) { el.textContent = text; }
    if (type) { el.type = type; }
    if (id) { el.id = id; }
    if (className) { el.className = className; }
    return el;
}