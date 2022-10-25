window.addEventListener("load", solve);

function solve() {
  let firstName = document.getElementById('first-name');
  let lastName = document.getElementById('last-name');
  let age = document.getElementById('age');
  let title = document.getElementById('story-title');
  let genre = document.getElementById('genre');
  let story = document.getElementById('story');
  let btnPublish = document.getElementById('form-btn');
  btnPublish.addEventListener('click', publish);
  let ul = document.getElementById('preview-list');
  let divMain = document.getElementById('main');


  function publish(e) {
    btnPublish.disabled = true;
    //e.target.disabled = true;
    //e.preventDefault();
    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;
    let ageValue = age.value;
    let titleValue = title.value;
    let genreValue = genre.value;
    let storyValue = story.value;
    if (!firstNameValue || !lastNameValue || !ageValue || !titleValue || !genreValue || !storyValue) {
      return;
    }
    firstName.value = null;
    lastName.value = null;
    age.value = null;
    title.value = null;
    genre.value = null;
    story.value = null;

    let li = document.createElement('li');
    li.classList.add('story-info');
    ul.appendChild(li);

    let article = document.createElement('article');
    li.appendChild(article);

    let h4 = document.createElement('h4');
    h4.innerText = `Name: ${firstNameValue} ${lastNameValue}`;
    article.appendChild(h4);

    let pAge = document.createElement('p');
    pAge.innerText = `Age: ${ageValue}`;
    article.appendChild(pAge);

    let pTitle = document.createElement('p');
    pTitle.innerText = `Title: ${titleValue}`;
    article.appendChild(pTitle);

    let pGenre = document.createElement('p');
    pGenre.innerText = `Genre: ${genreValue}`;
    article.appendChild(pGenre);

    let pStory = document.createElement('p');
    pStory.innerText = storyValue;
    article.appendChild(pStory);

    let btnSave = document.createElement('button');
    btnSave.classList.add("save-btn");
    btnSave.textContent = 'Save Story';
    btnSave.addEventListener('click', save)
    li.appendChild(btnSave);

    let btnEdit = document.createElement('button');
    btnEdit.classList.add("edit-btn");
    btnEdit.textContent = 'Edit Story';
    btnEdit.addEventListener('click', edit)
    li.appendChild(btnEdit);

    let btnDelete = document.createElement('button');
    btnDelete.classList.add("delete-btn");
    btnDelete.textContent = 'Delete Story';
    btnDelete.addEventListener('click', del)
    li.appendChild(btnDelete);

    function save(e) {
      divMain.children[1].remove();
      divMain.children[0].remove();
      let h1Msg = document.createElement('h1');
      h1Msg.innerText = "Your scary story is saved!";
      divMain.appendChild(h1Msg);
    }
    function edit(e) {
      btnEdit.disabled = true;
      btnSave.disabled = true;
      btnDelete.disabled = true;

      firstName.value = firstNameValue;
      lastName.value = lastNameValue;
      age.value = ageValue;
      title.value = titleValue;
      genre.value = genreValue;
      story.value = storyValue;

      e.target.parentElement.remove();
      btnPublish.removeAttribute("disabled");
    }
    function del(e) {
      e.target.parentElement.remove();
      btnPublish.removeAttribute("disabled");
    }
  }
}
