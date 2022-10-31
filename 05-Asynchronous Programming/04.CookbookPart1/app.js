const url = 'http://localhost:3030/jsonstore/cookbook';
window.addEventListener('load', () => {
    fetch(`${url}/recipes`)
        .then(result => result.json())
        .then(data => {
            renderRecipes(Object.values(data));
        });
})

function renderRecipes(recipes) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    recipes.forEach(element => {
        main.appendChild(createRecipe(element));
    });
}

function createRecipe(recipe) {
    let article = document.createElement('article');
    article.classList.add('preview');
    article.addEventListener('click', (ev) => {
        let currenArticle = ev.target

        fetch(`${url}/details/${recipe._id}`)
            .then(result => result.json())
            .then(data => {
                currenArticle.replaceWith(detailedRecipes(data));
            });
    })

    let divTitle = document.createElement('div');
    divTitle.classList.add('title');
    article.appendChild(divTitle);
    let h2 = document.createElement('h2');
    h2.innerText = recipe.name;
    divTitle.appendChild(h2);

    let divPicture = document.createElement('div');
    divPicture.classList.add('small');
    article.appendChild(divPicture);
    let imgPicture = document.createElement('img');
    imgPicture.src = recipe.img;
    divPicture.appendChild(imgPicture);
    return article;
    async function toggleCard() {
        const fullRecipe = await getRecipeById(recipe._id);

        result.replaceWith(createRecipeCard(fullRecipe));
    }
}

function articleHandler() {
    fetch(`${url}/details/:id`)
        .then(result => result.json())
        .then(recipes => {
            renderRecipes(Object.values(recipes));
        });
}
function detailedRecipes(details) {
    const result = elem('article', {},
        elem('h2', {}, details.name),
        elem('div', { className: 'band' },
            elem('div', { className: 'thumb' }, elem('img', { src: details.img })),
            elem('div', { className: 'ingredients' },
                elem('h3', {}, 'Ingredients:'),
                elem('ul', {}, details.ingredients.map(i => elem('li', {}, i))),
            )
        ),
        elem('div', { className: 'description' },
            elem('h3', {}, 'Preparation:'),
            details.steps.map(s => elem('p', {}, s))
        ),
    );
    return result;
}

function elem(type, attributes, ...content) {
    const result = document.createElement(type);
    for (let [attr, value] of Object.entries(attributes || {})) {
        if (attr.substring(0, 2) == 'on') {
            result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
        } else {
            result[attr] = value;
        }
    }
    content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);
    content.forEach(el => {
        if (typeof el == 'string' || typeof el == 'number') {
            const node = document.createTextNode(el);
            result.appendChild(node);
        } else {
            result.appendChild(el);
        }
    });
    return result;
}

