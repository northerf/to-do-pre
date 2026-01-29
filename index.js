const items = [
  'Сделать проектную работу',
  'Пройти туториал по Webpack',
  'Посмотреть вебинар по CSS-Grid',
  'Ответить на вопросы студентов в Slack',
  'Посмотреть урок по Accessibility',
  'Записать видео по итогам спринта'
];

const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');
const templateElement = document.querySelector('#to-do__item-template');

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    return JSON.parse(savedTasks);
  }

  return items;
}

function createItem(item) {
  const clone = templateElement.content.cloneNode(true);

  const textElement = clone.querySelector('.to-do__item-text');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');

  textElement.textContent = item;

  deleteButton.addEventListener('click', function() {
    const listItem = deleteButton.closest('.to-do__item');
    listItem.remove();

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener('click', function() {
    const itemName = textElement.textContent;
    const newItem = createItem(itemName);

    listElement.prepend(newItem);

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener('click', function() {
    textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
  });

  textElement.addEventListener('blur', function() {
    textElement.setAttribute('contenteditable', 'false');

    const items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];

  itemsNamesElements.forEach(function(element) {
    tasks.push(element.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

formElement.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const taskText = inputElement.value;
  const newItem = createItem(taskText);

  listElement.prepend(newItem);

  const items = getTasksFromDOM();
  saveTasks(items);

  inputElement.value = '';
});


const loadedItems = loadTasks();

loadedItems.forEach(function(item) {
  const taskElement = createItem(item);
  listElement.append(taskElement);
});
