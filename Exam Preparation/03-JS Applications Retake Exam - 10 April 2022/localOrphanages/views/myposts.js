import { getAll, getMyPosts } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';


const catalogTemplate = (items) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    <!-- Display a div with information about every post (if any)-->
    <div class="my-posts">
        ${items.length > 0
        ? html`
        <!-- Display a div with information about every post (if any)-->
        ${items.map(x => cardTemplate(x))}`
        : html`
        <!-- Display an h1 if there are no posts -->
        <h1 class="title no-posts-title">You have no posts yet!</h1>`
        }
    </div>
</section>`;

const example = html`<section id="my-posts-page">
    <h1 class="title">My Posts</h1>
    <!-- Display a div with information about every post (if any)-->
    <div class="my-posts">
        <div class="post">
            <h2 class="post-title">Clothes</h2>
            <img class="post-image" src="./images/clothes.jpeg" alt="Material Image">
            <div class="btn-wrapper">
                <a href="#" class="details-btn btn">Details</a>
            </div>
        </div>
    </div>
    <!-- Display an h1 if there are no posts -->
    <h1 class="title no-posts-title">You have no posts yet!</h1>
</section>`



export async function showMyPosts(ctx) {
    const items = await getMyPosts(ctx.user._id); //[];

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



