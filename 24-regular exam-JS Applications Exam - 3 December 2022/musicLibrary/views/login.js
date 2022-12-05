import { login } from '../src/api/user.js';
import { html } from '../src/lib.js';
import { createSubmitHandler } from '../src/util.js';

const loginTemplate = (onLogin) => html`
<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;

// const loginTemplate = (onLogin) => html`
// <section id="login-page" class="login">
//     <form @submit=${onLogin} id="login-form" action="" method="">
//         <fieldset>
//             <legend>Login Form</legend>
//             <p class="field">
//                 <label for="email">Email</label>
//                 <span class="input">
//                     <input type="text" name="email" id="email" placeholder="Email">
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="password">Password</label>
//                 <span class="input">
//                     <input type="password" name="password" id="password" placeholder="Password">
//                 </span>
//             </p>
//             <input class="button submit" type="submit" value="Login">
//         </fieldset>
//     </form>
// </section>`;

export function showLogin(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin({ email, password }) {
        if (email == '' || password == '') {
            return alert('All fields are required!')
            //return notification('All fields are required!')
        }
        await login(email, password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}