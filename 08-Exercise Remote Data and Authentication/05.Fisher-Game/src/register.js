window.addEventListener('load', () => {
    toggleUser();
    document.getElementById('register-form').addEventListener('submit', registerHandler);
})

function toggleUser() {
    const user = document.getElementById('user');
    const guest = document.getElementById('guest');
    const greetingName = document.querySelector('p.email span');
    document.getElementById('register').style.display = 'inline-block';
    document.querySelectorAll('a').forEach(x => x.classList.remove('active'));
    document.getElementById('register').classList.add('active');
    const userData = JSON.parse(sessionStorage.getItem('accessToken'));
    if (userData) {
        user.style.display = 'inline-block';
        guest.style.display = 'none';
        greetingName.textContent = userData.email;
    } else {
        user.style.display = 'none';
        guest.style.display = 'inline-block';
        greetingName.textContent = 'guest';
    }
}

document.querySelectorAll('a').forEach(x => x.classList.remove('active'));
document.getElementById('login').classList.add('active');

async function registerHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password, rePass } = Object.fromEntries(formData);
    try {
        if (email === '' || password === '' || rePass === '') {
            throw new Error('All fields are required!');
        }
        if (password !== rePass) {
            throw new Error('Passwords must be equal!');
        }
    } catch (err) {
        alert(err.message);
    }
    await onRegister(email, password);
}

async function onRegister(email, password) {
    const url = 'http://localhost:3030/users/register';
    try {
        const response = await fetch(url,
            {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }
        sessionStorage.setItem('email', data.email)
        sessionStorage.setItem('accessToken', data.accessToken)
        sessionStorage.setItem('_id', data._id)
        window.location = './index.html';
        return data
    }
    catch (e) {
        pError.textContent = e;
        setTimeout(() => {
            pError.textContent = '';
        }, 1000)
    }
}