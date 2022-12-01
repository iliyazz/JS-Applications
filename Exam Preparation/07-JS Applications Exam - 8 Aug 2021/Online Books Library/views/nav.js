import { logout } from "../src/api/user.js";
import { html, render, page } from "../src/lib.js";
import { getUserData } from "../src/util.js";

const nav = document.querySelector('nav');

const navTemplate = (hasUser) => html`
<section class="navbar-dashboard">
    <a href="/catalog">Dashboard</a>
    ${
        !hasUser
        ? html`
        <!-- Guest users -->
    <div id="guest">
        <a class="button" href="/login">Login</a>
        <a class="button" href="/register">Register</a>
    </div>`
    : html`
    <!-- Logged-in users -->
    <div id="user">
        <span>Welcome, ${hasUser.email}</span>
        <a class="button" href="/myBook">My Books</a>
        <a class="button" href="/create">Add Book</a>
        <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
    </div>`
    }
</section>`;


export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), nav)
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}