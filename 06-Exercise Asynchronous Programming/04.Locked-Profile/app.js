let mainTag = document.getElementById("main");
async function lockedProfile() {
    const urlGet = "http://localhost:3030/jsonstore/advanced/profiles";
    mainTag.innerHTML = "";
    const response = await fetch(urlGet);
    const data = Object.values(await response.json());
    createCard(data);
    showHide();
}
function showHide() {
    let buttons = document.querySelectorAll('div button');
    let id = 0;
    Array.from(buttons).map(x => {
        id++;
        let button = x;
        let divProfile = button.parentElement;
        let lockedRadioInput = divProfile.querySelector('input[value="lock"]');
        let hiddenFields = divProfile.querySelector(`#user1HiddenFields`);
        button.addEventListener('click', () => {
            if (!lockedRadioInput.checked && button.textContent === 'Show more') {
                hiddenFields.style.display = 'block';
                button.textContent = 'Hide it';
            } else if (!lockedRadioInput.checked && button.textContent === 'Hide it') {
                hiddenFields.style.display = 'none';
                button.textContent = 'Show more';
            }
        });
    })
}
function createCard(data) {
    let id = 0;
    data.map(x => {
        const divProfile = elem('div', null, 'profile');
        id++;
        divProfile.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
                                    <label>Lock</label>
                                    <input type="radio" name="user${id}Locked" value="lock" checked>
                                    <label>Unlock</label>
                                    <input type="radio" name="user${id}Locked" value="unlock"><br>
                                    <hr>
                                    <label>Username</label>
                                    <input type="text" name="user${id}Username" value="${x.username}" disabled readonly />
                                    <div id="user1HiddenFields" style="display:none">
                                        <hr>
                                        <label>Email:</label>
                                        <input type="email" name="user${id}Email" value="${x.email}" disabled readonly />
                                        <label>Age:</label>
                                        <input type="email" name="user${id}Age" value="${x.age}" disabled readonly />
                                    </div>
                                    <button>Show more</button>`;
        mainTag.appendChild(divProfile);
    })
}
function elem(tag, text = null, className = null) {
    let el = document.createElement(tag);
    if (text) { el.textContent = text; }
    if (className) { el.className = className; }
    return el;
}