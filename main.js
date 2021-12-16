var td_form = document.querySelector('.to_do_form');

var td_input = document.querySelector('.to_do_input');

var td_itemList = document.querySelector('.to_do_list');

var storage = window.localStorage;

td_form.addEventListener('submit', function (event){
    event.preventDefault();
    addItem(td_input.value);
})

var items_list = []

function addItem(item){
    if (item !== ''){
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        }
        items_list.push(todo);
        addToLocalStorage(items_list);
        td_input.value = '';
    }
}

function showTodos(todos){
    td_itemList.innerHTML = '';
    todos.forEach(function(item){
        const checked = item.completed ? 'checked': null;

        console.log(checked);
        var list_item = document.createElement('li');
        list_item.setAttribute('class', 'item');
        list_item.setAttribute('data-key', item.id);

        if (item.completed){
            list_item.classList.add('checked');
        }

        list_item.innerHTML = `
        <input class="checkbox" type="checkbox" ${checked}> 
        <p>${item.name}</p>
        <button class="del_item"><i class="del_btn fas fa-times"></i></button>
        `;
        td_itemList.append(list_item);
    })
}

function addToLocalStorage(todos){
    storage.setItem('todos', JSON.stringify(todos));
    showTodos(todos);
}

console.log(storage);

function getFromLocalStorage(){
    const ref = storage.getItem('todos');
    if (ref){
        items_list = JSON.parse(ref);
        showTodos(items_list);
    }
}

getFromLocalStorage();

function toggle(id){
    items_list.forEach(function(item){
        if (item.id == id){
            item.completed = !item.completed;
        }
    })
    addToLocalStorage(items_list);
}

function del_item(id){
    console.log(id);
    items_list = items_list.filter(function(item){
        return item.id != id;
    })
    // console.log(items_list);
    addToLocalStorage(items_list);
}

td_itemList.addEventListener('click', function(event){
    if (event.target.type === 'checkbox'){
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    else if (event.target.classList.contains('del_item')){
        // console.log('hey');
        del_item(event.target.parentElement.getAttribute('data-key'));
    }
    else if (event.target.classList.contains('del_btn')){
        del_item(event.target.parentElement.parentElement.getAttribute('data-key'));
    }
    // else if(event.target.type === 'click'){
    //     console.log('Nice');
    // }
    console.log(event.target);
})