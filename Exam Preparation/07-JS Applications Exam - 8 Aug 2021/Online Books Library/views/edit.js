import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";



const editTemplate = (item, onEdit) => html`
<section id="edit-page" class="edit">
    <form @submit=${onEdit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value=${item.title}>
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description">${item.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value=${item.imageUrl}>
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" value="Fiction">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;


/*{
  title,
  description,
  imageUrl,
  type
}*/
export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ title, description, imageUrl, type }, form) {
        if ([title, description, imageUrl, type].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await editItem(id, {
            title,
            description,
            imageUrl,
            type
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}

