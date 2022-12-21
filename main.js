let postsContainer = document.getElementById('postlist__container');
postsContainer.classList.add('pt-5', 'pb-5')

async function getData(pageNumber) {
    let res = await fetch('https://gorest.co.in/public/v1/posts/?page=' + pageNumber);
    return await res.json();
}

let paramsString = document.location.search;
let searchParams = new URLSearchParams(paramsString);
let urlPageId = searchParams.get("page");

let listData = await getData(urlPageId);

function createList(data) {
    let list = document.createElement('ul');
    list.classList.add('list-group', 'mb-4');

    for (const item of data) {
        //console.log(item)
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let listLink = document.createElement('a');
        listLink.textContent = item.title;
        listLink.href = 'post.html?id=' + item.id;

        listItem.append(listLink);
        list.append(listItem);
    }

    postsContainer.append(list)
}
createList(listData.data);


function createNav(pagination) {
    let nav = document.createElement('div');
    nav.classList.add('d-flex', 'justify-content-center');

    let totalPage = pagination.pages;
    let currentPage = pagination.page;
    let currentP = 1;

    function render() {
        let pagination = document.createElement('ul');
        pagination.classList.add('pagination', 'mb-0');

        let pageGroup = Math.ceil(currentP / 5);
        console.log(pageGroup)
        let lastPage = pageGroup * 5;
        let firstPage = lastPage - 4;
        if (lastPage > totalPage) {
            lastPage = totalPage;
        }
        if (firstPage <= 0) {
            firstPage = 1;
        }

        for (let i = firstPage; i <= lastPage; i++) {
            let pageItem = document.createElement('li');
            if (currentPage === i) {
                pageItem.classList.add('page-item', 'active');
            }
            pageItem.classList.add('page-item');

            let pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.textContent = i;
            pageLink.href = 'index.html?page=' + i;

            pagination.append(pageItem);
            pageItem.append(pageLink);
        }

        let next = lastPage + 1;
        let prev = firstPage - 1;

        let pageItemBack = document.createElement('button');
        pageItemBack.textContent = '<< Back';
        if (pageGroup === 1) {
            pageItemBack.classList.add('disabled');
        };
        pageItemBack.classList.add('btn', 'btn-primary', 'me-2');
        pageItemBack.addEventListener('click', () => pageMove(prev));

        let pageItemNext = document.createElement('button');
        pageItemNext.textContent = 'Next >>';
        pageItemNext.classList.add('btn', 'btn-primary', 'ms-2');
        pageItemNext.addEventListener('click', () => pageMove(next));

        nav.append(pageItemBack);
        nav.append(pagination);
        nav.append(pageItemNext);

        function pageMove(i) {
            currentP = i;
            pagination.remove();
            pageItemBack.remove();
            pageItemNext.remove();
            render();
        }
    }
    render()
    postsContainer.append(nav);
}
createNav(listData.meta.pagination)






























