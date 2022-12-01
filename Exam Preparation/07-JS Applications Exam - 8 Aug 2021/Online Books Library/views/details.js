import { deleteById, getById, addLike, totalLikes, userLikes } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";


async function detailsTemplate(item, user, onDelete, onLike) {
    let countLikes = await totalLikes(item._id);
    let userCountLikes ;
    if (user) {
        userCountLikes = await userLikes(item._id, user._id);
    }

    return html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${item.title}</h3>
        <p class="type">Type: ${item.type}</p>
        <p class="img"><img src="${item.imageUrl}"></p>
        <div class="actions">
            ${user?._id == item._ownerId
            ? html`
            <!-- Edit/Delete buttons ( Only for creator of this book )  -->
            <a class="button" href="/edit/${item._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
            : null}
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            ${user && user._id !== item._ownerId && userCountLikes == 0
            ? html`<a @click=${onLike} class="button" href="javascript:void(0)" >Like</a>`
            : null}
            
            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${countLikes}</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${item.description}</p>
    </div>
</section>
`}

export async function showDetails(ctx) {
    let item = await getById(ctx.params.id);
    
    async function onLike (e) {
        e.preventDefault();
        await addLike({bookId: item._id})

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


