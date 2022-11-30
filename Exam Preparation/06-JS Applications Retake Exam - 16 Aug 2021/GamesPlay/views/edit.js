import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";
// import { notification } from "./notifications.js";

const editTemplate = (item, onEdit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${item.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value=${item.category}>

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value=${item.maxLevel}>

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value=${item.imageUrl}>

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${item.summary}</textarea>
            <input class="btn submit" type="submit" .value="Edit Game">

        </div>
    </form>
</section>`;


/*{
  title,
  category,
  maxLevel,
  imageUrl,
  summary
}*/

export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ title, category, maxLevel, imageUrl, summary }, form) {
        if ([title, category, maxLevel, imageUrl, summary].some(x => x == '')) {
            return alert('All fields are required!');
            // return notification('All fields are required!');
        }
        await editItem(id, {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}
