import { editItem, getById } from "../src/api/data.js";
import { html } from "../src/lib.js";
import { createSubmitHandler } from "../src/util.js";




const editTemplate = (item, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onEdit} class="edit-form">
            <input type="text" name="title" id="job-title" placeholder="Title" .value=${item.title}>
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" .value=${item.imageUrl}>
            <input type="text" name="category" id="job-category" placeholder="Category" .value=${item.category}>
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"
                .value=${item.description}></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4" cols="50"
                .value=${item.requirements}></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" .value=${item.salary}>

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

/*{
title,
imageUrl,
category,
description,
requirements,
salary
}*/



export async function showEdit(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    ctx.render(editTemplate(item, createSubmitHandler(onEdit)));

    async function onEdit({ title, imageUrl, category, description, requirements, salary }, form) {
        if ([title, imageUrl, category, description, requirements, salary].some(x => x == '')) {
            return alert('All fields are required!');
        }
        await editItem(id, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });
        form.reset();
        ctx.page.redirect('/details/' + id);
    }
}

