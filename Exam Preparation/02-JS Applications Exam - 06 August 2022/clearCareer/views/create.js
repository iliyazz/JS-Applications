import { createItem } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js"


const createTemplate = (onCreate) => html`
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form @submit=${onCreate} class="create-form">
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate(data, form) {
        const {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        } = data;

        if ([title, imageUrl, category, description, requirements, requirements, salary].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await createItem(data
        );
        form.reset();
        ctx.page.redirect('/catalog');
    }
}

/*{
title,
imageUrl,
category,
description,
requirements,
salary
}*/



// const createTemplate = (onCreate) => html`
// <section id="create">
//     <div class="form">
//         <h2>Add item</h2>
//         <form @submit=${onCreate} class="create-form">
//             <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
//             <input type="text" name="model" id="shoe-model" placeholder="Model" />
//             <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
//             <input type="text" name="release" id="shoe-release" placeholder="Release date" />
//             <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
//             <input type="text" name="value" id="shoe-value" placeholder="Value" />

//             <button type="submit">post</button>
//         </form>
//     </div>
// </section>`;


// export function showCreate(ctx) {
//     ctx.render(createTemplate(createSubmitHandler(onCreate)));

//     async function onCreate(data, form) {
//         const {
//             brand,
//             model,
//             imageUrl,
//             release,
//             designer,
//             value
//           } = data;

//         if ([brand, model, imageUrl, release, designer, value].some(x => x == '')) {
//             return alert('All fields are required!');
//         }
//         await createItem(data
//         );
//         form.reset();
//         ctx.page.redirect('/catalog');
//     }
// }