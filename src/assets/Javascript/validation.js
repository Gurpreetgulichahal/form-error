
let isShow=true;

function userDetails(){
  console.log("Entered to user details");
  let name= document.getElementById("emailBox").value;
  document.getElementById("navbarName").innerHTML=name;
  // let nameElement = document.getElementById("navbarName").textContent;
  // console.log(nameElement);
  // var transferName=name;
  console.log(name);
}

function image(){
  document.getElementById("formsImage").style.display="none";
}


function longBox2(){
if(isShow){
  console.log("smallBox");
  document.querySelector(".inputAnswer").style.height="70px";
  isShow=false;
}else{
  document.querySelector(".inputAnswer").style.height="30px";
  isShow=true;
}

}

// function deleteButton()
// {
//   console.log("delete1");
//     let deleteButton = document.querySelector('.deleteButton');
//     deleteButton.addEventListener('click',() =>{
//         deleteButton.remove();
//         console.log("delete1");
//     });
// } 

// function deleteButton2()
// {
//   console.log("delete2");
//     let deleteButton2 = document.querySelector('.deleteButton2');
//     deleteButton2.addEventListener('click',() =>{
//         deleteButton2.remove();
//         console.log("delete2");
//     });
// } 

// function deleteButton3()
// {
//   console.log("delete3");
//     let deleteButton3 = document.querySelector('.deleteButton3');
//     deleteButton3.addEventListener('click',() =>{
//         deleteButton3.remove();

//     });
// } 

// function deleteButton4()
// {
//   console.log("delete4");
//     let deleteButton4 = document.querySelector('.deleteButton4');
//     deleteButton4.addEventListener('click',() =>{
//         deleteButton4.remove();
//     });
// } 



// function add_more_field1(){
 
//     html='<head>\
//     <style type="text/css">\
//   .icons-toolbar{\
//   display:flex;\
//   justify-content: space-between;\
//   margin-left: 480px;\
//   margin-bottom: 20px;\
//   align-items: right;\
//   }\
//   .icons-toolbar button{\
//     border-radius: 10px;\
//    }\
//   .textBox{\
//   width: 800px;\
//   min-height: 100px;\
//   background-color:#008B8B;\
//   margin: 10px;\
//   border-radius: 10px;\
//   margin-left: 10px;\
//   padding-right: 50px;\
//   }\
//   .required-toolbar{\
//     display:flex;\
//     justify-content: space-around;\
//     margin-left: 200px;\
//     margin-bottom: 20px;\
//     width: 300px;\
//     }\
//   .switch {\
//     position: relative;\
//     display: inline-block;\
//     width: 50px;\
//     height: 20px;\
//    }\
//   .switch input { \
//     opacity: 0;\
//     width: 0;\
//     height: 0;\
//   }\
//   .slider {\
//     position: absolute;\
//     cursor: pointer;\
//     top: 0;\
//     left: 0;\
//     right: 0;\
//     bottom: 0;\
//     background-color: #ccc;\
//     -webkit-transition: .4s;\
//     transition: .4s;\
//   }\
//   .slider:before {\
//     position: absolute;\
//     content: "";\
//     height: 13px;\
//     width: 15px;\
//     left: 4px;\
//     bottom: 4px;\
//     background-color: white;\
//     -webkit-transition: .4s;\
//     transition: .4s;\
//   }\
//   input:checked + .slider {\
//     background-color: #228B22;\
//   }\
//   input:focus + .slider {\
//     box-shadow: 0 0 1px red;\
//   }\
//   input:checked + .slider:before {\
//     -webkit-transform: translateX(26px);\
//     -ms-transform: translateX(26px);\
//     transform: translateX(26px);\
//   }\
//   .slider.round {\
//     border-radius: 34px;\
//   }\
//   .slider.round:before {\
//     border-radius: 50%;\
//   }\
//   .container .textBox input{\
//     height: 30px;\
//     border: 0ch;\
//  }\
//  .container .textBox .inputAnswer{\
//      height: 30px;\
//   }\
//  .container .textBox{\
//      padding-left: 50px;\
//      padding-top: 30px;\
//  }\
//   </style>\
//   </head>\
//   <div class="container">\
//   <div class="textBox">\
//     <div class="icons-toolbar">\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         delete\
//       </button>\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         arrow_upward\
//       </button>\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         arrow_downward\
//       </button>\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         content_copy\
//       </button>\
//     </div>\
//     <input  placeholder="Question" type="text" id="question" style="width: 100%;"><br><br>\
//     <input  class="inputAnswer" type="text" placeholder="Enter your Answer" style="width: 100%;" /><br><br>\
//     <hr />\
//     <div class="required-toolbar">\
//         <label class="switch">\
//           <input type="checkbox">\
//           <span class="slider round"></span>\
//          </label><span>  Long Answer    </span>\
//         <label class="switch">\
//           <input type="checkbox">\
//           <span class="slider round">  </span>\
//         </label><span>  Required</span>\
//         <br> <br>\
//       </div>\
//   </div>\
//   </div>'
  
//   var form= document.getElementById('product_form2')
//   form.innerHTML+=html
//   }
  
//   function add_more_field2(){
//       html='<head>\
//       <style type="text/css">\
//     #icons-toolbar{\
//     display:flex;\
//     justify-content: space-between;\
//     margin-left: 480px;\
//     margin-bottom: 20px;\
//     align-items: right;\
//     }\
//     .icons-toolbar button{\
//         border-radius: 10px;\
//        }\
//        .textBox{\
//         width: 800px;\
//         min-height: 100px;\
//         background-color:#008B8B;\
//         margin: 10px;\
//         border-radius: 10px;\
//         margin-left: 10px;\
//         padding-right: 50px;\
//         }\
//         .required-toolbar{\
//           display:flex;\
//           justify-content: space-around;\
//           margin-left: 200px;\
//           margin-bottom: 20px;\
//           width: 300px;\
//           }\
//     .switch {\
//       position: relative;\
//       display: inline-block;\
//       width: 50px;\
//       height: 20px;\
//      }\
//     .switch input { \
//       opacity: 0;\
//       width: 0;\
//       height: 0;\
//     }\
//     .slider {\
//       position: absolute;\
//       cursor: pointer;\
//       top: 0;\
//       left: 0;\
//       right: 0;\
//       bottom: 0;\
//       background-color: #ccc;\
//       -webkit-transition: .4s;\
//       transition: .4s;\
//     }\
//     .slider:before {\
//       position: absolute;\
//       content: "";\
//       height: 13px;\
//       width: 15px;\
//       left: 4px;\
//       bottom: 4px;\
//       background-color: white;\
//       -webkit-transition: .4s;\
//       transition: .4s;\
//     }\
//     input:checked + .slider {\
//       background-color: #228B22;\
//     }\
//     input:focus + .slider {\
//       box-shadow: 0 0 1px red;\
//     }\
//     input:checked + .slider:before {\
//       -webkit-transform: translateX(26px);\
//       -ms-transform: translateX(26px);\
//       transform: translateX(26px);\
//     }\
//     .slider.round {\
//       border-radius: 34px;\
//     }\
//     .slider.round:before {\
//       border-radius: 50%;\
//     }\
//     </style>\
//     </head>\
//       <div class="textBox">\
//       <div class="icons-toolbar">\
//           <button style="width: 40px;margin-right:auto;" (click)="deleteFunction2()" class="material-icons">\
//             delete\
//           </button>\
//           <button style="width: 40px;margin-right:auto;" class="material-icons">\
//             arrow_upward\
//           </button>\
//           <button style="width: 40px;margin-right:auto;" class="material-icons">\
//             arrow_downward\
//           </button>\
//           <button style="width: 40px;margin-right:auto;" class="material-icons">\
//             content_copy\
//           </button>\
//         </div>\
//       <input type="text" placeholder="Question" style="width: 100%;" /><br><br><br>\
//         <ngb-rating [max]="5" style="font-size: 40px;" [(rate)]="currentRate" [readonly]="false"></ngb-rating>\
//         <br><br>\
//         <div class="required-toolbar">\
//           <label class="switch">\
//             <input type="checkbox">\
//             <span class="slider round"></span>\
//           </label><span>Required</span>\
//           <br> <br>\
//         </div>\
//      </div>'

//      var form= document.getElementById('product_form2')
//   form.innerHTML+=html
// }

// function add_more_field3(){
//     html='<head>\
//     <style type="text/css">\
//   .icons-toolbar{\
//   display:flex;\
//   justify-content: space-between;\
//   margin-left: 480px;\
//   margin-bottom: 20px;\
//   align-items: right;\
//   }\
//   .icons-toolbar button{\
//     border-radius: 10px;\
//    }\
//   .textBox{\
//   width: 800px;\
//   min-height: 100px;\
//  background-color:#008B8B;\
//   margin: 10px;\
//   border-radius: 10px;\
//   margin-left: 10px;\
//   padding-right: 50px;\
//   }\
//   .required-toolbar{\
//     display:flex;\
//     justify-content: space-around;\
//     margin-left: 200px;\
//     margin-bottom: 20px;\
//     width: 300px;\
//     }\
//   .switch {\
//     position: relative;\
//     display: inline-block;\
//     width: 50px;\
//     height: 20px;\
//    }\
//   .switch input { \
//     opacity: 0;\
//     width: 0;\
//     height: 0;\
//   }\
//   .slider {\
//     position: absolute;\
//     cursor: pointer;\
//     top: 0;\
//     left: 0;\
//     right: 0;\
//     bottom: 0;\
//     background-color: #ccc;\
//     -webkit-transition: .4s;\
//     transition: .4s;\
//   }\
//   .slider:before {\
//     position: absolute;\
//     content: "";\
//     height: 13px;\
//     width: 15px;\
//     left: 4px;\
//     bottom: 4px;\
//     background-color: white;\
//     -webkit-transition: .4s;\
//     transition: .4s;\
//   }\
//   input:checked + .slider {\
//     background-color: #228B22;\
//   }\
//   input:focus + .slider {\
//     box-shadow: 0 0 1px red;\
//   }\
//   input:checked + .slider:before {\
//     -webkit-transform: translateX(26px);\
//     -ms-transform: translateX(26px);\
//     transform: translateX(26px);\
//   }\
//   .slider.round {\
//     border-radius: 34px;\
//   }\
//   .slider.round:before {\
//     border-radius: 50%;\
//   }\
//   .required-toolbar2{\
//     display:flex;\
//     justify-content: space-around;\
//     margin-left: 400px;\
//     margin-bottom: 20px;\
//     width: 200px;\
//   }\
//   .container .textBox input{\
//     height: 30px;\
//     border: 0ch;\
//  }\
//  .container .textBox .inputAnswer{\
//      height: 30px;\
//   }\
//  .container .textBox{\
//      padding-left: 50px;\
//      padding-top: 30px;\
//  }\
//   </style>\
//   </head>\
//   <div class="container">\
//     <div  class="textBox deleteButton3">\
//     <div class="icons-toolbar">\
//       <button style="width: 40px;margin-right:auto;" onchange="deleteButton3()" class="material-icons">\
//         delete\
//       </button>\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         arrow_upward\
//       </button>\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         arrow_downward\
//       </button>\
//       <button style="width: 40px;margin-right:auto;" class="material-icons">\
//         content_copy\
//       </button>\
//     </div>\
//     <input #box type="text" placeholder="Question" style="width: 100%;height: 40px;" /><br><br><br>\
//     <input type="date" style="width: 50%;height: 40px;" />\
//     <div class="required-toolbar2">\
//       <label class="switch">\
//         <input type="checkbox">\
//         <span class="slider round"></span>\
//       </label><span>Required</span>\
//       <br> <br>\
//     </div>\
//     </div>\
//   </div>'

//   var form= document.getElementById('product_form2')
//   form.innerHTML+=html
// }

function add_more_field4(idx){
  console.log("choice box2");
  html='<input type="radio" name="options" style="width: 10%;height: 20px;margin-right: -10px;" ><input type="text" placeholder="options" style="width: 40%;height: 30px;"><br><br>'
   var form=  document.getElementById("addChoices2");
   console.log(form);
   form.innerHTML+=html
}

// function add_more_field5(){
//   console.log("field5");
//     html1='<head>\
//     <script type ="text/javascript">\
// </script>\
//     <style type="text/css">\
//   .icons-toolbar{\
//   display:flex;\
//   justify-content: space-between;\
//   margin-left: 480px;\
//   margin-bottom: 20px;\
//   align-items: right;\
//   }\
//   .icons-toolbar button{\
//     border-radius: 10px;\
//    }\
//    .textBox{\
//     width: 800px;\
//     min-height: 100px;\
//     background-color:#008B8B;\
//     margin: 10px;\
//     border-radius: 10px;\
//     margin-left: 10px;\
//     padding-right: 50px;\
//     }\
//   .required-toolbar{\
//     display:flex;\
//     justify-content: space-around;\
//     margin-left: 200px;\
//     margin-bottom: 20px;\
//     width: 300px;\
//     }\
//   .switch {\
//     position: relative;\
//     display: inline-block;\
//     width: 50px;\
//     height: 20px;\
//    }\
//   .switch input { \
//     opacity: 0;\
//     width: 0;\
//     height: 0;\
//   }\
//   .slider {\
//     position: absolute;\
//     cursor: pointer;\
//     top: 0;\
//     left: 0;\
//     right: 0;\
//     bottom: 0;\
//     background-color: #ccc;\
//     -webkit-transition: .4s;\
//     transition: .4s;\
//   }\
//   .slider:before {\
//     position: absolute;\
//     content: "";\
//     height: 13px;\
//     width: 15px;\
//     left: 4px;\
//     bottom: 4px;\
//     background-color: white;\
//     -webkit-transition: .4s;\
//     transition: .4s;\
//   }\
//   input:checked + .slider {\
//     background-color: #228B22;\
//   }\
//   input:focus + .slider {\
//     box-shadow: 0 0 1px red;\
//   }\
//   input:checked + .slider:before {\
//     -webkit-transform: translateX(26px);\
//     -ms-transform: translateX(26px);\
//     transform: translateX(26px);\
//   }\
//   .slider.round {\
//     border-radius: 34px;\
//   }\
//   .slider.round:before {\
//     border-radius: 50%;\
//   }\
//   .required-toolbar2{\
//     display:flex;\
//     justify-content: space-around;\
//     margin-left: 400px;\
//     margin-bottom: 20px;\
//     width: 200px;\
//   }\
//   .container .textBox input{\
//     height: 30px;\
//     border: 0ch;\
//  }\
//  .container .textBox .inputAnswer{\
//      height: 30px;\
//   }\
//  .container .textBox{\
//      padding-left: 50px;\
//      padding-top: 30px;\
//  }\
//   </style>\
//   </head>\
//     <div  class="textBox deleteButton4">\
//           <div class="icons-toolbar">\
//               <button style="width: 40px;margin-right:auto;" (click)="deleteButton4()" class="material-icons">\
//                 delete\
//               </button>\
//               <button style="width: 40px;margin-right:auto;" class="material-icons">\
//                 arrow_upward\
//               </button>\
//               <button style="width: 40px;margin-right:auto;" class="material-icons">\
//                 arrow_downward\
//               </button>\
//               <button style="width: 40px;margin-right:auto;" class="material-icons">\
//                 content_copy\
//               </button>\
//             </div>\
//            <input type="text" placeholder="Question" style="width: 100%;height: 40px;"><br><br>\
//            <div>\
//             <form>\
//             <div >\
//              <p id="addChoices2"></p>\
//             <input type="radio" name="options" style="width: 10%;height: 20px;margin-right: -10px;" ><input type="text" placeholder="options" style="width: 40%;height: 30px;"><br><br>\
//             <input type="radio" name="options" style="width: 10%;height: 20px;margin-right: -10px;" ><input type="text" placeholder="options" style="width: 40%;height: 30px;"><br><br>\
//             <p id="addChoices2"></p>\
//             <button type="button" onclick=" add_more_field4()" id="addButton1">Add Options</button>\
//             </div>\
//             </form>\
//           </div>\
//             <div class="required-toolbar">\
//                 <label class="switch">\
//                 <input type="checkbox">\
//                 <span class="slider round"></span>\
//               </label><span>Required</span>\
//               <br> <br>\
//             </div>\
//           </div>\
//     '
//     console.log("outside");
//     var form= document.getElementById('product_form2')
//   form.innerHTML+=html1
// }