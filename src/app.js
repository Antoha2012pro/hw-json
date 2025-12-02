const inputEl = document.querySelector('#bookmarkInput');
const btnAddEl = document.querySelector('button');
const itemsEl = document.querySelector('ul');

let BookArr = [];

inputEl.value = '';

btnAddEl.addEventListener('click', addBookmark);
itemsEl.addEventListener('click', onItemsClick);
inputEl.placeholder = `URL`;

function renderList() {
    localStorage.setItem(itemsEl);
    itemsEl.innerHTML = BookArr.map((item, index) => {
        return `
            <li class="item" data-idx="${index}">
                <input type="text" class="edit-input" value="${item}" style="display:none" />
                <a href="${item}" target="_blank" class="link">${item}</a>
                <button type="button" class="delete">Delete</button>
                <button type="button" class="edit">Edit</button>
            </li>
        `;
    }).join("");
}

function addBookmark(event) {
    const inp = inputEl.value.trim();

    if (event.target.nodeName !== "BUTTON") return;

    if (inp && inp.includes("https://")) {
        BookArr.push(inp);
        renderList();
    } else if (!inp) {
        inputEl.placeholder = `Введіть посилання!`;
    } else if (!inp.includes("https://")) {
        inputEl.placeholder = `Введіть правильне посилання! Приклад: https://domen.ua`;
    }

    inputEl.value = '';
}

function onItemsClick(event) {
    inputEl.placeholder = `URL`;

    if (event.target.classList.contains('delete')) {
        const li = event.target.closest('li');
        if (!li) return;

        const index = Number(li.dataset.idx);
        BookArr.splice(index, 1);
        renderList();
    };


    if (event.target.classList.contains('edit')) {
        const li = event.target.closest('li');
        if (!li) return;

        const link = li.querySelector('.link');
        const input = li.querySelector('.edit-input');

        link.style.display = 'none';
        input.style.display = 'inline-block';

        event.target.textContent = 'Save';
        event.target.classList.remove('edit');
        event.target.classList.add('save');

        return;
    } else if (event.target.classList.contains('save')) {
        const li = event.target.closest('li');
        if (!li) return;

        const index = Number(li.dataset.idx);
        const link = li.querySelector('.link');
        const input = li.querySelector('.edit-input');

        const newValue = input.value.trim();
        input.value = '';
        // if (!newValue && !newValue.includes("https://")) return;
        if (newValue && newValue.includes("https://")) {
            BookArr[index] = newValue;
            link.textContent = newValue;
            link.href = newValue;
            input.style.display = 'none';
            link.style.display = 'inline';

            event.target.textContent = 'Edit';
            event.target.classList.remove('save');
            event.target.classList.add('edit');
        } else if (!newValue) {
            input.placeholder = `Введіть посилання!`;
        } else if (!newValue.includes("https://")) {
            input.placeholder = `Введіть правильне посилання! Приклад: https://domen.ua`;
        }
    }
};