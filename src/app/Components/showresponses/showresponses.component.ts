import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { EventEmitter, HostListener, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LibraryService } from '../library.service';




// export class Forms {
//   constructor(
//     public dfId: string,
//     public dfName: string,
//     public dfSection: string,
//     public formCreationDate: string,
//     public categories: string,
    
//   ) {
//   }
// }

export class questionType{
  constructor(
    public typeId:number,
    public typeName:string,
  ){}
}

@Component({
  selector: 'app-showresponses',
  templateUrl: './showresponses.component.html',
  styleUrls: ['./showresponses.component.css']
})
export class ShowresponsesComponent implements OnInit {

  // forms: Forms[] = [];
  questiontype:questionType[]=[];

  // QuestionOptions!:questionOptions[];
  QuestionOptions!:any;

  dfName:any;

  sample:any[]=[];
  sample2:any[]=[];
  sample3:any[]=[];

  deleteId!: string;
  openId!:string;
FormName!:any;
FormData!:any;
FormId!:any;
categories:any;

  constructor(private httpClient: HttpClient,private library: LibraryService,private modalService: NgbModal,private service:SharedService, private router:Router,private location: Location,private shared:SharedService,private route:ActivatedRoute) { 
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.openId=params['id'];
      
    });
  }
  
  

  // constructor(private service:SharedService) { }

  // defaultFormData!:any;

  name: any;
  // role: any;
  testf : number=10;


  loginResponse:any;
receiveOptionsToCheck:any;
baseUrl!:any;
  ngOnInit(): void {

    this.loginResponse = this.shared.getResponse()
    this.name = this.loginResponse.emailId;
    this.getQuestionType();
    this.baseUrl=this.library.getbaseUrl();
    this.getform();
    this.receiveOptionsToCheck=this.service.getOptions();

   
  
    // this.FormId=this.service.getformId();
    // this.FormName=this.service.getformName();
    // this.FormData=this.service.getformData();
    // this.openId =this.FormId;
    

  }
  

  // data ={

  //   dfName: "",
  //   dfSection: ""
  // }


  // create default form
  // createForm(){
  //   if (this.data.dfName == '' || this.data.dfSection == '') {
  //    alert("please fill all the fields")
    
  //      return;
  //    }
  //    else{
  //     console.log("data", this.data);

  //     this.library.createDefaultForm(this.data).subscribe(

  //       response =>{
  //         console.log(response);
  //         let ref = document.getElementById('close123');
  //         ref?.click();
  //         Swal.fire("Thank you..","Created successfully","success");//you need to install sweetalert2
  //         this.httpClient.get<any>('http://localhost:9090/iRecruit/getallforms').subscribe(
  //           response => {
  //             // console.log(response);
  //             this.forms = response;
  //             // location.reload();
  //           }
  //         );       
  //       },
  //       error =>{
  //         console.log(error);
  //       }
  //     )
  //   }
  // }// create default form end

  // list of default forms
  
  // list of default forms End

  //get qtype
quetype!:any
  onChange(event: any){
    console.log(event.value);
  }

  questionType(que:any){
  this.quetype=que;
 console.log(this.quetype);
}

  getQuestionType(){
    console.log("Question type");
    this.httpClient.get<any>(this.baseUrl+'/getallquestiontypes').subscribe(
      response => {
        console.log(response);
        this.questiontype = response;
        // location.reload();
      }
    );
  }
  //get qtype end
    //get qtype end
testing!:any;
f!:string;

setvalue(q:any){
  this.f=q;
//  this.f='10';
//  this.testing=q;
 console.log("f value is "+this.f);
 return this.f;
}
g!:string;
setvalueOf(){
 this.g='20';
 

 this.f=this.g;
 console.log("f value is "+this.f);
 return this.f;
}

  assignTestfValue(){
    console.log("testing options");
    this.testf = 100;
  }

   // delete forms code

//  openDelete(targetModal: any, form: Forms) {
//   console.log("delte button")
//   this.deleteId = form.dfId;
//   this.modalService.open(targetModal, {
//     backdrop: 'static',
//     size: 'lg'
//   });
// }

// onDelete() {
//   const deleteURL = 'http://localhost:9090/iRecruit/deleteform/' + this.deleteId;
//   this.httpClient.delete(deleteURL, { responseType: 'text' as 'json' })
//     .subscribe((results) => {
//       this.ngOnInit();
//       this.modalService.dismissAll();
//       // let ref = document.getElementById('close123');
//       // ref?.click();
//     });
// }
// delete forms code end

// individual form open







  //testing code

  // section={
  //   categoryName:""
  // }
  // addSection(){

    
  //   console.log(this.section)
  //   this.library.createSection(this.section,this.FormId).subscribe(

  //     response =>{
  //       console.log(response);     
  //       let ref = document.getElementById('close1');
  //       ref?.click();

  //       this.section.categoryName="";//to make the popup empty

  //     //to get the form details
  //     this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.FormId=response.dfId;
  //        this.FormName=response.dfName;
  //        this.FormData=response.categories;
        
  //        }
  //        );

  //     },
  //     error =>{
  //       console.log(error); 
  //     }
  //   )
  // }



  // edit question
//   editQuestion={
//     question:""
//   }
// QuestionValue!:any;
// Options!:any;
//   QuestionId!:any;
//   updateQuestion(que:any){
//   this.QuestionId=que;
//   console.log(this.QuestionId);
// //get question
//   this.library.getQuestion(this.QuestionId).subscribe(

//     response =>{
//       console.log(response); 
//         this.QuestionValue=response.question;
//         this.Options=response.options;

    
//     },
//     error =>{
//       console.log(error); 
//     }
//   );
//   }
 
//   updateQuestion2(){
//     console.log(this.QuestionId);
//     this.library.updateQuestion(this.editQuestion,this.QuestionId).subscribe(

//       response =>{
//         console.log(response); 
//         let ref = document.getElementById('close12');
//         ref?.click();    

//               //to get the form details
//       this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
//         response => {
//          console.log(response);
//          this.FormId=response.dfId;
//          this.FormName=response.dfName;
//          this.FormData=response.categories;
        
//          }
//          );
//       },
//       error =>{
//         console.log(error); 
//       }
//     )
//   }

    // edit question end


  // delete question

  // QuestionId!:any;
  // deleteQuestion(que:any){
  // this.QuestionId=que;
 
  // }

  // deleteQuestion2(){
  //   console.log(this.QuestionId);
  //   this.library.deleteQuestion(this.QuestionId).subscribe(

  //     response =>{
  //       console.log(response); 
  //       let ref = document.getElementById('close7');
  //       ref?.click();    

  //             //to get the form details
  //     this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.FormId=response.dfId;
  //        this.FormName=response.dfName;
  //        this.FormData=response.categories;
        
  //        }
  //        );

  //     },
  //     error =>{
  //       console.log(error); 
  //     }
  //   )
  // }

  //delet Question End

    //edit options
  //   editOptions={
  //     optionName:""
  //   }

  //   optionsId!:any;
  //   updateOptions(que:any){
  //   this.optionsId=que;
  //   console.log(this.optionsId);
  //  }

  //  updateOptions2(){
  //   console.log(this.QuestionId);
  //   this.library.updateOptions(this.editOptions,this.optionsId).subscribe(

  //     response =>{
  //       console.log(response);     
  //       let ref = document.getElementById('close3');
  //       ref?.click();

  //       //to get the form details
  //     this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.FormId=response.dfId;
  //        this.FormName=response.dfName;
  //        this.FormData=response.categories;
        
  //        }
  //        );

  //     },
  //     error =>{
  //       console.log(error); 
  //     }
  //   )
  // }
    //edit options end

//Add options
  // addOptions={
  //     optionName:""
  //   }
    
  //   addOptions2(){
  //     console.log(this.QuestionId);
  //     this.library.addOptions(this.QuestionId,this.addOptions).subscribe(
  
  //       response =>{
  //         console.log(response); 
  //         let ref = document.getElementById('close10');
  //         ref?.click();    

  //     //to get the form details
  //     this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.FormId=response.dfId;
  //        this.FormName=response.dfName;
  //        this.FormData=response.categories;
        
  //        }
  //        );


  //       },
  //       error =>{
  //         console.log(error); 
  //       }
  //     )
  //   }

//Add options end
 //create Questions start

//  addQuestion={
//   question:""
//  }

//  categoryId!:any;
//  addQuestions(categoryId:any){
//  this.categoryId=categoryId;
//  console.log(this.categoryId);
// }
// addQuestions2(){
//   console.log(this.categoryId);
 
// //   if(this.test.quetype2=="Text"){
// //     this.quetype=1;
// //     console.log(this.quetype);
// //   }
// //  else if(this.test.quetype2=="Radio"){
// //     this.quetype=2;
// //     console.log(this.quetype);
// //   }
// //   else if(this.test.quetype2=="checkbox"){
// //     this.quetype=3;
// //     console.log(this.quetype);
// //   }
//   this.library.createQuestions(this.quetype,this.categoryId,this.addQuestion,).subscribe(

//     response =>{
//       console.log(response);     
//       let ref = document.getElementById('addQuestions');
//       ref?.click();
//       this.addQuestion.question="";
//       //to get the form details
//       this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
//         response => {
//          console.log(response);
//          this.FormId=response.dfId;
//          this.FormName=response.dfName;
//          this.FormData=response.categories;
        
//          }
//          );
      
//     },
//     error =>{
//       console.log(error); 
//     }
//   )
// }

//create Questions end

// ediiCategoryName={
//   categoryName:""
// }
// //edit category
// editCategory(categoryId:any){
//   this.categoryId=categoryId;
//   console.log(this.categoryId);
//  }
//  editCategory2(){
//   console.log(this.categoryId);
//   this.library.editCategory(this.categoryId,this.ediiCategoryName).subscribe(

//     response =>{
//       console.log(response);     
//       let ref = document.getElementById('close9');
//       ref?.click();
      
//             //to get the form details
//             this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
//         response => {
//          console.log(response);
//          this.FormId=response.dfId;
//          this.FormName=response.dfName;
//          this.FormData=response.categories;
              
//                }
//                );


//     },
//     error =>{
//       console.log(error); 
//     }
//   )
// }
// //edit category end
// //delete category
// deleteCategory(categoryId:any){
//   this.categoryId=categoryId;
//   console.log(this.categoryId);
//   console.log("delete category method");
//  }

//  deleteCategory2(){
//   console.log(this.QuestionId);
//   this.library.deleteCategory(this.categoryId).subscribe(

//     response =>{
//       console.log(response); 
//       let ref = document.getElementById('close8');
//       ref?.click();    

//             //to get the form details
//             this.httpClient.get<any>('http://localhost:9090/iRecruit/getform/'+ this.openId).subscribe(
//         response => {
//          console.log(response);
//          this.FormId=response.dfId;
//          this.FormName=response.dfName;
//          this.FormData=response.categories;
              
//                }
//                );
//     },
//     error =>{
//       console.log(error); 
//     }
//   )
// }
//delete category end


//form cloning start
// formClone(){
//   const editURL = 'http://localhost:9090/iRecruit/cloneform/'+this.name+'/'+this.FormId;

//   this.httpClient.post(editURL,'').subscribe(
//     response =>{
//       console.log(response);
//       Swal.fire("Thank you.."," Form Cloned successfully","success");//you need to install sweetalert2
//       // this.httpClient.get<any>('http://localhost:9090/iRecruit/getformsbasedonsection/Candidate Forms').subscribe(
//       //   response => {
//       //     this.forms = response;
//       //   }
//       // );

//     },
//     error =>{
//       console.log(error);
//     }
//   )
// }
//form cloning end

sendmethod(){
  this.router.navigate(['emailsend'])
}
onBack() {
  history.back();// <-- go back to previous location
}
addresponse(){
  this.router.navigate(['addresponse'])
}

getform(){
  this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
    response => {
     console.log(response);
     this.FormId=response.dfId;
     this.FormName=response.dfName;
     this.FormData=response.categories;
          
           }
           );
}

}
