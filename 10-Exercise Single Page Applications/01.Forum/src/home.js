import { showDetails } from "./details.js";

const container = document.querySelector('.container');
const content = document.querySelector('main');
const commentsContainer = content.querySelector('div.topic-container');
const form = content.querySelector('form');
form.addEventListener('submit', onSubmit);
content.remove();


export async function showHome() {
    container.replaceChildren(content);
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        commentsContainer.replaceChildren(...Object.values(data).map(topicElement));
    } catch (err) {
        alert(err.message);
        commentsContainer.replaceChildren('');
    }
}

function topicElement(data) {
    const div = document.createElement('div');
    div.className = "topic-name-wrapper";
    div.innerHTML =
        `<div class="topic-name">
            <a href="#" class="normal" data-id="${data._id}">
                <h2>${data.title}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date:
                        <time>${data.postTime}</time>
                    </p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>
            </div>
        </div>`
    div.addEventListener('click', onDetails)
    return div
}

function onDetails(e) {
    let target = e.target;
    if (target.tagName === 'H2') {
        target = target.parentElement;
    }
    if (target.tagName === 'A') {
        debugger
        showDetails(target.dataset.id);
    }
}

async function onSubmit(e) {
    e.preventDefault();
    if (e.submitter.className === 'cancel') {
        form.reset();
        return;
    }

    const formData = new FormData(form);
    const { topicName, username, postText } = Object.fromEntries(formData);

    try {
        if (topicName.trim() === '' || username.trim() === '' || postText.trim() === '') {
            throw Error('All fields are required!')
        };
        const response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts',
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: topicName,
                    username: username,
                    content: postText,
                    postTime: new Date()
                })
            });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }

        commentsContainer.appendChild(topicElement(data));
        form.reset();

    } catch (err) {
        alert(err.message);
    }
}
