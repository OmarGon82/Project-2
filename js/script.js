/*
declared all my variables, created elements that will be needed for this project, appended them to their parent element and
gave the class names or id's depending how the element will be used. 
*/ 
const studentList = document.getElementsByClassName("student-item cf");    
const studentsPerPage = 10;                                                
const ul = document.querySelector('ul');                                   
ul.setAttribute("id","names");                                             
const headerDiv = document.querySelector('.page-header.cf');               
const studentDiv = document.createElement('div');                          
studentDiv.className = "student-search";                                   
headerDiv.appendChild(studentDiv);                                         
const input = document.createElement("input");                             
input.setAttribute("id","input")                                           
input.setAttribute("placeholder","Search for students...");                
studentDiv.appendChild(input);                                             
const button = document.createElement('button');                           
button.textContent = 'search';                                             
studentDiv.appendChild(button);                                            
const pageDiv = document.querySelector('.page');                           
const div = document.createElement('div');                                 
div.className = 'pagination';                                              
pageDiv.appendChild(div);                                                  
const noNamesDiv = document.createElement('div');                          
noNamesDiv.textContent = "Sorry no matches found..."                       
pageDiv.appendChild(noNamesDiv);                                           
noNamesDiv.style.display = 'none';     //set this div to not display anything by default.                                     
 



/*
This function will care of filter the student names.
First the pagination div is selected and set to an empty string to erase the UL and LIs previously created.
The foor loop then loops through the list and the conditional statements check to see if the input value matches or not.
If there are matches they go into the searchResults array. If the array's length is 0 then the noNamesDiv will display its message.
finally we set the noNamesDiv to hide the message.
*/ 
function filterNames() {
   document.getElementsByClassName("pagination")[0].innerHTML = ' ';          
   let filterValue = document.getElementById('input').value.toUpperCase();   
   let ul = document.getElementById('names');                                 
   let li = ul.querySelectorAll('li.student-item');                          
   const searchResults = [];                                                  
   for(let i = 0; i < li.length; i++) {
      li[i].style.display = 'none';                                          
      let h3 = li[i].getElementsByTagName('h3')[0];                           
      
      if (h3.innerHTML.toUpperCase().includes(filterValue)) { 
         searchResults.push(li[i]);                                           
         li[i].style.display = ''                                             
         } 
         
      if(searchResults.length === 0) {
         noNamesDiv.style.display = ''                                        
      } else {
         noNamesDiv.style.display = 'none'                                    
      }
      
      }  
   showPage(searchResults,1);                                                 
   appendPageLinks(searchResults);                                            
}

         
//The event listerners take the filterNames function as arguments.     
input.addEventListener('keyup', filterNames);                                 
button.addEventListener('click', filterNames);                                




/*
The showPage function take care of displaying a set ammount of students per page. It takes in any list and and any number of pages
A startInded and endIndex variable determines how what student the index of students that will be shown on the page(11-20 or 41-50)
First all the students are hidden and then after that the loop runs and displays the 10 students.
*/ 
const showPage = (list, page) => {
   const startIndex = (page * studentsPerPage) - studentsPerPage;            
   const endIndex = (page * studentsPerPage) -1;                              
   studentList.display = 'none';                                               
   for(let i = 0; i < list.length; i ++) {                                    
      if(i >= startIndex && i <= endIndex) {                                  
         list[i].style.display = '';                                          
      } else {
        list[i].style.display = 'none';                                       
      }
   }
};

/*
This function will append all the page buttons according to how many students are on the list. 
first the the ammount of pages that will be needed is calculated.
A loop then runs an creates an li for each student with the proper anchor tag and href
The first li is then given the active class name.
A loop is then used to give all a tags an event listener and another loop runs to remove the 
active class from the a elements and add it when to the button that has been clicked.
and finally the showPage function is called.
*/ 
const appendPageLinks = (list) => {
   const neededPages = list.length / studentsPerPage;                         
   const ul = document.createElement('ul');                                   
   div.appendChild(ul);                                                       
   
   for( let i = 0; i < neededPages; i ++ ) {                                  
      const pageNum = i + 1;                                                  
      const li = document.createElement('li');                                
      const a = document.createElement('a');                                  
      li.appendChild(a);                                                      
      a.setAttribute("href","#");                                             
      a.textContent = pageNum;                                                
      ul.appendChild(li);                                                                   
      const anchorTag = document.getElementsByTagName('a');                   
      anchorTag[0].className = "active";                                      
      
      for (let i = 0; i < anchorTag.length; i++){                             
         anchorTag[i].addEventListener('click', (e) => {                     
            const pageNum = e.target.textContent;                             
            
            for (let i = 0; i < anchorTag.length ; i++) {                      
               
               anchorTag[i].classList.remove("active");                       
            }
               e.target.classList.add("active");                              
            
               showPage(list, pageNum);                                      
            });                               
      }              
      
   }
   
}

//The showPage function is called and it takes the list of students as well as 1 so it will display the first page by default.
//The appendPageLinks is also called and also take the studentList as it's only argument.
showPage(studentList,1);          
appendPageLinks(studentList);    
