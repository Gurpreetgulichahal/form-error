import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { FormNavbar } from '../user-section/navbar';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LibraryService } from '../library.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subscription } from 'rxjs';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export interface PeriodicElement {
  formName: string;
  shared: number;
  createdBy: string;
  updatedOn: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    formName: 'UX DESIGNER',
    shared: 4,
    createdBy: 'Deepika',
    updatedOn: '12/09/22',
  },
];
export interface PeriodicElement1 {
  clientName: string;
  jobTitle: string;
  jobId: number;
  formTypes: number;
  responses: number;
}

const ELEMENT_DATA1: PeriodicElement1[] = [
  {
    clientName: 'spectraforce',
    jobTitle: 'UxDesigner',
    jobId: 14379,
    formTypes: 2,
    responses: 10,
  },
];

export class Forms {
  constructor(
    public dfId: string,
    public dfName: string,
    public dfSection: string,
    public formCreationDate: string,
    public categories: string
  ) {}
}

export class ListForm {
  constructor(
    public defaultForm: string,
    public dfId: string,
    public dfName: string,
    public dfSection: string,
    public formCreationDate: string,
    public formDescription: string,
    public designedBy: string
  ) {}
}

export class ResponseTable {
  constructor(
    public clientName: string,
    public jobId: number,
    public jobTitle: string,
    public responses: number
  ) {}
}

export class questionType {
  constructor(public typeId: number, public typeName: string) {}
}

export class responseNextTable {
  constructor(
    public candidateName: string,

    public screenedBy: string,

    public client: string,
    public formName: string,
    public jobTitle: string,
    public jobId: number,
    public candidateEmail: string,
    public createdDate: string
  ) {}
}

export class checkoptions {
  constructor(
    public optionId: number,
    public questionId: number,
    public response: string
  ) {}
}

// export class questionOptions{
//   constructor(
//     public optionId:number,
//     public optionName:string
//   ){}
// }
declare var closingNav: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  displayedColumns: string[] = ['formName', 'shared', 'createdBy', 'updatedOn'];
  dataSource = ELEMENT_DATA;
  displayedColumns1: string[] = [
    'clientName',
    'jobTitle',
    'jobId',
    'formTypes',
    'responses',
  ];
  dataSource1 = ELEMENT_DATA1;

  forms: Forms[] = [];
  listforms: ListForm[] = [];
  ResponseTable: ResponseTable[] = [];
  questiontype: questionType[] = [];
  getresponseNextTable: responseNextTable[] = [];
  checkOptionsId: checkoptions[] = [];

  formType: String = '';
  label: String = '';

  // QuestionOptions!:questionOptions[];
  // QuestionOptions!:any;

  dfName: any;

  sample: any[] = [];
  sample2: any[] = [];
  sample3: any[] = [];

  deleteId!: string;
  openId!: string;

  myForms: boolean = false;
  responses: boolean = false;
  sent: boolean = false;
  visible: boolean = false;
  responseVisible: boolean = true;

  constructor(
    private formNavbar: FormNavbar,
    private httpClient: HttpClient,
    private library: LibraryService,
    private modalService: NgbModal,
    private service: SharedService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private router: Router
  ) {}
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navbarDataAdmin = this.formNavbar.navbarDataAdmin;
  navDataUser = this.formNavbar.navbarDataUser;

  isCandidateFormsState= this.formNavbar.isCandidateFormsState;
  isAssessmentFormsState=this.formNavbar.isAssessmentFormsState;
  isHiringManagerFormsState=this.formNavbar.isHiringManagerFormsState;

  stateSubscription!: Subscription;

  name: any;
  // role: any;

  loginResponse: any;
  userId!: any;
  baseUrl!: any;
  ngOnInit(): void {
    this.loginResponse = this.shared.getResponse();
    this.name = this.loginResponse.emailId;
    this.baseUrl = this.library.getbaseUrl();
    this.loginResponse = this.shared.getResponse();
    this.userId = this.loginResponse.userId;
  
    this.getForms();
    this.responseForms();
    this.getQuestionType();
    this.screenWidth = window.innerWidth;
  }

  responseBar() {
    console.log('click event work');
    this.responseVisible = true;
    this.visible = false;
  }
  MyFormsBar() {
    this.responses = false;
    this.myForms = true;
    this.sent = false;
  }
  sentBar() {
    this.responses = false;
    this.myForms = false;
    this.sent = true;
  }
  data = {
    dfName: '',
    dfSection: '',
  };

  // create default form
  // createForm(){
  //   if (this.data.dfName == '' || this.data.dfSection == '') {
  //    alert("please fill all the fields")

  //      return;
  //    }
  //    else{
  //     console.log("data", this.data);

  //     this.library.createDefaultForm(this.data,this.name).subscribe(

  //       response =>{
  //         console.log(response);
  //         let ref = document.getElementById('close123');
  //         ref?.click();
  //         Swal.fire("Thank you..","Created successfully","success");//you need to install sweetalert2
  //         this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getformsbasedonsection/Candidate Forms').subscribe(
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
  // }
  // create default form end

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // console.log(this.screenWidth)
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  toggleCollapse(): void {
    // console.log(this.screenWidth)
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  closeSidenav(): void {
    // console.log(this.screenWidth)
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-right-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-right-md-screen';
    }
    return styleClass;
  }

  // list of default forms

  getForms() {
    if (this.getAssessmentFormsState()) {
      this.formType = 'Assessment Forms';
    } else if (this.getHiringManagerFormsState()) {
      this.formType = 'Hiring Manager Forms';
    } else if (this.getCandidateFormsState()) {
      this.formType = 'Candidate Forms';
    }
    this.listMyForms();
    console.log('Candidate forms');
    this.httpClient
      .get<any>(this.baseUrl + '/getformsbasedonsection/' + this.formType)
      .subscribe(
        (response) => {
          // console.log(response);
          this.forms = response;
          // location.reload();
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }
  getCandidateFormsState() {
    return this.formNavbar.isCandidateFormsState;
  }
  getAssessmentFormsState() {
    return  this.formNavbar.isAssessmentFormsState;
  }
  getHiringManagerFormsState() {
    return  this.formNavbar.isHiringManagerFormsState;
  }

  // list of default forms End

  //get qtype
  quetype!: any;
  onChange(event: any) {
    console.log(event.value);
  }

  questionType(que: any) {
    this.quetype = que;
    console.log(this.quetype);
  }

  getQuestionType() {
    console.log('Question type');
    this.httpClient
      .get<any>(this.baseUrl + '/getallquestiontypes')
      .subscribe((response) => {
        console.log(response);
        this.questiontype = response;
        // location.reload();
      });
  }
  //get qtype end

  // search forms start
  search() {
    if (this.dfName == '') {
      this.ngOnInit();
    } else {
      this.forms = this.forms.filter((res) => {
        return res.dfName
          .toLocaleLowerCase()
          .match(this.dfName.toLocaleLowerCase());
      });
    }
  }

  CleardfName() {
    this.dfName = '';

    this.httpClient
      .get<any>(this.baseUrl + '/getformsbasedonsection/Candidate Forms')
      .subscribe((response) => {
        // console.log(response);

        this.forms = response;

        // location.reload();
      });
  }
  // search forms end

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
  //   const deleteURL = 'http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/deleteform/' + this.deleteId;
  //   this.httpClient.delete(deleteURL, { responseType: 'text' as 'json' })
  //     .subscribe((results) => {
  //       this.ngOnInit();
  //       this.modalService.dismissAll();

  //     });
  // }
  // delete forms code end

  // individual form open
  DefaultFormId!: any;
  DefaultFormName!: any;
  Categories!: any;

  openForm(form: Forms) {
    console.log('openform');
    this.openId = form.dfId;
    this.httpClient
      .get<any>(this.baseUrl + '/getform/' + this.openId)
      .subscribe(
        (response) => {
          console.log(response);

          //  this.service.setformData(response.dfId);
          //  console.log("data exported");
          this.DefaultFormId = response.dfId;
          this.DefaultFormName = response.dfName;
          this.Categories = response.categories;

          this.service.setformId(response.dfId);
          this.service.setformName(response.dfName);
          this.service.setformData(response.categories);
          this.router.navigate(['openform'], {
            queryParams: { id: this.openId },
          });
          //  this.QuestionId=response.questions;
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }

  openFormByTable(formId: any) {
    console.log('openform');

    this.openId = formId;

    this.httpClient
      .get<any>(this.baseUrl + '/getform/' + this.openId)
      .subscribe(
        (response) => {
          console.log(response);

          //  this.service.setformData(response.dfId);

          //  console.log("data exported");

          this.DefaultFormId = response.dfId;

          this.DefaultFormName = response.dfName;

          this.Categories = response.categories;

          this.service.setformId(response.dfId);

          this.service.setformName(response.dfName);

          this.service.setformData(response.categories);

          this.router.navigate(['editPage'], {
            queryParams: { id: this.openId },
          });

          //  this.QuestionId=response.questions;
        },

        (error) => {
          alert(error.error.message);
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

  //     //to get the form details
  //     this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
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
  //get question
  // this.library.getQuestion(this.QuestionId).subscribe(

  //   response =>{
  //     console.log(response);
  //       this.QuestionValue=response;
  //   },
  //   error =>{
  //     console.log(error);
  //   }
  // )

  //get options by questionId
  // this.library.getOptions(this.QuestionId).subscribe(

  //   response =>{
  //     console.log(response);

  //       this.QuestionOptions=response;
  //       console.log(this.QuestionOptions);
  //   },
  //   error =>{
  //     console.log(error);
  //   }
  // )

  // }
  // updateQuestion2(){
  //   console.log(this.QuestionId);
  //   this.library.updateQuestion(this.editQuestion,this.QuestionId).subscribe(

  //     response =>{
  //       console.log(response);
  //       let ref = document.getElementById('close12');
  //       ref?.click();

  //             //to get the form details
  //     this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
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

  //to get the form details
  //     this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
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

  //       //to get the form details
  //     this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
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

  //to get the form details
  //   this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
  //     response => {
  //      console.log(response);
  //      this.DefaultFormId=response.dfId;
  //      this.DefaultFormName=response.dfName;
  //      this.Categories=response.categories;

  //      }
  //      );

  //     },
  //     error =>{
  //       console.log(error);
  //     }
  //   )
  // }

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
  // this.library.createQuestions(this.quetype,this.categoryId,this.addQuestion,).subscribe(

  //   response =>{
  //     console.log(response);
  //     let ref = document.getElementById('addQuestions');
  //     ref?.click();

  //     //to get the form details
  //     this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
  //       response => {
  //        console.log(response);
  //        this.DefaultFormId=response.dfId;
  //        this.DefaultFormName=response.dfName;
  //        this.Categories=response.categories;

  //        }
  //        );

  //  let refresh=document.getElementById('sectionModal3').reset();

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
  //edit category
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
  //             this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
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

  //             this.httpClient.get<any>('http://3.235.60.71:8081/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit/getform/'+ this.openId).subscribe(
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

  //form cloning start
  // formClone(){
  //   const editURL = this.baseUrl+'/cloneform/'+this.name+'/'+this.DefaultFormId;

  //   this.httpClient.post(editURL,'').subscribe(
  //     response =>{
  //       console.log(response);
  //       Swal.fire("Thank you.."," Form Cloned successfully","success");//you need to install sweetalert2
  //       this.httpClient.get<any>(this.baseUrl+'/getformsbasedonsection/Candidate Forms').subscribe(
  //         response => {
  //           this.forms = response;
  //         }
  //       );

  //     },
  //     error =>{
  //       console.log(error);
  //       alert(error.error.message);

  //     }
  //   )
  // }
  //form cloning end

  //Listing the forms of an user start
  listMyForms() {
    console.log('Entered to ListMyForms');
    this.httpClient
      .get<any>(this.baseUrl + '/getmyforms/' + this.formType + '/' + this.name)
      .subscribe(
        (response) => {
          console.log('Entered user');
          console.log(response);
          this.listforms = response;
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }
  //Listing the forms of an user end

  //Response Tabe

  responseForms() {
    console.log('Entered to ListMyForms');
    this.httpClient.get<any>(this.baseUrl + '/get/' + this.userId).subscribe(
      (response) => {
        console.log('Response Table');
        this.ResponseTable = response;
        console.log(response);
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }
  //Response Table End

  clientname: any;
  responsejobId: any;
  responseJobTitle: any;

  sendJobId(getjobId: any, getclientName: any, getjobTitle: any) {
    this.backicon = true;

    this.clientname = getclientName;
    this.responsejobId = getjobId;
    this.responseJobTitle = getjobTitle;
    console.log(this.clientname);
    this.visible = true;
    this.responseVisible = false;
    this.tabindex = 4;
    console.log(this.tabindex);
    this.ctab = true;
    this.rtab = false;
    console.log(getjobId);

    this.httpClient
      .get<any>(this.baseUrl + '/candidates/' + this.userId + '/' + getjobId)
      .subscribe(
        (response) => {
          console.log('response table next flow');

          this.getresponseNextTable = response;

          console.log(response);

          // this.forms = response;

          // location.reload();
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }
  backicon: boolean = false;
  onBack() {
    console.log('click event work');
    this.responseVisible = true;
    this.visible = false;
    this.backicon = false;
    this.rtab = true;
    this.ctab = false;
  }

  tabindex: any;

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.backicon = false;
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.tabindex = tabChangeEvent.index;
    console.log(this.tabindex);
    if (this.tabindex == 1) {
      this.rtab = true;
      this.mtab = false;
      this.responseVisible = true;
      this.visible = false;
    } else if (this.tabindex == 0) {
      this.mtab = true;
      this.rtab = false;
    } else {
      this.rtab = false;
      this.mtab = false;
    }
  }

  myFormName: any;
  myFormSearch() {
    if (this.myFormName == '') {
      this.ngOnInit();
    } else {
      this.listforms = this.listforms.filter((res) => {
        return res.dfName
          .toLocaleLowerCase()
          .match(this.myFormName.toLocaleLowerCase());
      });
    }
  }
  rtab: boolean = false;
  mtab: boolean = true;
  ctab: boolean = false;
  responseName: any;
  responseCandidateName: any;
  responseSearch() {
    if (this.responseName == '') {
      this.ngOnInit();
    } else {
      this.ResponseTable = this.ResponseTable.filter((res) => {
        return res.clientName
          ?.toLocaleLowerCase()
          .match(this.responseName?.toLocaleLowerCase());
      });
    }
  }

  candidateSearch() {
    if (this.responseCandidateName == '') {
      this.httpClient
        .get<any>(
          this.baseUrl + '/candidates/' + this.userId + '/' + this.responsejobId
        )
        .subscribe((response) => {
          console.log('response table next flow');
          this.getresponseNextTable = response;
          console.log(response);
        });
    } else {
      this.getresponseNextTable = this.getresponseNextTable.filter((res) => {
        return res.candidateName
          ?.toLocaleLowerCase()
          .match(this.responseCandidateName?.toLocaleLowerCase());
      });
    }
  }

  openResponseForm(candidateJobId: any, email: any) {
    console.log('job id is :' + candidateJobId + 'email id is :' + email);

    this.httpClient
      .get<any>(this.baseUrl + '/response/' + candidateJobId + '/' + email)
      .subscribe((response) => {
        console.log('response form');

        console.log(response);
        this.checkOptionsId = response;
        console.log('checking option ids' + this.checkOptionsId);
        this.service.sendOptionsToCheck(this.checkOptionsId);
      });
  }

  showResponse(formname: any) {
    this.httpClient
      .get<any>(this.baseUrl + '/getform/' + this.name + '/' + formname)
      .subscribe(
        (response) => {
          console.log(response);
          this.openId = response.dfId;
          this.service.setformId(response.dfId);
          this.service.setformName(response.dfName);
          this.service.setformData(response.categories);
          console.log('navigation');
          this.router.navigate(['responsePage'], {
            queryParams: { id: this.openId },
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
