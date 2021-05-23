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
const li = '';
const studentArray = [];
let splitArray = [];
let numberOfPages = 0;
let currentPage = 1;

function CreateLI (arr) {
   for (let i = 0; i < arr.length; i++) {
   const li = document.createElement('li');
   const SDdiv = document.createElement('div');
   const JDdiv = document.createElement('div');
   const pic = document.createElement('img');
   const name = document.createElement('h3');
   const email = document.createElement('span');
   const joinedDate = document.createElement('span');
   li.className = "student-item"
   SDdiv.className = "student-details";
   li.appendChild(SDdiv);
   pic.className = "avatar";
   pic.src = `${arr[i].picture.large}`;
   pic.alt = 'Profile Picture';
   SDdiv.appendChild(pic);
   name.innerHTML = `${arr[i].name.first} ${arr[i].name.last}`;
   SDdiv.appendChild(name);
   email.className = "email";
   email.innerHTML = `${arr[i].email}`;
   SDdiv.appendChild(email);
   JDdiv.className = "joined-details";
   li.appendChild(JDdiv);
   joinedDate.innerHTML = `Joined ${arr[i].registered.date}`;
   JDdiv.appendChild(joinedDate); 
   studentArray.push(li);
   }
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

let pageLinks = document.querySelector('.link-list');

function getNumberOfPages (arr) {
   numberOfPages = Math.ceil(arr.length/9);
}

function createPaginationLinks(num1, arr1) {
   pageLinks.innerHTML = '';
   for (let i = 0; i < num1; i++) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.innerHTML = i+1;
      button.id = i+1;
      let buttonID = parseInt(button.id);
      button.addEventListener('click', (e) => {
         currentPage = +e.target.id;
         allButtons = pageLinks.getElementsByTagName('BUTTON');
         for ( i = 0; i < allButtons.length; i++) {
            allButtons[i].classList.remove('active');
         }
         sliceArray(arr1);
         showPage(splitArray);
         if(buttonID == currentPage) {
            button.className = "active";
      }
   })
      li.appendChild(button);
      pageLinks.appendChild(li);
      if(buttonID == currentPage) {
         button.className = "active";
   }
   }
   
}

// Search Bar

const header = document.querySelector('.header');
const searchBox = document.createElement('label');
header.appendChild(searchBox);
searchBox.for = 'search';
searchBox.className = "student-search";
searchBox.innerHTML = `<span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button" id="search button"><img src="img/icn-search.svg" alt="Search icon"></button>`

// Search Function

const search = document.getElementById('search');
const submit = document.getElementById('search button');
let searchArray = [];

function searchFunction (item, names) {
   currentPage = 1;
   searchArray = [];
   for (let i = 0; i<names.length; i++) {
   if(item.value.length !== 0 && names[i].firstElementChild.firstElementChild.nextElementSibling.textContent.toLowerCase().includes(item.value.toLowerCase())){
      searchArray.push(names[i]);
   }
   }
}
function noSearchResults () {
   if (searchArray.length === 0 && splitArray.length === 0) {
      ul.insertAdjacentHTML("afterbegin", `<span class = "no results">No Results found.</span>`)
   }
}

submit.addEventListener('click', (e) => {
   e.preventDefault();
   searchFunction(search, studentArray);
   sliceArray(searchArray);
   showPage(splitArray);
   getNumberOfPages(searchArray);
   createPaginationLinks(numberOfPages, searchArray, splitArray);
   noSearchResults();
});

search.addEventListener('keyup', () => {
   searchFunction(search, studentArray);
   sliceArray(searchArray);
   showPage(splitArray);
   getNumberOfPages(searchArray);
   createPaginationLinks(numberOfPages, searchArray, splitArray);
   noSearchResults();
})

// Call functions

CreateLI(data);
getNumberOfPages(studentArray);
sliceArray(studentArray, currentPage);
showPage(splitArray, currentPage);
createPaginationLinks(numberOfPages, studentArray, splitArray);
