import { logout } from "../src/api/user.js";
import { html, render, page } from "../src/lib.js";
import { getUserData } from "../src/util.js";

const nav = document.querySelector('nav');

const navTemplate = (hasUser) => html`
<a href="/catalog">All Memes</a>
${
    hasUser
    ? html`
    <!-- Logged users -->
    <div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${hasUser.email}</span>
            <a href="/myProfile">My Profile</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>
    </div>`
    : html`
    <!-- Guest users -->
    <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="register">Register</a>
        </div>
        <a class="active" href="/home">Home Page</a>
    </div>`
}`;


export function updateNav() {
    const user = getUserData();
    render(navTemplate(user), nav);
    page.redirect('/home')
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/home');
}