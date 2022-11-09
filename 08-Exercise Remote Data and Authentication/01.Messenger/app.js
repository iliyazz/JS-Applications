function attachEvents() {
    document.getElementById('submit').addEventListener('click', onPost);
    document.getElementById('refresh').addEventListener('click', onRefresh);
    const textArea = document.getElementById('messages');

    async function onPost() {
        const author = document.querySelector('input[name="author"]').value;
        const content = document.querySelector('input[name="content"]').value;
        const url = 'http://localhost:3030/jsonstore/messenger';
        let comment = { author, content };
        await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
    }

    async function onRefresh() {
        const url = 'http://localhost:3030/jsonstore/messenger';
        const response = await fetch(url);
        const data = await response.json();
        let arr = [];
        Object.values(data).map(x => {
            arr.push(`${x.author}: ${x.content}`)
        });
        textArea.value = arr.join('\n')
    }
}
attachEvents();
