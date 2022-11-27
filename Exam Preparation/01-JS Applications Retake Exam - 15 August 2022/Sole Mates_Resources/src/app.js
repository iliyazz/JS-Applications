// import * as api from './api/user.js';
// window.api = api;

//import views
import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import { updateNav } from "../views/nav.js";
import { showHome } from "../views/home.js";
import { showLogin } from "../views/login.js";
import { showRegister } from "../views/register.js";
import { showCatalog } from "../views/catalog.js";
import { showCreate } from "../views/create.js";
import { showDetails } from "../views/details.js";
import { showEdit } from "../views/edit.js";
import { showSearch } from "../views/search.js";

//get main for render
const main = document.querySelector('main');


//attached middle ware
page(decorateContext);

//create page routing 
// page('/', () => console.log('home'));

page('/', showHome);
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);
page('/search', showSearch);
// page('/', showHome);
// page('/home', showHome);
// page('/login', showLogin);
// page('/register', showRegister);
// page('/catalog', showCatalog);
// page('/create', showCreate);
// page('/details/:id', showDetails);
// page('/edit/:id', showEdit);
// page('/search', showSearch);


updateNav();
page.start();

//middle ware
function decorateContext(ctx, next) {
    ctx.render = renderMain;
    ctx.updateNav = updateNav;
    const user = getUserData();
    if (user) {
        ctx.user = user;
    }
    next();
}

function renderMain(content) {
    render(content, main);
}


