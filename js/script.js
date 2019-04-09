/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/


const studentList = document.getElementsByClassName("student-item cf");
const studentsPerPage = 10;
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

const showPage = (list, page) => {
   const startIndex = (page * studentsPerPage) - studentsPerPage;
   const endIndex = (page * studentsPerPage) -1;
   studentList.display = 'none';
   for(let i = 0; i < list.length; i ++) {
      if(i >= startIndex && i <= endIndex) {
         list[i].style.display = 'block';
      } else {
        list[i].style.display = 'none';
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
const appendPageLinks = (list) => {
   const neededPages = list.length / studentsPerPage;
   const pageDiv = document.querySelector('.page');
   const div = document.createElement('div');
   div.className = 'pagination';
   pageDiv.appendChild(div);
   const ul = document.createElement('ul');
   div.appendChild(ul);
   for( i = 0; i < neededPages; i ++ ){
      const pageNum = i + 1;
      const li = document.createElement('li');
      const a = document.createElement('a');
      li.appendChild(a);
      a.setAttribute("href","#");
      a.textContent = pageNum;
      ul.appendChild(li);                           
      const anchorTag = document.getElementsByTagName('a');
      anchorTag[0].className = 'active';
      for (let i = 0; i < anchorTag.length; i++){
         anchorTag[i].addEventListener('click', (e) => {
           const active = e.target;
           for (let i = 0; i < anchorTag.length ;i++) {
            if(anchorTag !==null) {
               active.classList.remove("active");
            }
               active.className = "active";
          }
          
         });
         
      }
      
   }
   
}
showPage(studentList,appendPageLinks);    
appendPageLinks(studentList);      
      
         
   
      


                 





// Remember to delete the comments that came with this file, and replace them with your own code comments.