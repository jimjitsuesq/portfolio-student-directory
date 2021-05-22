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
const paginationArray = [];

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
   //pic.innerHTML = `class = "avatar" src="${arr[i].picture.large}"`;
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

function getNumberOfPages (arr) {
   numberOfPages = Math.ceil(arr.length/9);
}

function sliceArray (arr, num) {
   splitArray = [];
   const slice = arr.slice((num - 1) * 9, ((num-1) * 9) + 9);
   for (let i = 0; i < slice.length; i++) {
   splitArray.push(slice[i]);
   }
}

function publishArray (arr, num) {
   ul.innerHTML = '';
   for (let i = 0; i < arr.length; i++) {
      let li = arr[i];
      ul.appendChild(li);
   }
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const pageLinks = document.querySelector('.link-list')

function createPaginationLinks(num1) {
   for (let i = 0; i < num1; i++) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.innerHTML = i+1;
      button.id = i+1;
      button.addEventListener('click', (e) => {
         currentPage = e.target.id;
         allButtons = document.querySelectorAll('button');
         for ( i = 0; i < allButtons.length; i++) {
            allButtons[i].className = 'notActive';
         }
         sliceArray(studentArray, currentPage);
         publishArray(splitArray, currentPage);
         if(+button.id == currentPage) {
            button.className = "active";
      }
   })
      li.appendChild(button);
      pageLinks.appendChild(li);
   }
}

// Call functions

CreateLI(data);
getNumberOfPages(studentArray);
sliceArray(studentArray, currentPage);
publishArray(splitArray, currentPage);
createPaginationLinks(numberOfPages);
