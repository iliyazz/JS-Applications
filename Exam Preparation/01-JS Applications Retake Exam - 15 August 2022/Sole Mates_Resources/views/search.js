import { searchItem } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";


// const searchTemplate = (isClicked, onSearch, searchResult, hasUser) => html`
// <section id="searchPage">
//     <h1>Search by Name</h1>

//     <div class="search">
//         <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
//         <button @click=${onSearch} class="button-list">Search</button>
//     </div>

//     <h2>Results:</h2>
//     <!--Show after click Search button-->
//     <div class="search-result">
//         ${ isClicked ? createResultTemplate(searchResult, hasUser) : nothing}
//     </div>
// </section>`;

const searchTemplate = (isClicked, onSearch, searchResult, hasUser) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${onSearch} class="search-wrapper cf">
            <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            ${isClicked ? createResultTemplate(searchResult, hasUser): nothing}
          </div>
        </section>`;





const createResultTemplate = (searchResult ,hasUser) =>{
    return html`
        ${searchResult.length > 0 
        ? html`
        <ul class="card-wrapper">${searchResult.map(x => createCardTemplate(x, hasUser))}</ul>`
        : html`
            <!--If there are no matches-->
            <h2>There are no results found.</h2>`
        }
    `    
}

// brand,
// model, 
// imageUrl, 
// release, 
// designer, 
// value


const createCardTemplate = (item, hasUser) => html`
<li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${item.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${item.model}</span></p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    ${hasUser
    ? html`<a class="details-btn" href="/details/${item._id}">Details</a>`
    : nothing
    }
</li>`;

 
//  const createCardTemplate1 = (item, hasUser) => html`
//  <div class="card-box">
//         <img src=${item.imgUrl}>
//         <div>
//             <div class="text-center">
//                 <p class="name">Name: ${item.name}</p>
//                 <p class="artist">Artist: ${item.artist}</p>
//                 <p class="genre">Genre: ${item.genre}</p>
//                 <p class="price">Price: $${item.price}</p>
//                 <p class="date">Release Date: ${item.releaseDate}</p>
//             </div>
//             ${hasUser
//             ? html`
//                 <div class="btn-group">
//                     <a href="/details/${item._id}" id="details">Details</a>
//                 </div>`
//             : nothing
//             }
//         </div>
//     </div>`;


export async function showSearch(ctx){
    ctx.render(searchTemplate(false, onSearch));
    async function onSearch(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const query = formData.get('search').trim();
        if(!query){
            return alert("Enter text in search field.");
        }
        const searchResult = await searchItem(query);
        const hasUser = ctx.user;
        ctx.render(searchTemplate(true, onSearch, searchResult, !!hasUser))
    }
}