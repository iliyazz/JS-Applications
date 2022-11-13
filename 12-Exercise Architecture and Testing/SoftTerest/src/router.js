export function initialize(links) {
    const main = document.getElementById("mainView");
    document.querySelector('nav').addEventListener("click", onNavigate);

    const context = { 
        showSection,
        goTo,
        updateNavigate
    };
    return context;

    function goTo(path, ...params) {
        const handler = links[path];
        if (typeof (handler) === "function") {
            handler(context, ...params);
        }
    }
    function onNavigate(e) {
        e.preventDefault();
        let target = e.target;
        if (target.tagName === 'IMG') {
            target = target.parentElement;
        }
        if (target.tagName === 'A') {
            const url = new URL(target.href);
            goTo(url.pathname);
        }
    }
    function showSection(section) {
        main.replaceChildren(section);
    }

    function updateNavigate(){
        const user = JSON.parse( sessionStorage.getItem("user"));
        if(user){
            document.querySelectorAll(".user").forEach(x => x.style.display = 'block');
            document.querySelectorAll(".guest").forEach(x => x.style.display = 'none');
        }
        else{
            document.querySelectorAll(".user").forEach(x => x.style.display = 'none');
            document.querySelectorAll(".guest").forEach(x => x.style.display = 'block');

        }
    }

}