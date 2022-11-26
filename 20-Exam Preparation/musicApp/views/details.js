import { deleteById, getById } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";
// import { donate, getDonations, getOwnDonation } from "./donations.js";

const detailsTemplate = (item, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src=${item.imgUrl}>
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${item.name}</h1>
                <h3>Artist: ${item.artist}</h3>
                <h4>Genre: ${item.genre}</h4>
                <h4>Price: $${item.price}</h4>
                <h4>Date: ${item.releaseDate}</h4>
                <p>${item.description}</p>
            </div>
            
            <!-- Only for registered user and creator of the album-->
            ${
                isOwner 
                ? html`
                <div class="actionBtn">
                <a href="/edit/${item._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>`
            :nothing
            }
            
        </div>
    </div>
</section>`;
/**
 const { 
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description 
        }
*/

export async function showDetails(ctx){
    const id = ctx.params.id;
    const item = await getById(id);
    const isOwner = item._ownerId === ctx.user._id;
    ctx.render(detailsTemplate(item, isOwner, onDelete));
    
    
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
    
}

// <section id="detailsPage">
//     <div class="details">
//         <div class="animalPic">
//             <img src="${pet.image}">
//         </div>
//         <div>
//             <div class="animalInfo">
//                 <h1>Name: ${pet.name}</h1>
//                 <h3>Breed: ${pet.breed}</h3>
//                 <h4>Age: ${pet.age}</h4>
//                 <h4>Weight: ${pet.weight}</h4>
//                 <h4 class="donation">Donation: ${donations}$</h4>
//             </div>
//             ${peControls(pet, hasUser, canDonate, isOwner, onDelete, onDonate)}
//         </div>
//     </div>
// </section>`;

// function peControls(pet, hasUser, canDonate, isOwner, onDelete, onDonate) {
//     if (hasUser == false) {
//         return nothing;
//     }
//     if (canDonate) {
//         return html`
//         <div class="actionBtn">
//             <a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>
//         </div>`;
//     }
//     if (isOwner) {
//         return html`
//             <div class="actionBtn">
//                 <a href="/edit/${pet._id}" class="edit">Edit</a>
//                 <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
//             </div>`;
//     }
// }

// export async function showDetails(ctx) {
//     const id = ctx.params.id;

//     const requests = [
//         getById(id),
//         getDonations(id)
//     ]
//     const hasUser = Boolean(ctx.user);

//     if (hasUser) {
//         requests.push(getOwnDonation(id, ctx.user._id))
//     }
//     const [pet, donations, hasDonation] = await Promise.all(requests);

//     const isOwner = hasUser && ctx.user._id == pet._ownerId;
//     const canDonate = !isOwner && hasDonation == 0;

//     ctx.render(detailsTemplate(pet, donations * 100, hasUser, canDonate, isOwner, onDelete, onDonate));

//     async function onDelete() {
//         const choice = confirm('Are you sure you want to delete?');
//         if (choice) {
//             await deleteById(id);
//             ctx.page.redirect('/');
//         }
//     }

//     async function onDonate(){
//         await donate(id);
//         ctx.page.redirect('/catalog/' + id);
//     }
// }