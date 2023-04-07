let postsContainer = document.getElementById('post__container');
postsContainer.classList.add('pt-5');

let backButton = document.createElement('button');
backButton.textContent = '< Back';
backButton.classList.add('btn', 'btn-primary', 'mb-2');
backButton.addEventListener('click', () => window.history.back());



async function getData(id) {
    let res = await fetch('https://gorest.co.in/public/v1/posts/' + id);
    return await res.json();
}

let paramsString = document.location.search;
let searchParams = new URLSearchParams(paramsString);
let URLID = searchParams.get("id");


let listPost = await getData(URLID);

function createPost(data) {
    document.title = data.title;

    let card = document.createElement('div');
    card.classList.add('card', 'mb-5');

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    let postTitle = document.createElement('h2');
    postTitle.textContent = data.title;

    let postBody = document.createElement('p');
    postBody.textContent = data.body;

    postsContainer.append(backButton);
    postsContainer.append(card);
    card.append(cardBody);
    cardBody.append(postTitle);
    cardBody.append(postBody);
}
createPost(listPost.data)


async function getComments(id) {
    let res = await fetch('https://gorest.co.in/public/v1/comments?post_id=' + id);
    return await res.json();
}

let listComments = await getComments(URLID);

function createComments(data) {
    for (const item of data) {
        console.log(item)

        let card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        let commentsName = document.createElement('div');
        commentsName.textContent = item.name;
        commentsName.classList.add('card-header');

        let commentsEmail = document.createElement('div');
        commentsEmail.textContent = 'Email: ' + item.email;
        commentsEmail.classList.add('card-title');

        let commentsBody = document.createElement('p');
        commentsBody.textContent = item.body;
        commentsBody.classList.add('card-text');

        postsContainer.append(card);
        card.append(commentsName);
        card.append(cardBody);
        cardBody.append(commentsEmail);
        cardBody.append(commentsBody);
    }
}

createComments(listComments.data)