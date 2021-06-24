var $ = function (sel) {
  return document.querySelector(sel);
};
var $All = function (sel) {
  return document.querySelectorAll(sel);
};
var guid = 0;
var sct = 'All';
var CL_COMPLETED = 'completed';
var CL_SELECTED = 'selected';

function update () {
  var items = $All('.todo-list li');
  var leftNum = 0;
  var item, i, display;

  for (i = 0; i < items.length; ++i) {
    item = items[i];
    if (!item.classList.contains(CL_COMPLETED))
      leftNum++;

    // tag select
    display = 'none';
    if (sct === 'All'
      || (sct === 'Active' && !item.classList.contains(CL_COMPLETED))
      || (sct === 'Completed' && item.classList.contains(CL_COMPLETED))) {

      display = '';
    }
    item.style.display = display;



  }

  var completedNum = items.length - leftNum;
  var count = $('.todo-count');
  if (leftNum > 1) {
    count.innerHTML = (leftNum) + (' items') + ' left';
  }
  else if (leftNum === 1) {
    count.innerHTML = '1 item left';
  }
  else {
    count.innerHTML = 'No items left';
  }

  var clearCompleted = $('.clear-completed');
  if (completedNum > 0) {
    clearCompleted.style.visibility = 'visible';
  }
  else {
    clearCompleted.style.visibility = 'hidden';
  }

  var Al = $('.AllCompleted');
  if (items.length > 0) {
    Al.style.visibility = 'visible';
  }
  else {
    Al.style.visibility = 'hidden';
  }

}

function changetodo (itemId, done) {
  var item = $('#' + itemId);
  console.log(item);
  console.log(item.classList);
  if (done)
    item.classList.add(CL_COMPLETED);
  else
    item.classList.remove(CL_COMPLETED);
  update();
}

function removetodo (itemId) {
  var todoList = $('.todo-list');
  var item = $('#' + itemId);
  todoList.removeChild(item);
  sessionStorage.removeItem(itemId);
  update();
}

// function changeitem (itemId) {
//   // $('#' + itemId).children("label").setAttribute("type", "input");
//   var item = $('#' + itemId);
//   item.querySelector('.todo-label').setAttribute("type", "button");
//   console.log(item);
// }

function clear () {
  var todoList = $('.todo-list');
  var items = todoList.querySelectorAll('li');
  for (var i = items.length - 1; i >= 0; --i) {
    var item = items[i];
    if (item.classList.contains(CL_COMPLETED)) {
      sessionStorage.removeItem(item.id);
      console.log(item.id);
      todoList.removeChild(item);
    }
  }
  update();
}

function AllCmp () {
  var items = $All('.todo-list li');
  var AllCompleted = $('.AllCompleted');
  var checked = AllCompleted.checked;
  for (var i = 0; i < items.length; ++i) {
    var item = items[i];
    var cmp = item.querySelector('.cmp');
    cmp.checked = !cmp.checked;
    if (cmp.checked) item.classList.add(CL_COMPLETED);
    else item.classList.remove(CL_COMPLETED);
  }
  update();
}

function add (msg) {
  var todoList = $('.todo-list');
  var item = document.createElement('li');
  var id = 'item' + guid++;
  item.setAttribute('id', id);
  item.innerHTML = [
    '<div class="view">',
    '  <input class="cmp" type="checkbox">',
    '  <label class="todo-label">' + msg + '</label>',
    '  <button class="destroy">delete</button>',
    '</div>'
  ].join('');

  // var label = item.querySelector('.todo-label');

  // item.querySelector('.todo-label').addEventListener('dblclick', function () {
  //   changeitem(id);
  // }, false);

  item.querySelector('.cmp').addEventListener('change', function () {
    changetodo(id, this.checked);
  }, false);

  item.querySelector('.destroy').addEventListener('click', function () {
    removetodo(id);
  }, false);
  // it = item.querySelector('.todo-label').innerHTML;
  todoList.insertBefore(item, todoList.firstChild);
  update();
  window.sessionStorage.setItem(item.id, msg);
  window.sessionStorage.setItem("guid", guid);
}

function storadd (msg, num) {
  if (msg === null)
    return;
  var todoList = $('.todo-list');
  var item = document.createElement('li');
  var id = 'item' + num;
  item.setAttribute('id', id);
  item.innerHTML = [
    '<div class="view">',
    '  <input class="cmp" type="checkbox">',
    '  <label class="todo-label">' + msg + '</label>',
    '  <button class="destroy">delete</button>',
    '</div>'
  ].join('');

  // var label = item.querySelector('.todo-label');

  // item.querySelector('.todo-label').addEventListener('dblclick', function () {
  //   changeitem(id);
  // }, false);

  item.querySelector('.cmp').addEventListener('change', function () {
    changetodo(id, this.checked);
  }, false);

  item.querySelector('.destroy').addEventListener('click', function () {
    removetodo(id);
  }, false);
  // it = item.querySelector('.todo-label').innerHTML;
  todoList.insertBefore(item, todoList.firstChild);
  update();
}

function Als () {
  sct = 'All';
  update();
}

function Aas () {
  sct = 'Active';
  update();
}

function Acs () {
  sct = 'Completed';
  update();
}

function rem (guid) {
  var todoList = $('.todo-list');
  for (i = 0; i < guid; ++i) {
    var todoList = $('.todo-list');
    var id = 'item' + i;

    var item = document.createElement('li');

    var msg = window.sessionStorage.getItem(id);
    console.log(id);
    console.log(msg);

    storadd(msg, i);

    // item.setAttribute('id', id);
    // item.innerHTML = [
    //   '<div class="view">',
    //   '  <input class="cmp" type="checkbox">',
    //   '  <label class="todo-label">' + msg + '</label>',
    //   '  <button class="destroy"></button>',
    //   '</div>'
    // ].join('');

    // item.querySelector('.cmp').addEventListener('change', function () {
    //   changetodo(id, this.checked);
    // }, false);

    // item.querySelector('.destroy').addEventListener('click', function () {
    //   removetodo(id);
    // }, false);

    // todoList.insertBefore(item, todoList.firstChild);
    // update();
  }
}


window.onload = function init () {


  if (window.sessionStorage) {
    guid = window.sessionStorage.getItem("guid");
    rem(guid);

  }



  var addnew = $('.addnew');
  addnew.addEventListener('click', function () {
    var newTodo = $('.new-todo');
    var msg = newTodo.value;
    if (msg === '') {
      console.warn('message is empty');
      return;
    }
    add(msg);
  }, false);

  var clearCompleted = $('.clear-completed');
  clearCompleted.addEventListener('click', function () {
    clear();
  }, false);

  var AllCompleted = $('.AllCompleted');
  AllCompleted.addEventListener('change', function () {
    AllCmp();
  }, false);

  var Alb = $('.al');
  Alb.addEventListener('click', function () {
    Als();
  }, false);

  var Aab = $('.ac');
  Aab.addEventListener('click', function () {
    Aas();
  }, false);

  var Acb = $('.co');
  Acb.addEventListener('click', function () {
    Acs();
  }, false);


  update();
};
