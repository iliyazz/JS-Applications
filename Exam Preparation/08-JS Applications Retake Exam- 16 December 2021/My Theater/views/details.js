import { deleteById, getById, addLike, totalLikes, userLikes } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";

/*{
  title,
  date,
  author,
  imageUrl,
  description
}*/
let countLikes;
async function detailsTemplate(item, user, onDelete, onLike) {
    countLikes = await totalLikes(item._id);
    let userCountLikes;
    if (user) {
        userCountLikes = await userLikes(item._id, user._id);
    }

    return html`
    <section id="detailsPage">
        <div id="detailsBox">
            <div class="detailsInfo">
                <h1>Title: ${item.title}</h1>
                <div>
                    <img src=${item.imageUrl} />
                </div>
            </div>
    
            <div class="details">
                <h3>Theater Description</h3>
                <p>${item.description}</p>
                <h4>Date: ${item.date}</h4>
                <h4>Author: ${item.author}</h4>
                <div class="buttons">
                    ${user?._id == item._ownerId
                ? html`
                    <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                    <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
                : null}
                    ${user && (user._id !== item._ownerId) && userCountLikes == 0
                ? html`<a class="btn-like" href="javascript:void(0)" @click=${onLike}>Like</a>`
                : null}
    
                </div>
                <p class="likes">Likes: ${countLikes}</p>
            </div>
        </div>
    </section>
    `}


export async function showDetails(ctx) {
    let item = await getById(ctx.params.id);

    async function onLike(e) {
        e.preventDefault();
        document.querySelector('.likes').textContent = `Likes: ${countLikes + 1}`
        document.querySelector('.btn-like').remove();
        await addLike({ theaterId: item._id });
        ctx.page.redirect(`/details/${item._id}`);
    }

    async function onDelete(e) {
        e.preventDefault();
        const choice = confirm('Are you sure you want to delete?');
        if (choice) {
            await deleteById(ctx.params.id);
            ctx.page.redirect('/catalog');
        }
    }
    ctx.render(await detailsTemplate(item, ctx.user, onDelete, onLike));
}


