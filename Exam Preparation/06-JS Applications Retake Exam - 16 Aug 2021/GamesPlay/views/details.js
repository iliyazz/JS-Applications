import { deleteById, getById, getComments, addComment } from "../src/api/data.js";
import { html, nothing } from "../src/lib.js";

/*{
  title,
  category,
  maxLevel,
  imageUrl,
  summary
}*/


const detailsTemplate = (item, isOwner, onDelete, isLogged,comments, onComment) => html`
<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${item.imageUrl} />
                    <h1>${item.title}</h1>
                    <span class="levels">MaxLevel: ${item.maxLevel}</span>
                    <p class="type">${item.category}</p>
                </div>

                <p class="text">${item.summary}</p>
                
                <div class="details-comments">
                    <h2>Comments:</h2>
                ${ comments.length > 0
                    ?html`
                    <!-- Bonus ( for Guests and Users ) -->
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        ${
                            comments.map(x => html`
                            <li class="comment">
                                <p>Content: ${x.comment}</p>
                            </li>`)
                        }
                    </ul>`
                    :html`<p class="no-comment">No comments.</p>`}
                </div>

                ${
                    isOwner
                    ?html`
                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                    <a href="/edit/${item._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
                : nothing
                }
            </div>
                ${
                    (isLogged && !isOwner)
                    ?html`
                    <!-- Bonus -->
                    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
                    <article class="create-comment">
                        <label>Add new comment:</label>
                        <form @submit=${onComment} class="form">
                            <textarea name="comment" placeholder="Comment......"></textarea>
                            <input class="btn submit" type="submit" value="Add Comment">
                        </form>
                    </article>`
                    :nothing
                }
        </section>`;


/*{
  gameId,
  comment
}*/


export async function showDetails(ctx) {
    const id = ctx.params.id;
    const item = await getById(id);
    const isOwner = item._ownerId === ctx.user?._id;
    const isLogged = !!ctx.user;
    const comments = await getComments(item._id);

    //let gameId = item._id;
    ctx.render(detailsTemplate(item, isOwner, onDelete, isLogged, comments, onComment));
    
    async function onComment(e){
        e.preventDefault();
        let { comment } = Object.fromEntries(new FormData(e.target));
        await addComment({
            gameId:item._id,
            comment
        })
        ctx.page.redirect(`/details/${item._id}`);
        e.target.reset();
    }
    
    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?');
        if (choice) {
            await deleteById(id);
            ctx.page.redirect('/home');
        }
    }

}

