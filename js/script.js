/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const ul = document.querySelector('.student-list');
const studentArray = [];
let splitArray = [];
let numberOfPages = 0;
let currentPage = 1;

/* 
Takes the array of student objects in `data`, formats it and inserts it into a new array called `studentArray` using the function `createLI`
*/

function createLI (arr) {
   for (let i = 0; i < arr.length; i++) {
   li = document.createElement('li');
   li.className = "student-item";
   li.innerHTML = `<div class="student-details">
      <img class="avatar" src="${arr[i].picture.large}"; alt="Profile Picture">
      <h3>${arr[i].name.first} ${arr[i].name.last}</h3>
      <span class="email">${arr[i].email}</span>
      </div>
      <div class="joined-details">
      <span class="date">Joined ${arr[i].registered.date}</span>
      </div>`;
   studentArray.push(li);
   }
}

/*
Creates the `sliceArray` function, which splits the studentArray into 9-record pages 
Creates the `showPage` function, which creates the page of student records
*/

function sliceArray (arr) {
   splitArray = [];
   const slice = arr.slice((currentPage - 1) * 9, ((currentPage-1) * 9) + 9);
   for (let i = 0; i < slice.length; i++) {
      splitArray.push(slice[i]);
   }
}

function showPage (arr) {
   ul.innerHTML = '';
   for (let i = 0; i < arr.length; i++) {
      let li = arr[i];
      ul.appendChild(li);
   }
}

/*
Creates the `addPagination` function to create page navigation links depending on the number
of pages and highlights the current `active` page
*/

let pageLinks = document.querySelector('.link-list');

function getNumberOfPages (arr) {
   numberOfPages = Math.ceil(arr.length/9);
}

function addPagination(num, arr) {
   pageLinks.innerHTML = '';
   for (let i = 0; i < num; i++) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.innerHTML = i+1;
      button.id = i+1;
      let buttonID = parseInt(button.id);
      button.addEventListener('click', (e) => {
         currentPage = +e.target.id;
         allButtons = pageLinks.getElementsByTagName('BUTTON');
         for ( i = 0; i < allButtons.length; i++) {
            allButtons[i].className = 'INactive';
         }
         sliceArray(arr);
         showPage(splitArray);
         if(buttonID === currentPage) {
            button.className = "active";
         }
      })
      li.appendChild(button);
      pageLinks.appendChild(li);
      if(buttonID === currentPage) {
         button.className = "active";
      }
   }
}

// Creates and inserts the Search Bar

const header = document.querySelector('.header');
const searchBox = document.createElement('label');
searchBox.for = 'search';
searchBox.className = "student-search";
searchBox.innerHTML = `<span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button" id="search button"><img src="img/icn-search.svg" alt="Search icon"></button>`;
header.appendChild(searchBox);

/* 
Creates the search Function, which creates a new array called searchArray containing all matching records and displays them, or `no results` if none
*/

const search = document.getElementById('search');
const submit = document.getElementById('search button');
let searchArray = [];

function searchFunction (item, names) {
   currentPage = 1;
   searchArray = [];
   for (let i = 0; i<names.length; i++) {
      if (item.value.length !== 0 && names[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toLowerCase().includes(item.value.toLowerCase())) {
         searchArray.push(names[i]);
      }
   if (item.value.length === 0) {
      searchArray = studentArray;
   }
   }
}

function noSearchResults (arr) {
   if (arr.length === 0) {
      ul.insertAdjacentHTML("afterbegin", `<span class = "no-results">No Results found.</span>`)
   }
}

function addListeners (item1, item2) {
   item1.addEventListener(item2, (e) => {
      searchFunction(search, studentArray);
      sliceArray(searchArray);
      showPage(splitArray);
      getNumberOfPages(searchArray);
      addPagination(numberOfPages, searchArray, splitArray);
      noSearchResults(searchArray);
   })
}

// Call functions

createLI(data);
getNumberOfPages(studentArray);
sliceArray(studentArray, currentPage);
showPage(splitArray, currentPage);
addPagination(numberOfPages, studentArray, splitArray);
addListeners(submit, 'click');
addListeners(search, 'keyup');