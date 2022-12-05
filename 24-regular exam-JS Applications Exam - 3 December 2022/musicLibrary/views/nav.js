import { logout } from "../src/api/user.js";
import { html, render, page } from "../src/lib.js";
import { getUserData } from "../src/util.js";

const nav = document.querySelector('nav');

const navTemplate = (hasUser) => html`
<div>
          <a href="/catalog">Dashboard</a>
        </div>
        ${
            hasUser
            ? html`
        <!-- Logged-in users -->
        <div class="user">
          <a href="/create">Add Album</a>
          <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>`
        : html`
        <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
        `
        }`;



export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), nav)
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}