import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';


const catalogTemplate = (items) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    <div class="all-posts">
        ${items.length > 0
        ? html`
        <!-- Display a div with information about every post (if any)-->
        ${items.map(x => cardTemplate(x))}`
        : html`
        <h1 class="title no-posts-title">No posts yet!</h1>`
        }
    </div>
</section>`;


export async function showCatalog(ctx) {
    const items = await getAll(); //[];

    ctx.render(catalogTemplate(items))//, !!ctx.user));
}

const cardTemplate = (item) => html`
    <div class="post">
        <h2 class="post-title">${item.title}</h2>
        <img class="post-image" src=${item.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${item._id}" class="details-btn btn">Details</a>
        </div>
    </div>`;

/*{
  title,
  description,
  imageUrl,
  address,
  phone
}*/



