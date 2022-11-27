import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';


const catalogTemplate = (items) => html`
<section id="dashboard">
<h2>Collectibles</h2>
    ${
        items.length > 0
        ? html`
        <ul class="card-wrapper">
             <!-- Display a li with information about every post (if any)-->
            ${  items.map(x => cardTemplate(x))}
        </ul>
        `
        : html`
    <!-- Display an h2 if there are no posts -->
    <h2>There are no items added yet.</h2>`
        }
</section>`;

const cardTemplate = (item) => html`
        <li class="card">
            <img src=${item.imageUrl} alt="travis" />
            <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
            </p>
            <p>
                <strong>Model: </strong><span class="model">${item.model}</span>
            </p>
            <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>`;


// const {
//     brand,
//     model, 
//     imageUrl, 
//     release, 
//     designer, 
//     value
//   }

export async function showCatalog(ctx) {
    const items = await getAll(); //[]; 

    ctx.render(catalogTemplate(items))//, !!ctx.user));
}


