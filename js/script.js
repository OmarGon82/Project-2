
const studentList = document.getElementsByClassName("student-item cf");    //this const holds an HTML collection.
const studentsPerPage = 10;                                                //this constant holds how many students will display per page.
const ul = document.querySelector('ul');                                   // selected the unordered list and stored it in a const called ul
ul.setAttribute("id","names");                                             // added an Id of names to the  ul
const headerDiv = document.querySelector('.page-header.cf');               //selected the div with the classes of page-header and cf
const studentDiv = document.createElement('div');                          //created a new div and stored it in the studentDiv const
studentDiv.className = "student-search";                                   //gave the newly created div a class name of student-search
headerDiv.appendChild(studentDiv);                                         //appened the student div to the header div
const input = document.createElement("input");                             // crated an input element. The search bar
input.setAttribute("id","input")                                           // gave the input element an Id of input
input.setAttribute("placeholder","Search for students...");                //gave the search bar a string to display when it's not in use.
studentDiv.appendChild(input);                                             // appended the input element to the studentDiv div element
const button = document.createElement('button');                           //created a button
button.textContent = 'search';                                             //the newly create button will now say search on it.
studentDiv.appendChild(button);                                            //appended the button studentDiv so it is displayed next to the search bar
const pageDiv = document.querySelector('.page');                           //selected the div with the page class.
const div = document.createElement('div');                                 //created a new div element
div.className = 'pagination';                                              //gave the newly created div a class of 'pagination'
pageDiv.appendChild(div);                                                  //appened the new div to the div with the page class. It is now nested in the mainDiv
const noNamesDiv = document.createElement('div');                          //created a div to display a message when no search matches were found
noNamesDiv.textContent = "Sorry no matches found..."                       //added the string I want to display. innerHTML would have also displayed the message.
pageDiv.appendChild(noNamesDiv);                                           //appended the new div to the pageDiv preaviosly selected.
noNamesDiv.style.display = 'none';                                         //start off by hiding the the noNamesDiv
 



//created a function filter the student names
function filterNames() {
   document.getElementsByClassName("pagination")[0].innerHTML = ' ';          //selected the pagination div and set it to an empty string to erase the ul and li.
   let filterValue = document.getElementById('input').value.toUpperCase();    //put the user input changed to upper case into the filterValue variable
   let ul = document.getElementById('names');                                 // selected the div that was created earlier and given the id of names
   let li = ul.querySelectorAll('li.student-item');                           //selected the the li's with the student-item class in the ul
   const searchResults = [];                                                  //created an empty array to store my search results.
   
   //looped through the li's in the ul
   for(let i = 0; i < li.length; i++) {
      li[i].style.display = 'none';                                           // hid all the li's to start with
      let h3 = li[i].getElementsByTagName('h3')[0];                           //stored h3 tags in the in the lis in a variable called h3
      // if the input value matches the any text in the h3 tags.
      if (h3.innerHTML.toUpperCase().includes(filterValue)) { 
         searchResults.push(li[i]);                                           //the matching lis will be pushed into the empty searchResults array.
         li[i].style.display = ''                                             //set the li[i], i being the current iteration, to do nothing.
         } 
      // if the array length is 0, in other words empty   
      if(searchResults.length === 0) {
         noNamesDiv.style.display = ''                                        //the noNamesDiv now displays the no matches message
      } else {
         noNamesDiv.style.display = 'none'                                    //hide the noNamesDiv again.
      }
      
      }  
   showPage(searchResults,1);                                                 //once all the loops run this function is called do take care of displaying our students on the page
   appendPageLinks(searchResults);                                            // this function is the called to create the buttons for the search results
}

         
      
input.addEventListener('keyup', filterNames);                                 //this is the event listener for the search bar with the keyup event that takes the filtrNames function
button.addEventListener('click', filterNames);                                //this is the event listner for the button and it also takes in the filterNames function




//created a funciton that will display the students on the page. It takes two parameters.
const showPage = (list, page) => {
   const startIndex = (page * studentsPerPage) - studentsPerPage;             //I set a start index of the students of the students to be displayed.
   const endIndex = (page * studentsPerPage) -1;                              //I set the end index of the students to be displayed.
   studentList.display = 'none';                                               //hide all students at the start
   for(let i = 0; i < list.length; i ++) {                                    //created a loop for this parameter(it will be the studentList const)
      if(i >= startIndex && i <= endIndex) {                                  //if the students index  is between the start and end index
         list[i].style.display = '';                                          //it will display that student.
      } else {
        list[i].style.display = 'none';                                       //else it will hide the student.
      }
   }
};

//created a function that will append the page links, it takes one parameter.It will be the studentList const.
const appendPageLinks = (list) => {
   const neededPages = list.length / studentsPerPage;                         // calculated how many pages need to be  created.
   const ul = document.createElement('ul');                                   //created an unordered list.
   div.appendChild(ul);                                                       //appended the newly created unordered list to the 'pagination' div.
   
   for( let i = 0; i < neededPages; i ++ ) {                                  //created a for loop to loop through all the pages.
      const pageNum = i + 1;                                                  // created page buttons. So the page numbers start at 1 not 0 we add 1 to every itteration.
      const li = document.createElement('li');                                //created a list element.
      const a = document.createElement('a');                                  //created an anchor element.
      li.appendChild(a);                                                      //appended the anchor element to the list element.
      a.setAttribute("href","#");                                             // give each anchor element an href attribute.
      a.textContent = pageNum;                                                //set each anchor to display a page number using the pageNum constant and the textContent of a.
      ul.appendChild(li);                                                     //appended all li's to the unordered list.                 
      const anchorTag = document.getElementsByTagName('a');                   // selected the anchor element by its tag name
      anchorTag[0].className = "active";                                      //set an active class to the to the first li
      
      for (let i = 0; i < anchorTag.length; i++){                             // created a loop to give all anchor tags an event listener.
         anchorTag[i].addEventListener('click', (e) => {                      //assign an click even listener to each anchor tag.
            const pageNum = e.target.textContent;                             // get the event targets text content and set it to a constant
            
            for (let i = 0; i < anchorTag.length ; i++) {                      //loop through the list of anchor elements.
               
               anchorTag[i].classList.remove("active");                       //remove the active class from anchor elements.
            }
               e.target.classList.add("active");                              //add the active class to the anchor element that was clicked
            
               showPage(list, pageNum);                                       //call the showPage function and pass it the student list and the event targets text content.
            });                               
      }              
      
   }
   
}
showPage(studentList,1);          //call the showPage function with the student list and paramenter of 1 so the first page is initially displayed. 
appendPageLinks(studentList);    //call the appendPageLinks function with the studentList paramenter.  

