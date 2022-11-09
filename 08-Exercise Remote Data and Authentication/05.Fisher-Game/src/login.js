document.getElementById('login-form').addEventListener('submit', loginHandler);
document.querySelectorAll('a').forEach(x => x.classList.remove('active'));
document.getElementById('login').classList.add('active');
document.getElementById('user').style.display = 'none';
const pError = document.querySelector('p.notification');
function loginHandler(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData);
    onLogin(email, password);
}



async function onLogin(email, password) {
    const url = 'http://localhost:3030/users/login';
    const body = {
        email,
        password
    };
    // debugger
    try{

        const header = getHeader('post', body);
        const response = await fetch(url, header);
        const data = await response.json();
        if (data.email == '' || data.password == '') {
            return alert('All fields are required!');
        }
        else if(data.password !== password){
            throw new Error(data.message);
        }
        sessionStorage.setItem('email', data.email)
        sessionStorage.setItem('accessToken', data.accessToken)
        sessionStorage.setItem('_id', data._id)
        window.location = './index.html';
        return data;
    }
    catch(e){
        pError.textContent = e;
        setTimeout(() => {
            pError.textContent = '';
        }, 2000)
    }
}

function getHeader(method, body) {
    return {
        method: `${method}`,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}