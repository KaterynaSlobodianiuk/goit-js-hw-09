// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.
// Використовуй метод делегування для відстеження змін у формі через подію input.Зберігай актуальні дані з полів email та message
// у formData та записуй цей об’єкт у локальне сховище.Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.
// При завантаженні сторінки перевір, чи є дані у локальному сховищі.
//  Якщо так, використовуй їх для заповнення форми та об'єкта formData. Якщо ні, залиш поля форми порожніми.
// Перед відправленням форми переконайся, що обидва поля форми заповнені.Якщо будь - яке з полів(властивостей об’єкта formData) порожнє,
//     показуй сповіщення з текстом «Fill please all fields». Якщо всі поля заповнені, виведи у консоль об’єкт formData з актуальними значеннями,
//         очисти локальне сховище, об’єкт formData і поля форми.

const storageKey = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('form'),
  email: document.querySelector('.email-js'),
  message: document.querySelector('.message-js'),
};

function initPage() {
  const localData = loadFromLS(storageKey);
  if (localData) {
    refs.email.value = localData.email || '';
    refs.message.value = localData.message || '';
  }
}

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const body = localStorage.getItem(key);
  try {
    return JSON.parse(body);
  } catch {
    return body;
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  const emailForm = e.target.elements.email.value.trim();
  const messageForm = e.target.elements.message.value.trim();
  if (!emailForm || !messageForm) {
    alert('Fill please all fields');
    return;
  }
  formData.email = emailForm;
  formData.message = messageForm;
  saveToLS(storageKey, formData);
  console.log(formData);
  localStorage.removeItem(storageKey);
  e.target.reset();
}

function onInputChange() {
  formData.email = refs.email.value.trim();
  formData.message = refs.message.value.trim();
  saveToLS(storageKey, formData); 
}

initPage();

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', onInputChange);
refs.message.addEventListener('input', onInputChange);
