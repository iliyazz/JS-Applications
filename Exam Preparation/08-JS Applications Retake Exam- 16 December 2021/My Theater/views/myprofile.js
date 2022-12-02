import { getMyItems } from '../src/api/data.js';
import { html, nothing } from '../src/lib.js';
import { getUserData } from '../src/util.js';
/*{
  title,
  date,
  author,
  imageUrl
  description,
}*/
const profileTemplate = (items, user) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${user.email}</h2>
    </div>
    <div class="board">
        ${
            items.length > 0
            ? html`
            <!--If there are event-->
            ${items.map(x => cardTemplate(x))}`
            : html`
            <!--If there are no event-->
            <div class="no-events">
                <p>This user has no events yet!</p>
            </div>`
        }
        

        
    </div>
</section>`;


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



export async function showMyProfile(ctx) {
    const items = await getMyItems(ctx.user._id); //[];
    const user = getUserData();
    ctx.render(profileTemplate(items, user))//, !!ctx.user));
}
/*{
  title,
  date,
  author,
  imageUrl
  description,
}*/
const cardTemplate = (item) => html`
    
    <div class="eventBoard">
        <div class="event-info">
            <img src=${item.imageUrl}>
            <h2>${item.title}</h2>
            <h6>${item.date}</h6>
            <a href="/details/${item._id}" class="details-button">Details</a>
        </div>
    </div>`;
// const cardTemplate = (item) => html`
// <li class="otherBooks">
//     <h3>${item.title}</h3>
//     <p>Type: ${item.type}</p>
//     <p class="img"><img src=${item.imageUrl}></p>
//     <a class="button" href="/details/${item._id}">Details</a>
// </li>`;




