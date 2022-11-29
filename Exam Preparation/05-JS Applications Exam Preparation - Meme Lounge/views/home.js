import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';

//<!-- Welcome Page ( Only for guest users ) -->
const homeTemplate = () => html`
<section id="welcome">
    <div id="welcome-container">
        <h1>Welcome To Meme Lounge</h1>
        <img src="/images/welcome-meme.jpg" alt="meme">
        <h2>Login to see our memes right away!</h2>
        <div id="button-div">
            <a href="/login" class="button">Login</a>
            <a href="/register" class="button">Register</a>
        </div>
    </div>
</section>`;

const catalogTemplate = (items) => html`
<!-- All Memes Page ( for Guests and Users )-->
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${items.length > 0
            ? html`
        <!-- Display : All memes in database ( If any ) -->
            ${items.map(x => cardTemplate(x))}
        `
        : html`
        <!-- Display : If there are no memes in database -->
        <p class="no-memes">No memes in database.</p>`
        }
    </div>
</section>`;

const cardTemplate = (item) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${item.title}</p>
            <img class="meme-image" alt="meme-img" src=${item.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${item._id}">Details</a>
        </div>
    </div>
</div>`;

/*{
  title,
  description,
  imageUrl
}*/


export async function showHome(ctx) {
    ctx.render(homeTemplate())
}





