import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { EventEmitter, HostListener, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from '../library.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';




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

  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {

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
  DefaultFormId: any;
  DefaultFormName: any;
  Categories: any;

  constructor(private httpClient: HttpClient,private library: LibraryService,private modalService: NgbModal,private service:SharedService, private router:Router,private location: Location,private shared:SharedService,private route: ActivatedRoute) { 
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.openId=params['id'];
      
    });
  }
  
  

  // constructor(private service:SharedService) { }

  // defaultFormData!:any;

  name: any;
  userId:any;
  // role: any;

  loginResponse:any;
baseUrl!:any;
  ngOnInit(): void {

    
    this.loginResponse = this.shared.getResponse()
    this.name = this.loginResponse.emailId;
    this.userId = this.loginResponse.userId;

    this.baseUrl=this.library.getbaseUrl();
this.getform();
    this.getQuestionType();
    // this.FormId=this.service.getformId();
    // this.FormName=this.service.getformName();
    // this.FormData=this.service.getformData();
    // this.openId =this.FormId;
    

  }
  

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
   section={
    categoryName:""
  }
  addSection(){

    
    console.log(this.section)
    this.library.createSection(this.section,this.FormId).subscribe(

      response =>{
        console.log(response);     
        let ref = document.getElementById('close1');
        ref?.click();

        this.section.categoryName="";//to make the popup empty

      //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );

      },
      error =>{
        console.log(error); 
      }
    )
  }



  // edit question
  editQuestion={
    question:""
  }
QuestionValue!:any;
QuestionValue2!:any;
Options!:any;
  QuestionId!:any;


  updateQuestion(que:any){
  this.QuestionId=que;
  console.log(this.QuestionId);
//get question
  this.library.getQuestion(this.QuestionId).subscribe(

    response =>{
      console.log(response); 
        this.QuestionValue=response.question;
        this.editQuestion.question=response.question;
        this.QuestionValue2=this.QuestionValue;
        this.Options=response.options;
    },
    error =>{
      console.log(error); 
    }
  );
  }


 
  updateQuestion2(){
    console.log(this.QuestionId);
    if(this.editQuestion.question==""){
      this.editQuestion.question=this.QuestionValue2;
      console.log("edit question value : "+this.editQuestion.question);
    }
    this.library.updateQuestion(this.editQuestion,this.QuestionId).subscribe(

      response =>{
        console.log(response); 
        let ref = document.getElementById('close12');
        ref?.click();    

              //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );
      },
      error =>{
        console.log(error); 
      }
    )
  }

  
    // edit question end


  // delete question

  // QuestionId!:any;
  deleteQuestion(que:any){
  this.QuestionId=que;
 
  }

  deleteQuestion2(){
    console.log(this.QuestionId);
    this.library.deleteQuestion(this.QuestionId).subscribe(

      response =>{
        console.log(response); 
        let ref = document.getElementById('close7');
        ref?.click();    

              //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );

      },
      error =>{
        console.log(error); 
      }
    )
  }

  //delet Question End

    //edit options
    editOptions={
      
      optionName:""
    }

    

saveOption(optionId:any,optionName:string){
      for(let [index,value] of this.Options.entries()){
        if(this.Options[index].optionId == optionId){
          this.Options[index].optionName = optionName;
        }
      }
      console.log("updated",this.Options);
    }

    optionsId!:any;
    updateOptions(que:any){
    this.optionsId=que;
    console.log(this.optionsId);
   }

   updateOptions2(){
    console.log(this.QuestionId);
   
   
    this.library.updateOptions(this.editOptions,this.optionsId).subscribe(

      response =>{
        console.log(response);     
        let ref = document.getElementById('close3');
        ref?.click();

        //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );

      },
      error =>{
        console.log(error); 
      }
    )
  }


  updateOptionsWithQuestion(){
     let optionsArray={"questionToChange":this.editQuestion.question,
                        "options":this.Options};
    console.log("pushed", optionsArray)
    this.library.updateOptionsWithQuestion(this.QuestionId,optionsArray).subscribe(

      response =>{
        console.log(response);     
        let ref = document.getElementById('close12');
        ref?.click();

        //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );

      },
      error =>{
        console.log(error); 
      }
    )
  }
    //edit options end

//Add options
  addOptions={
      optionName:""
    }
    
    addOptions2(){
      console.log(this.QuestionId);
      this.library.addOptions(this.QuestionId,this.addOptions).subscribe(
  
        response =>{
          console.log(response); 
          let ref = document.getElementById('close10');
          ref?.click();    
          this.addOptions.optionName="";

      //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );


        },
        error =>{
          console.log(error); 
        }
      )
    }

//Add options end
 //create Questions start

 addQuestion={
  question:""
 }

 categoryId!:any;
 addQuestions(categoryId:any){
 this.categoryId=categoryId;
 console.log(this.categoryId);
}
addQuestions2(){
  console.log(this.categoryId);
 
//   if(this.test.quetype2=="Text"){
//     this.quetype=1;
//     console.log(this.quetype);
//   }
//  else if(this.test.quetype2=="Radio"){
//     this.quetype=2;
//     console.log(this.quetype);
//   }
//   else if(this.test.quetype2=="checkbox"){
//     this.quetype=3;
//     console.log(this.quetype);
//   }
  this.library.createQuestions(this.quetype,this.categoryId,this.addQuestion,).subscribe(

    response =>{
      console.log(response);     
      let ref = document.getElementById('addQuestions');
      ref?.click();
      this.addQuestion.question="";
      //to get the form details
      this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
        
         }
         );
      
    },
    error =>{
      console.log(error); 
    }
  )
}

//create Questions end

ediiCategoryName={
  categoryName:""
}
//edit category
editCategory(categoryId:any){
  this.categoryId=categoryId;
  console.log(this.categoryId);
 }
 editCategory2(){
  console.log(this.categoryId);
  this.library.editCategory(this.categoryId,this.ediiCategoryName).subscribe(

    response =>{
      console.log(response);     
      let ref = document.getElementById('close9');
      ref?.click();
      this.ediiCategoryName.categoryName="";
            //to get the form details
            this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
              
               }
               );


    },
    error =>{
      console.log(error); 
    }
  )
}
//edit category end
//delete category
deleteCategory(categoryId:any){
  this.categoryId=categoryId;
  console.log(this.categoryId);
  console.log("delete category method");
 }

 deleteCategory2(){
  console.log(this.QuestionId);
  this.library.deleteCategory(this.categoryId).subscribe(

    response =>{
      console.log(response); 
      let ref = document.getElementById('close8');
      ref?.click();    

            //to get the form details
            this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
        response => {
         console.log(response);
         this.FormId=response.dfId;
         this.FormName=response.dfName;
         this.FormData=response.categories;
              
               }
               );
    },
    error =>{
      console.log(error); 
    }
  )
}
//delete category end


//form cloning start
formClone(){
  const editURL = this.baseUrl+'/cloneform/'+this.name+'/'+this.FormId;

  this.httpClient.post(editURL,'').subscribe(
    response =>{
      console.log(response);
      Swal.fire("Thank you.."," Form Cloned successfully","success");//you need to install sweetalert2
      // this.httpClient.get<any>('http://localhost:9090/iRecruit/getformsbasedonsection/Candidate Forms').subscribe(
      //   response => {
      //     this.forms = response;
      //   }
      // );

    },
    error =>{
      console.log(error);
    }
  )
}
//form cloning end

sendmethod(){
  this.router.navigate(['emailsend'])
}
onBack() {
  history.back();// <-- go back to previous location
}

addresponse(){

  this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(

    response => {

     console.log(response);

 

    //  this.service.setformData(response.dfId);

    //  console.log("data exported");

     this.DefaultFormId=response.dfId;

     this.DefaultFormName=response.dfName;

     this.Categories=response.categories;

     

     this.service.setformId(response.dfId);

     this.service.setformName(response.dfName);

     this.service.setformData(response.categories);



     this.router.navigate(['addresponse'])

     

    //  this.QuestionId=response.questions;

     }

     );

 

}
rename={
  dfName:''
}

FormRename(){
  this.httpClient.put(this.baseUrl+'/editform/'+ this.openId+'/'+this.userId,this.rename).subscribe(
    response => {
     console.log("form renamed successfully"+response);
     let ref = document.getElementById('rename');
      ref?.click(); 
      this.rename.dfName='';
    //to get the form details
    this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
      response => {
       console.log(response);
       this.FormId=response.dfId;
       this.FormName=response.dfName;
       this.FormData=response.categories;
            
             }
             );
    
    
     },
     error =>{
      console.log(error);
     }
     
     );
}

boxId:any;
idforbox(id:any){
    this.boxId=id;
    console.log(this.boxId);
}
catName:any;
categorybox(name:any){
  this.catName=name
  console.log(this.catName);
}

cancel(){
  this.router.navigate(['myforms']);
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
