function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);
}
async function onCreate() {
    const person = document.getElementById('person').value;
    const phone = document.getElementById('phone').value;
    await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person, phone })
    });
    document.getElementById('person').value = '';
    document.getElementById('phone').value = '';
    onLoad();
}
async function onLoad() {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();
    await showPhoneBook(Object.values(data));
}
function showPhoneBook(data) {
    const phoneBookUl = document.getElementById('phonebook');
    phoneBookUl.innerHTML = '';
    phoneBookUl.addEventListener('click', deleteRecord);
    data.map(x => {
        const li = document.createElement('li');
        li.textContent = `${x.person}: ${x.phone}`;
        li.id = x._id;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        li.appendChild(deleteBtn);
        phoneBookUl.appendChild(li);
    })
}
async function deleteRecord(e) {
    const currentId = e.target.parentElement.id;
    if (e.target.nodeName === 'BUTTON') {
        await fetch(`http://localhost:3030/jsonstore/phonebook/${currentId}`, {
            method: 'delete'
        });
        document.getElementById(currentId).remove();
    }
}

attachEvents();