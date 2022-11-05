async function attachEvents() {
    const urlPost = 'http://localhost:3030/jsonstore/blog/posts';
    const urlComments = 'http://localhost:3030/jsonstore/blog/comments';
    const selectItem = document.getElementById('posts');
    const title = document.getElementById('post-title');
    const pBody = document.getElementById('post-body');
    const postComments = document.getElementById('post-comments');

    const btnLoadPosts = document.getElementById('btnLoadPosts');
    btnLoadPosts.addEventListener('click', loadAllPost)
    const btnViewPost = document.getElementById('btnViewPost');
    btnViewPost.addEventListener('click', viewPost);

    await loadAllPost();
    btnViewPost.click();

    async function loadAllPost() {
        let response = await fetch(urlPost);
        let data = await response.json();
        drawAllPost(data);
    }

    function drawAllPost(data) {
        selectItem.innerHTML = '';
        Object.values(data).map(x => {
            let option = document.createElement('option');
            option.value = x.id;
            option.textContent = x.title;
            selectItem.appendChild(option);
        })
    }

    async function viewPost() {
        let postId = selectItem.value;
        let postTitle = selectItem.options[selectItem.selectedIndex].text;
        let response = await fetch(urlPost);
        let data = await response.json();
        let selectedPost = Object.values(data).filter((x) => x.title === postTitle)[0];
        let responseComments = await fetch(urlComments);
        let dataComments = await responseComments.json();
        let filteredComments = Object.values(dataComments).filter((x) => x.postId === postId);
        drawComments(selectedPost, filteredComments);
    }

    function drawComments(selectedPost, filteredComments) {
        title.textContent = selectedPost.title;
        pBody.textContent = selectedPost.body;
        postComments.innerHTML = '';
        Object.values(filteredComments).map(x => {
            let li = document.createElement('li');
            li.textContent = x.text;
            postComments.appendChild(li);
        })
    }
}

attachEvents();