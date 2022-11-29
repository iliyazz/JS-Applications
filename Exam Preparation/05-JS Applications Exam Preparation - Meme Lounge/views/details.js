import { deleteById, getById } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";

/*{
  title,
  description,
  imageUrl
}*/
const detailsTemplate = (item, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${item.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${item.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${item.description}</p>
            ${
                isOwner
                ? html`
                <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            <a class="button warning" href="/edit/${item._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>`
            : nothing
            }
        </div>
    </div>
</section>`;



export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const isOwner = item._ownerId === ctx.user?._id;
    ctx.render(detailsTemplate(item, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/home');
        }
    }

}

