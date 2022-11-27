import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";

/*{
  title,
  description,
  imageUrl,
  address,
  phone
}*/
const editTemplate = (item, onEdit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" .value=${item.title}>
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" .value=${item.description}>
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" .value=${item.imageUrl}>
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" .value=${item.address}>
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" .value=${item.phone}>
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`;


export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ title, description, imageUrl, address, phone }, form) {
        if ([title, description, imageUrl, address, phone].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await editItem(id, {
            title,
            description,
            imageUrl,
            address,
            phone
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}

