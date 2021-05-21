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
/* /* function CreateLI () {
   function createElement(elementName, property, value) {
      const element = document.createElement(elementName);
      element[property] = value;
      return element;
   }

   function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
}
   const li = document.createElement('li');
   appendToLI()

  

      console.log(li)
   
}
 */

function CreateLI (arr) {
   for (let i = 0; i < arr.length; i++) {
     // li = Elements(arr[i]);
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
   //ul.appendChild(li);
   studentArray.push(li);
   //return li;
}
//return li;
}

CreateLI(data);

function publishArray(arr) {
   ul.innerHTML = ''
   for (let i = 0; i < arr.length; i++) {
      let li = arr[i];
      ul.appendChild(li);
   }
   
}

//publishArray(studentArray);

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const splitArray = [];

function sliceArray (arr) {
   for (let i = 0; i < arr.length; i = i + 9) {
      const slice = arr.slice(i,i+9);
      splitArray.push(slice);
   }
   return splitArray;
}
sliceArray(studentArray);
//console.log(splitArray);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
const pageLinks = document.querySelector('.link-list')
function addPagination (arr) {
   for (let i = 0; i < arr.length; i++) {
      let li = document.createElement('li');
      let button = document.createElement('button');
      button.innerHTML = `${i + 1}`;
      button.addEventListener('click', () => {
         publishArray(splitArray[i]);
      })
      pageLinks.appendChild(li);
      li.appendChild(button);
   }
}
addPagination(splitArray);

function paginate () {

}


// Call functions

publishArray(splitArray[0]);

