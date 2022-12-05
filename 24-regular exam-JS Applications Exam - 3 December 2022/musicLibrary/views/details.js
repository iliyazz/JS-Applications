import { deleteById, getById, addLike, totalLikes, userLikes } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";

/*{
  singer,
  album, 
  imageUrl, 
  release, 
  label, 
  sales
}*/




async function detailsTemplate(item, user, onDelete, onLike) {
    let countLikes = await totalLikes(item._id);
    let userCountLikes;
    if (user) { userCountLikes = await userLikes(item._id, user._id); }

    return html`
    <section id="details">
        <div class="book-information">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${item.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${item.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${item.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${item.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${item.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${item.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${countLikes}</span></div>
    
            <div id="action-buttons">
                ${user?._id == item._ownerId
                ? html`
    
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                `
                : null}
                ${user && user._id !== item._ownerId && userCountLikes == 0
                ? html`<a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>`
                : null}
    
            </div>
    </section>
`}





export async function showDetails(ctx) {
    let item = await getById(ctx.params.id);

    async function onLike(e) {
        e.preventDefault();
        await addLike({ albumId: item._id })

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