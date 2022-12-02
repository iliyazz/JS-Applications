import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";


const editTemplate = (item, onEdit) => html`
<section id="editPage">
    <form @submit=${onEdit} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${item.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${item.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" .value=${item.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description"
                placeholder="Description">${item.description}</textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                .value=${item.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>`;

// const editTemplate = (item, onEdit) => html`
// <section id="edit-page" class="edit">
//     <form @submit=${onEdit} id="edit-form" action="#" method="">
//         <fieldset>
//             <legend>Edit my Book</legend>
//             <p class="field">
//                 <label for="title">Title</label>
//                 <span class="input">
//                     <input type="text" name="title" id="title" .value=${item.title}>
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="description">Description</label>
//                 <span class="input">
//                     <textarea name="description" id="description">${item.description}</textarea>
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="image">Image</label>
//                 <span class="input">
//                     <input type="text" name="imageUrl" id="image" .value=${item.imageUrl}>
//                 </span>
//             </p>
//             <p class="field">
//                 <label for="type">Type</label>
//                 <span class="input">
//                     <select id="type" name="type" value="Fiction">
//                         <option value="Fiction" selected>Fiction</option>
//                         <option value="Romance">Romance</option>
//                         <option value="Mistery">Mistery</option>
//                         <option value="Classic">Clasic</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </span>
//             </p>
//             <input class="button submit" type="submit" value="Save">
//         </fieldset>
//     </form>
// </section>`;


/*{
  title,
  date,
  author,
  imageUrl,
  description
}*/
export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ title, date, author, imageUrl, description }, form) {
        if ([title, date, author, imageUrl, description].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await editItem(id, {
            title,
            date,
            author,
            imageUrl,
            description
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}

