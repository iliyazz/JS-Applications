import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';

const catalogTemplate = (items) => html`
<section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            ${
                items.length > 0
                ? html`
                    <!-- Display ul: with list-items for All books (If any) -->
                <ul class="other-books-list">
                    ${items.map(x => cardTemplate(x))}
                
                </ul>`
                : html`
                <!-- Display paragraph: If there are no books in the database -->
                <p class="no-books">No books in database!</p>`
            }
            
        </section>`;


export async function showCatalog(ctx) {
    const items = await getAll(); //[];

    ctx.render(catalogTemplate(items))//, !!ctx.user));

}

const cardTemplate = (item) => html`
    <li class="otherBooks">
        <h3>${item.title}</h3>
        <p>${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <a class="button" href="/details/${item._id}">Details</a>
    </li>`;

/*{
  title,
  description,
  imageUrl,
  type
}*/

