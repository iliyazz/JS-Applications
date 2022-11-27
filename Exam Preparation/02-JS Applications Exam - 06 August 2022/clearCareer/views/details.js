import { deleteById, getById } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";
import { applyAction, getApplies, getOwnApply } from "../views/apply.js"

/*{
title,
imageUrl, 
category, 
description, 
requirements, 
salary
}*/

const detailsTemplate = (item, applies, hasUser, canApply, isOwner, onDelete, onApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl} alt="example1" />
        <p id="details-title">${item.title}</p>
        <p id="details-category">Category: <span id="categories">${item.category}</span></p>
        <p id="details-salary">Salary: <span id="salary-number">${item.salary}</span></p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${item.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${item.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${applies}</strong></p>
        ${applyControl(item, hasUser, canApply, isOwner, onDelete, onApply)};
    </div>
</section>`;

function applyControl(item, hasUser, canApply, isOwner, onDelete, onApply) {
    if (hasUser == false) {
        return nothing;
    }
    if (canApply) {
        return html`
        <div id="action-buttons">
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a @click=${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>
        </div>`;
    }
    if (isOwner) {
        return html`
            <div id="action-buttons">
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>`;
    }
}



export async function showDetails(ctx) {
    const id = ctx.params.id;
    const request = [getById(id), getApplies(id)];
    const hasUser = Boolean(ctx.user);

    if (hasUser) {
        request.push(getOwnApply(id, ctx.user._id))
    }
    const [item, applies, hasApplies] = await Promise.all(request);

    const isOwner = hasUser && ctx.user._id == item._ownerId;
    const canApply = !isOwner && hasApplies == 0;
    ctx.render(detailsTemplate(item, applies, hasUser, canApply, isOwner, onDelete, onApply));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
    async function onApply() {
        await applyAction(id);
        ctx.page.redirect('/details/' + id);
    }
}



