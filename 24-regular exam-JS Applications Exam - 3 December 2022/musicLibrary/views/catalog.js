import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';

const catalogTemplate = (items) => html`
<section id="dashboard">
        <h2>Albums</h2>
        ${
            items.length > 0
            ? html`
            <!-- Display a li with information about every post (if any)-->
            <ul class="card-wrapper">
            ${items.map(x => cardTemplate(x))}
            
            </ul>`
            : html`
            <!-- Display an h2 if there are no posts -->
            <h2>There are no albums added yet.</h2>`
        }
      </section>`;



export async function showCatalog(ctx) {
    const items = await getAll(); //[];

    ctx.render(catalogTemplate(items))//, !!ctx.user));

}
/*{
  singer,
  album, 
  imageUrl, 
  release, 
  label, 
  sales
}*/
const cardTemplate = (item) => html`
    <li class="card">
        <img src=${item.imageUrl} alt="travis" />
        <p>
        <strong>Singer/Band: </strong><span class="singer">${item.singer}</span>
        </p>
        <p>
        <strong>Album name: </strong><span class="album">${item.album}</span>
        </p>
        <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
    </li>
    `;


