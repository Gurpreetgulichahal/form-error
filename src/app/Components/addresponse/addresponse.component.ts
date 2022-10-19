import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LibraryService } from '../library.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { not } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

export class FormNotes {
  constructor(
    public noteId: string,
    public note: string,
    public noteCreationDate: string,
    public linkedCandidate: string,
    
    
  ) {
  }
}

@Component({
  selector: 'app-addresponse',
  templateUrl: './addresponse.component.html',
  styleUrls: ['./addresponse.component.css']
})



export class AddresponseComponent implements OnInit {

openId!:string;
formNotes: FormNotes[] = [];
FormName!:any;
FormData!:any;
FormId!:any;
categories:any;
name: any;
userId:any;
  // role: any;

loginResponse:any;
formVisible:boolean=false;
isDisabled:boolean=true;

candidateForm!:FormGroup;
baseUrl!:any;

constructor(private httpClient: HttpClient,private library: LibraryService,private modalService: NgbModal,private service:SharedService, private router:Router,private location: Location,private shared:SharedService, private fb: FormBuilder) { }

  ngOnInit(): void {

    // this.loginResponse = this.shared.getResponse()
    // this.name = this.loginResponse.emailId;
    this.loginResponse = this.shared.getResponse()
    this.userId = this.loginResponse.userId;
    this.baseUrl=this.library.getbaseUrl();
    
    this.FormId=this.service.getformId();
    this.FormName=this.service.getformName();
    this.FormData=this.service.getformData();
    this.openId =this.FormId;

    


    this.candidateForm =this.fb.group({

      candidateName: ['', Validators.required],
  
      candidateEmail: [''],
  
      candidatePhoneNumber: [''],
      screenedBy: [''],
      client: [''],
      jobTitle: [''],
      jobId: ['']
  
    });
  
   
    

  }

    

  // candidate={
  //   CandidateName:"",
  //   CandidateEmail:"",
  //   CandidatePhoneNumber:"",
  //   ScreenedBy:"",
  //   Client:"",
  //   JobTitle:"",
  //   JobId:""
  // } //candidateDetails

  onBack() {
    this.location.back();// <-- go back to previous location
  }
  cancel(){
    this.router.navigate(['homepage']);
  }

  getJobId!:any;
  getCandidateEmail!:any;

  // {
  //   console.log("sucess");
  //   console.log(this.userId)
    
    
  // }


  createCandidate() {

    this.library.sendCandidateData(this.candidateForm.value,this.userId,this.FormName).subscribe(

      res => {

        console.log(res);
        this.getCandidateEmail=this.candidateForm.value.candidateEmail; 
        this.getJobId=this.candidateForm.value.jobId;
        this.service.setCandidateEmail(this.getCandidateEmail);
        this.service.setJobId(this.getJobId);

        console.log(this.getCandidateEmail+"get response"+this.getJobId+"form name is "+this.FormName);
        
        Swal.fire("Thank you..","candidate created Successfully!!","success");
       
        // this.candidateForm.reset();
        this.formVisible=true;
        this.candidateForm.disable()
        

      },

      error => {

        console.log(error);

        alert(error.error.message);

      }

    );
  }
  
  addnotes={
    note:""
  }
formnotes:any;
notes:String="";
createAddNotes(){

  this.library.createFormNotes(this.getJobId,this.getCandidateEmail,this.addnotes).subscribe(

    res => {

      console.log(res);
      console.log(this.getJobId);
      console.log(this.getCandidateEmail);
      console.log(this.addnotes)

       this.httpClient.get<any>(this.baseUrl+'/formnotes/'+ this.getJobId+`/`+this.getCandidateEmail).subscribe(
       response => {
        console.log(response);
        this.formNotes=response
        this.addnotes.note="";
        
       
        }
        );
      

    },

    error => {

      console.log(error);

      alert(error.error.message);

    }

  );

}

  sendmethod(){
  this.router.navigate(['emailsend'])
}

noteid:any;
deletefommnotedata(formnoteid:any){
this.noteid=formnoteid;
console.log(this.noteid);

this.library.deleteFormNote(this.noteid).subscribe(

  response =>{
    console.log(response); 
    let ref = document.getElementById('close7');
    ref?.click();    

          //to get the form details
          this.httpClient.get<any>(this.baseUrl+'/formnotes/'+ this.getJobId+`/`+this.getCandidateEmail).subscribe(
            response => {
             console.log(response);
             this.formNotes=response
             
            
             }
             );
  

  },
  error =>{
    console.log(error); 
  }
)

}
saveResponse(){
  alert("response saved succussfully");
  this.router.navigate(['homepage']);
}

 

}