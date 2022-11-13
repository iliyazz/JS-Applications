import { createIdea } from '../api/data.js';

const section = document.getElementById("createView");
const form = section.querySelector("form");
form.addEventListener("submit", onSubmit);
let ctx = null;

export function showCreate(context) {
    ctx = context;
    context.showSection(section);
}

async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const { title, description, imageURL } = Object.fromEntries(formData);

    try{if(title.length < 6){
        throw new Error("Title should be at least 6 symbols!");
    }
    if(description.length < 10){
        throw new Error("Description should be at least 10 symbols!");
    }
    if(imageURL.length < 5){
        throw new Error("Image should be at least 5 symbols!");
    }}
    catch(err){
        alert(err.message);
        throw err;
    }



    await createIdea({ title, description, img: imageURL });
    form.reset();
    ctx.goTo("/catalog");
}