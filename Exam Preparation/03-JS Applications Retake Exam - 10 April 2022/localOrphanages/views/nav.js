import { logout } from "../src/api/user.js";
import { html, render, page } from "../src/lib.js";
import { getUserData } from "../src/util.js";

const nav = document.querySelector('nav');


const navTemplate = (hasUser) => html`
<a href="/catalog">Dashboard</a>

${
    hasUser
    ? html`
    <!-- Logged-in users -->
    <div id="user">
        <a href="/myPost">My Posts</a>
        <a href="/create">Create Post</a>
        <a @click=${onLogout} href="javascript:void(0)">Logout</a>
    </div>`
    : html`
    <!-- Guest users -->
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`
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