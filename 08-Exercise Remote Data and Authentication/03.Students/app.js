const url = 'http://localhost:3030/jsonstore/collections/students';

const formElement = document.getElementById('form');
formElement.addEventListener('submit', onSubmit);
getData()

async function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(formElement);
    const entries = [...data.entries()]
    let isEmptyFields = false;

    entries.forEach(x => {
        if (x[1].trim() === '') {
            isEmptyFields = true;
        }
    })
    if (isEmptyFields) {
        return;
    }
    // debugger
    await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "firstName": entries[0][1],
            "lastName": entries[1][1],
            "facultyNumber": entries[2][1],
            "grade": entries[3][1]
        })
    }
    )
    e.target.reset();
    getData()
}

async function getData() {
    let response = await fetch(url);
    let data = await response.json();
    await createTableData(data);
}
function createTableData(data) {

    let tableBody = document.getElementById('results').querySelector('tbody');
    tableBody.innerHTML = '';
    Object.entries(data).map(x => {
        let tr = document.createElement('tr');
        let thFirstName = document.createElement('th');
        thFirstName.innerText = x[1].firstName;
        let thLastName = document.createElement('th');
        thLastName.innerText = x[1].lastName;
        let thFacultyNumber = document.createElement('th');
        thFacultyNumber.innerText = x[1].facultyNumber;
        let thGrade = document.createElement('th');
        thGrade.innerText = x[1].grade;
        tr.appendChild(thFirstName);
        tr.appendChild(thLastName);
        tr.appendChild(thFacultyNumber);
        tr.appendChild(thGrade);
        tableBody.appendChild(tr);
    })
}