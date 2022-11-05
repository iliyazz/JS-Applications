async function solution() {
    const main = document.querySelector('#main');
    try {
        let url = 'http://localhost:3030/jsonstore/advanced/articles/list';
        let responseId = await fetch(url);
        let dataId = await responseId.json();
        dataId.map(x => {
            let articleElement = document.createElement('div');
            articleElement.className = 'accordion';
            articleElement.innerHTML = `
            <div class="head">
                <span>${x.title}</span>
                <button class="button" id="${x._id}">More</button>
            </div>
            <div class="extra"></div>`
            let button = articleElement.querySelector('button');
            button.addEventListener('click', showHide);
            main.appendChild(articleElement);
        })
    } catch (er) {
        console.log(er.message);
    }
}
async function showHide(e) {
    let currentArticle = e.target.parentNode.parentNode;
    let id = e.target.id;
    let dataExtra = currentArticle.querySelector('div.extra');
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
        let data = await response.json();
        dataExtra.innerHTML = `<p>${data.content}</p>`;
        if (e.target.textContent == 'More') {
            e.target.textContent = 'Less';
            dataExtra.style.display = 'block';
        } else {
            e.target.textContent = 'More';
            dataExtra.style.display = 'none';
        }
    } catch (er) {
        console.log(er.message);
    }
}
solution();