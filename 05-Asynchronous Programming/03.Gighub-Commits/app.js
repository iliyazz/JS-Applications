async function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;
    const list = document.getElementById('commits');
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/commits`);
        if (response.ok === false) {
            throw new Error(`Error: ${response.status} (Not Found)`);
        }
        const data = await response.json();
        /*const items = */data.map(comm => {
            const li = document.createElement('li');
            li.textContent = `${comm.commit.author.name}: ${comm.commit.message}`;
            list.appendChild(li);
        })
        // for (const comm of data) {
        //     let item = document.createElement('li');
        //     item.textContent = `${comm.commit.author.name}: ${comm.commit.message}`;
        //     list.appendChild(item);
        // }
    }
    catch (err) {
        console.log(err.message);
    }
}