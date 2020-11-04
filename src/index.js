import css from "./css/style.css";
import fetchCountries from './fetchCountries.js';

import template from "./templates/template.hbs"

import { alert, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const input = document.querySelector('.input')
const listRef = document.querySelector('.containerList')
const debounce = require("lodash.debounce");

const state = {
  html: localStorage.getItem('html'),
  input: localStorage.getItem('input')
} 
if (state.html || state.input) {
  listRef.innerHTML = state.html;
  input.value = state.input;
}
const countries = function (e) {
      listRef.innerHTML = ""
  if (e.target.value.length === 0) {
      return
   } 
       fetchCountries(e.target.value)
          .then((array) => {
            if (array.length === 0) {
             
              listRef.innerHTML = "";
              info('Such a country is not found!')
              return
            }     
            if (array.length > 10) { 
          listRef.innerHTML = "";
          alert('Too many matches found. Please enter a more specific query!')
          return
            }
            if (array.length >= 2 && array.length < 10) {
              listRef.innerHTML = "";
              array.forEach((el) => { 
                listRef.innerHTML += `<li class=listTemplate>${el.name}</li>`
              })
              return
             }
            if (array.length === 1) { 
              listRef.innerHTML = "";
               listRef.insertAdjacentHTML('beforeend', template(array[0]))
            }
         })
        .catch(alert => {
             info('Wrong name!')
    })
            
};
  input.addEventListener(
  'input',
    debounce((e) => {
      countries(e)}, 500),
);
const countryChoice = function (e) { 
    if (e.target.classList.contains('listTemplate')) {
    input.value = e.target.textContent
    fetchCountries(input.value)
    .then(array => {
      listRef.innerHTML = "";
      listRef.insertAdjacentHTML('beforeend', template(array[0]))
    })
  }
 }
listRef.addEventListener('click', countryChoice)

const beforeСlosing = function () {
  localStorage.setItem('html', listRef.innerHTML);
  localStorage.setItem('input', input.value);
 }
window.addEventListener('beforeunload', beforeСlosing)