import { logout } from "../src/api/user.js";
import { html, render, page } from "../src/lib.js";
import { getUserData } from "../src/util.js";

const nav = document.querySelector('nav');

const navTemplate = (hasUser) => html`
<img src="./images/headphones.png">
<a href="/">Home</a>
<ul>
    <!--All user-->
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>

    ${hasUser
        ? html`
    <!--Only user-->
    <li><a href="/create">Create Album</a></li>
    <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`
        : html`
    <!--Only guest-->
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>`
    }
</ul>`;


export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), nav)
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}