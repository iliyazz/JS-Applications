import { deleteById, getById } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";
import { donateAction, getDonates, getOwnDonate } from "./donate.js"

/*{
  title,
  description,
  imageUrl,
  address,
  phone
}*/


const detailsTemplate = (item, applies, hasUser, canDonate, isOwner, onDelete, onDonate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src=${item.imageUrl} alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${item.title}</h2>
                <p class="post-description">Description: ${item.description}</p>
                <p class="post-address">Address: ${item.address}</p>
                <p class="post-number">Phone number: ${item.phone}</p>
                <p class="donate-Item">Donate Materials: ${applies}</p>
                ${donateControl(item, hasUser, canDonate, isOwner, onDelete, onDonate)}
            </div>
        </div>
    </div>
</section>`;






function donateControl(item, hasUser, canDonate, isOwner, onDelete, onDonate) {
    if (hasUser == false) {
        return nothing;
    }
    if (canDonate) {
        return html`
        <div class="btns">
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>
        </div>`;
    }
    if (isOwner) {
        return html`
            <div class="btns">
                <!--Edit and Delete are only for creator-->
                <a href="/edit/${item._id}" class="edit-btn btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>
            </div>`;
    }
}



export async function showDetails(ctx) {
    const id = ctx.params.id;
    const request = [getById(id), getDonates(id)];
    const hasUser = Boolean(ctx.user);

    if (hasUser) {
        request.push(getOwnDonate(id, ctx.user._id))
    }
    const [item, applies, hasDonates] = await Promise.all(request);

    const isOwner = hasUser && ctx.user._id == item._ownerId;
    const canDonate = !isOwner && hasDonates == 0;
    ctx.render(detailsTemplate(item, applies, hasUser, canDonate, isOwner, onDelete, onDonate));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
    async function onDonate() {
        await donateAction(id);
        ctx.page.redirect('/details/' + id);
    }
}


