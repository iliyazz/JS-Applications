import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';

const catalogTemplate = (items) => html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${items.length > 0
        ? html`
    <!-- Display div: with information about every game (if any) -->
    ${items.map(x => cardTemplate(x))}
    `
        : html`
    <!-- Display paragraph: If there is no games  -->
    <h3 class="no-articles">No articles yet</h3>
    `}
</section>`;



const cardTemplate = (item) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${item.imageUrl}>
        <h6>${item.category}</h6>
        <h2>${item.title}</h2>
        <a href="/details/${item._id}" class="details-button">Details</a>
    </div>
    </div>`;
export async function showCatalog(ctx) {
    //let hasUser = !!ctx.user;
    const items = await getAll(); //[];

    ctx.render(catalogTemplate(items))//, !!ctx.user));
}
/*{
  title,
  category,
  maxLevel,
  imageUrl,
  summary
}*/




