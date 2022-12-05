import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";

/*{
  singer,
  album, 
  imageUrl, 
  release, 
  label, 
  sales
}*/
const editTemplate = (item, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${item.singer}/>
            <input type="text" name="album" id="album-album" placeholder="Album" .value=${item.album}/>
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${item.imageUrl}/>
            <input type="text" name="release" id="album-release" placeholder="Release date" .value=${item.release}/>
            <input type="text" name="label" id="album-label" placeholder="Label" .value=${item.label}/>
            <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${item.sales}/>

            <button type="submit">post</button>
        </form>
    </div>
</section>`;




export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ singer, album, imageUrl, release, label, sales }, form) {
        if ([singer, album, imageUrl, release, label, sales].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await editItem(id, {
            singer,
            album,
            imageUrl,
            release,
            label,
            sales
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}

