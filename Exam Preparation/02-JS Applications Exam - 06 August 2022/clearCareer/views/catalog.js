import { getAll } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';


const catalogTemplate = (items) => html`
<section id="dashboard">
    <h2>Job Offers</h2>

    ${
        items.length > 0
        ? html`
        <!-- Display a div with information about every post (if any)-->
        ${items.map(x => cardTemplate(x))}
    `
    : html`
    <!-- Display an h2 if there are no posts -->
    <h2>No offers yet.</h2>`
    }
</section>`;

export async function showCatalog(ctx) {
    const items = await getAll(); //[];

    ctx.render(catalogTemplate(items))//, !!ctx.user));
}

const cardTemplate = (item) => html`
    <div class="offer">
        <img src=${item.imageUrl} alt="example1" />
        <p><strong>Title: </strong><span class="title">${item.title}</span></p>
        <p><strong>Salary:</strong><span class="salary">${item.salary}</span></p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
    </div>`;

/*{
title,
imageUrl, 
category, 
description, 
requirements, 
salary
}*/

