import { data } from "autoprefixer";
import template from "./templates/template.hbs"

import { alert, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import { list } from "postcss";

export default function fetchCountries() { 
  const input = document.querySelector('.input')
  const container = document.querySelector('.container')
  const listRef = document.querySelector('.containerList')
  
  const debounce = require("lodash.debounce");

  const countries = function (e) {
    listRef.innerHTML = ""
     e.target.value.length >= 2 ? fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
      .then((data) => data.json())
      .then((array) => {
        console.log(array.length);
       
        if (array.length > 10) { 
           alert('Too many matches found. Please enter a more specific query!')
        }

        array.forEach((el) => {
          if (array.length >= 2 && array.length < 10) {

            listRef.innerHTML += `<li class=listTemplate>${el.name}</li>`
            
            const listTemplate = document.querySelectorAll('.listTemplate')
            listTemplate.forEach((el) => { 
              const replacement = () => { input.value = el.textContent 
               listRef.innerHTML=""
               fetch(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
                .then((data) => data.json())
                .then((array) => {listRef.insertAdjacentHTML('beforeend',template(array)) })
              }
            el.addEventListener('click', replacement);
            })
          }
          if (array.length === 1) {
             listRef.innerHTML=""
            listRef.insertAdjacentHTML('beforeend', template(array))
          }
          
      })
       
  })
      .catch(error => {
        info('Such a country is not found!')
    })
            : listRef.innerHTML = "";
  };
  
  input.addEventListener(
  'input',
    debounce((e) => {
      countries(e)}, 500),
  );
  }
