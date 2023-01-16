import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const input = document.querySelector('.feedback-form input');

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

localStorageInput();
const formData = {};
// console.log(formData);

function onFormInput(e) {
  formData[e.target.name] = [e.target.value];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  // console.log(JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);

  console.log('Send form', formData);
}

function localStorageInput() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  console.log(savedData);
  if (parsedData) {
    console.log(parsedData);
    textarea.value = parsedData.message;
    input.value = parsedData.email;
  }
}

// textarea.addEventListener('input', throttle(onTextareaInput, 500));
// function onEmailInput(e) {
//     const email = e.target.value;
//     console.log(email);
//     localStorage.setItem(STORAGE_KEY, email);
// }

// function onTextareaInput(e) {
//     const message = e.target.value;
//     console.log(message);
//     localStorage.setItem(STORAGE_KEY, message)
// }
