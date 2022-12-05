// import { getMyBook } from '../src/api/data.js';
// import { html, nothing } from '../src/lib.js';
// import { getUserData } from '../src/util.js';


// const profileTemplate = (items, user) => html`
// <section id="my-books-page" class="my-books">
//     <h1>My Books</h1>
//     ${
//         items.length > 0
//         ? html`
//         <!-- Display ul: with list-items for every user's books (if any) -->
//         <ul class="my-books-list">
//             ${items.map(x => cardTemplate(x))}
            
//         </ul>`
//         : html`
//         <!-- Display paragraph: If the user doesn't have his own books  -->
//         <p class="no-books">No books in database!</p>
// </section>`
//     }`



// export async function showMyBook(ctx) {
//     const items = await getMyBook(ctx.user._id); //[];
//     const user = getUserData();
//     ctx.render(profileTemplate(items, user))//, !!ctx.user));
// }

// const cardTemplate = (item) => html`
// <li class="otherBooks">
//     <h3>${item.title}</h3>
//     <p>Type: ${item.type}</p>
//     <p class="img"><img src=${item.imageUrl}></p>
//     <a class="button" href="/details/${item._id}">Details</a>
// </li>`;




