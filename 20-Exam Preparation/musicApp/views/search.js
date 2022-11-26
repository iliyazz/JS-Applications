import { searchItem } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";

const searchTemplate = (isClicked, onSearch, searchResult, hasUser) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <!--Show after click Search button-->
    <div class="search-result">
        ${ isClicked ? createResultTemplate(searchResult, hasUser) : nothing}
    </div>
</section>`;

const createResultTemplate = (searchResult ,hasUser) =>{
    return html`
        ${searchResult.length > 0 
        ? html`${searchResult.map(x => createCardTemplate(x, hasUser))}`
        : html`
            <!--If there are no matches-->
            <p class="no-result">No result.</p>`
        }
    `    
}



/*
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
 
 const createCardTemplate = (item, hasUser) => html`
 <div class="card-box">
        <img src=${item.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${item.name}</p>
                <p class="artist">Artist: ${item.artist}</p>
                <p class="genre">Genre: ${item.genre}</p>
                <p class="price">Price: $${item.price}</p>
                <p class="date">Release Date: ${item.releaseDate}</p>
            </div>
            ${hasUser
            ? html`
                <div class="btn-group">
                    <a href="/details/${item._id}" id="details">Details</a>
                </div>`
            : nothing
            }
        </div>
    </div>`;


export async function showSearch(ctx){
    ctx.render(searchTemplate(false, onSearch));
    async function onSearch(e){
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value;
        if(!query){
            return alert("Enter text in search field.");
        }
        const searchResult = await searchItem(query);
        const hasUser = ctx.user;
        ctx.render(searchTemplate(true, onSearch, searchResult, !!hasUser))
    }
}