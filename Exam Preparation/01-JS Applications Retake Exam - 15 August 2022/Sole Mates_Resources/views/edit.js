import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";







const editTemplate = (item, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" .value=${item.brand}>
            <input type="text" name="model" id="shoe-model" placeholder="Model" .value=${item.model}>
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" .value=${item.imageUrl}>
            <input type="text" name="release" id="shoe-release" placeholder="Release date" .value=${item.release}>
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" .value=${item.designer}>
            <input type="text" name="value" id="shoe-value" placeholder="Value" .value=${item.value}>

            <button type="submit">post</button>
        </form>
    </div>
</section>`;





export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ brand, model, imageUrl, release, designer, value }, form) {
        if ([brand, model, imageUrl, release, designer, value].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await editItem(id, {
            brand,
            model,
            imageUrl,
            release,
            designer,
            value
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}
// export async function showEdit(ctx) {
//     const id = ctx.params.id;
//     const item = await getById(id);

//     ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

//     async function onEdit({ name, imgUrl, price, releaseDate, artist, genre, description }, form) {
//         if ([name, imgUrl, price, releaseDate, artist, genre, description].some(x => x == '')) {
//             return alert('All fields are required!');
//         }
//         await editItem(id, {
//             name,
//             imgUrl,
//             price,
//             releaseDate,
//             artist,
//             genre,
//             description
//         });
//         form.reset();
//         ctx.page.redirect('/details/' + id);
//     }
// }

