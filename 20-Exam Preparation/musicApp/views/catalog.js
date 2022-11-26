import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';

const catalogTemplate = (items, hasUser) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${items.length > 0
        ? items.map(x => cardTemplate(x, hasUser))
            : html`
    <!--No albums in catalog-->
    <p>No Albums in Catalog!</p>`
        }
</section>`;

const cardTemplate = (item, hasUser) => html`
        <div class="card-box">
            <img src=${item.imgUrl}>
            <div>
                <div class="text-center">
                    <p class="name">Name: ${item.name}</p>
                    <p class="artist">Artist: ${item.artist}</p>
                    <p class="genre">Genre: ${item.genre}</p>
                    <p class="price">Price: $${item.price}</p>
                    <p class="date">Release Date: ${item.releaseDate}</p>
                </div>
                ${hasUser 
                ? html`
                <div class="btn-group">
                    <a href="/details/${item._id}" id="details">Details</a>
                </div>`
                : nothing}
            </div>
        </div>`;

export async function showCatalog(ctx) {
    const items =await getAll(); //[]; 

    ctx.render(catalogTemplate(items, !!ctx.user));
}