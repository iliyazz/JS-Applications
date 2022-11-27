import { searchItem } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";




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