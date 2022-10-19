import { trigger, transition, style, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormNavbar } from '../user-section/navbar';
// import { navbarDataUser } from '../user-section/navbar';
import { HttpClient } from '@angular/common/http';
// import { NgForm } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from '../library.service';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';



interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export class Forms {
  constructor(
    public dfId: string,
    public dfName: string,
    public dfSection: string,
    public formCreationDate: string,
    public categories: string,
    
  ) {
  }
}

export class questionType{
  constructor(
    public typeId:number,
    public typeName:string,
  ){}
}

// export class questionOptions{
//   constructor(
//     public optionId:number,
//     public optionName:string
//   ){}
// }
declare var closingNav: any;

@Component({
  selector: 'app-form-management',
  templateUrl: './form-management.component.html',
  styleUrls: ['./form-management.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 })
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class FormManagementComponent implements OnInit {

  forms: Forms[] = [];
  questiontype:questionType[]=[];

  // QuestionOptions!:questionOptions[];
  // QuestionOptions!:any;

  dfName:any;

  sample:any[]=[];
  sample2:any[]=[];
  sample3:any[]=[];

  deleteId!: string;
  openId!:string;

  name: any;
  // role: any;

  loginResponse:any;
baseUrl!:any;
  constructor(private formNavbar: FormNavbar,private httpClient: HttpClient,private library: LibraryService,private modalService: NgbModal,private service:SharedService,private shared:SharedService,private router:Router) { }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navbarDataAdmin = this.formNavbar.navbarDataAdmin;
  navDataUser=this.formNavbar.navbarDataUser;  
  ngOnInit(): void {
    this.loginResponse = this.shared.getResponse()
    this.name = this.loginResponse.emailId;
    this.baseUrl=this.library.getbaseUrl();
    this.getForms();
    this.getQuestionType();
    this.screenWidth = window.innerWidth;

    
  }

  data ={

    dfName: "",
    dfSection: ""
  }

  // create default form
  createForm(){
    if (this.data.dfName == '' || this.data.dfSection == '') {
     alert("please fill all the fields")
    
       return;
     }
     else{
      console.log("data", this.data);

      this.library.createDefaultForm(this.data,this.name).subscribe(

        response =>{
          console.log(response);
          let ref = document.getElementById('close123');
          ref?.click();
          Swal.fire("Thank you..","Created successfully","success");//you need to install sweetalert2
          this.httpClient.get<any>(this.baseUrl+'/getallforms').subscribe(
            response => {
              // console.log(response);
              this.forms = response;
              // location.reload();
            }
          );       
        },
        error =>{
          console.log(error);
          alert(error.error.message);
        }
      )
    }
  }// create default form end

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // console.log(this.screenWidth)
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  toggleCollapse(): void {
    // console.log(this.screenWidth)
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    // console.log(this.screenWidth)
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-right-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-right-md-screen'
    }
    return styleClass;
  }

   // list of default forms
   getForms() {
    console.log("default forms");
    this.httpClient.get<any>(this.baseUrl+'/getallforms').subscribe(
      response => {
        // console.log(response);
        this.forms = response;
        // location.reload();
      }
    );
  }
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

  // search forms start
  search() {

    if (this.dfName == "") {

      this.ngOnInit();

    } else {

      this.forms = this.forms.filter(res => {

        return res.dfName.toLocaleLowerCase().match(this.dfName.toLocaleLowerCase());

      });

    }

  }

  CleardfName(){

    this.dfName='';

    this.httpClient.get<any>(this.baseUrl+'/getallforms').subscribe(

      response => {

        // console.log(response);

        this.forms = response;

        // location.reload();

      }

    );

  }
// search forms end




 // delete forms code

 openDelete(targetModal: any, form: Forms) {
  console.log("delte button")
  this.deleteId = form.dfId;
  this.modalService.open(targetModal, {
    backdrop: 'static',
    size: 'lg'
  });
}

onDelete() {
  const deleteURL = this.baseUrl+'/deleteform/' + this.deleteId;
  this.httpClient.delete(deleteURL, { responseType: 'text' as 'json' })
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
      // let ref = document.getElementById('close123');
      // ref?.click();
    });
}
// delete forms code end

// individual form open
DefaultFormId!:any;
DefaultFormName!:any;
Categories!:any;

openForm(form: Forms){
  console.log("openform");
      this.openId = form.dfId;
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
      this.router.navigate(['openform'],{ queryParams: { id:this.openId}});
     //  this.QuestionId=response.questions;
      }
      );
     }




  //testing code

  // section={
  //   categoryName:""
  // }
  // addSection(){

  //   console.log(this.section)
  //   this.library.createSection(this.section,this.DefaultFormId).subscribe(

  //     response =>{
  //       console.log(response);     
  //       let ref = document.getElementById('close1');
  //       ref?.click();

  //     this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.DefaultFormId=response.dfId;
  //        this.DefaultFormName=response.dfName;
  //        this.Categories=response.categories;
        
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

//   QuestionId!:any;
//   updateQuestion(que:any){
//   this.QuestionId=que;
//   console.log(this.QuestionId);
//   this.library.getQuestion(this.QuestionId).subscribe(

//     response =>{
//       console.log(response); 
//         this.QuestionValue=response;
//     },
//     error =>{
//       console.log(error); 
//     }
//   )

//   //get options by questionId
//   // this.library.getOptions(this.QuestionId).subscribe(

//   //   response =>{
//   //     console.log(response); 
       
//   //       this.QuestionOptions=response;
//   //       console.log(this.QuestionOptions);
//   //   },
//   //   error =>{
//   //     console.log(error); 
//   //   }
//   // )

//   }
//   updateQuestion2(){
//     console.log(this.QuestionId);
//     this.library.updateQuestion(this.editQuestion,this.QuestionId).subscribe(

//       response =>{
//         console.log(response); 
//         let ref = document.getElementById('close12');
//         ref?.click();    

//       this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
//         response => {
//          console.log(response);
//          this.DefaultFormId=response.dfId;
//          this.DefaultFormName=response.dfName;
//          this.Categories=response.categories;
        
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

  //     this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.DefaultFormId=response.dfId;
  //        this.DefaultFormName=response.dfName;
  //        this.Categories=response.categories;
        
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

  //     this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.DefaultFormId=response.dfId;
  //        this.DefaultFormName=response.dfName;
  //        this.Categories=response.categories;
        
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

  //     this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.DefaultFormId=response.dfId;
  //        this.DefaultFormName=response.dfName;
  //        this.Categories=response.categories;
        
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
 

//   this.library.createQuestions(this.quetype,this.categoryId,this.addQuestion,).subscribe(

//     response =>{
//       console.log(response);     
//       let ref = document.getElementById('addQuestions');
//       ref?.click();

      
//       this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
//         response => {
//          console.log(response);
//          this.DefaultFormId=response.dfId;
//          this.DefaultFormName=response.dfName;
//          this.Categories=response.categories;
        
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
      
//             this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
//               response => {
//                console.log(response);
//                this.DefaultFormId=response.dfId;
//                this.DefaultFormName=response.dfName;
//                this.Categories=response.categories;
              
//                }
//                );


//     },
//     error =>{
//       console.log(error); 
//     }
//   )
// }
//edit category end
//delete category
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

//             this.httpClient.get<any>(this.baseUrl+'/getform/'+ this.openId).subscribe(
//               response => {
//                console.log(response);
//                this.DefaultFormId=response.dfId;
//                this.DefaultFormName=response.dfName;
//                this.Categories=response.categories;
              
//                }
//                );
//     },
//     error =>{
//       console.log(error); 
//     }
//   )
// }
//delete category end

}
