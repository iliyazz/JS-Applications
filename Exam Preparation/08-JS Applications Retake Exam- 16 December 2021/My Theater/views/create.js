import { createItem } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js"


const createTemplate = (onCreate) => html`
<section id="createPage">
    <form @submit=${onCreate} class="create-form">
        <h1>Create Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" value="">
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year">
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author">
        </div>
        <div>
            <label for="description">Description:</label>
            <textarea id="description" name="description" placeholder="Description"></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>`;


/*{
  title,
  date,
  author,
  imageUrl
  description,
}*/

export function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate(data, form) {
        const {
            title,
            date,
            author,
            imageUrl,
            description
        } = data;

        if ([title, date, author, imageUrl, description].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await createItem(data
        );
        form.reset();
        ctx.page.redirect('/catalog');
    }
}



