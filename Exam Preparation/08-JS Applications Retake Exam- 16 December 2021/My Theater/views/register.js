import { register } from '../src/api/user.js';
import { html } from '../src/lib.js';
import { createSubmitHandler } from '../src/util.js';


const registerTemplate = (onRegister) => html`
<section id="registerPage">
    <form @submit=${onRegister} class="registerForm">
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>`;



export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister(data) {
        if (data.email == '' || data.password == '') {
            return alert('All fields are required!')
        }
        if (data.password != data["repeatPassword"]) {
            return alert('Password don\`t match!')
        }
        await register(data.email, data.password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}