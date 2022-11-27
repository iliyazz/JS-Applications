import { register } from '../src/api/user.js';
import { html } from '../src/lib.js';
import { createSubmitHandler } from '../src/util.js';


const registerTemplate = (onRegister) => html`
<section id="register-page" class="auth">
    <form @submit=${onRegister} id="register">
        <h1 class="title">Register</h1>

        <article class="input-group">
            <label for="register-email">Email: </label>
            <input type="email" id="register-email" name="email">
        </article>

        <article class="input-group">
            <label for="register-password">Password: </label>
            <input type="password" id="register-password" name="password">
        </article>

        <article class="input-group">
            <label for="repeat-password">Repeat Password: </label>
            <input type="password" id="repeat-password" name="repeatPassword">
        </article>

        <input type="submit" class="btn submit-btn" value="Register">
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