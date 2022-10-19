import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { LibraryService } from '../library.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emailsend',
  templateUrl: './emailsend.component.html',
  styleUrls: ['./emailsend.component.css']
})
export class EmailsendComponent implements OnInit {
  loginResponse: any;
  userId: any;

  constructor( private location: Location ,private router:Router,private service:SharedService,private library:LibraryService,private fb:FormBuilder) { }
  FormId!:any;
  candidateEmail!:any;
  jobId!:any;
  emailForm!: FormGroup;

  ngOnInit(): void {
    this.loginResponse = this.service.getResponse()
    this.userId = this.loginResponse.userId;
    this.candidateEmail=this.service.getCandidateEmail();
    this.jobId=this.service.getJobId();
   console.log("email"+this.candidateEmail);
   console.log("jobid"+this.jobId);
    this.FormId=this.service.getformId();

    console.log(this.FormId+'email send page');
    this.emailForm=this.fb.group({
      emailId:[this.candidateEmail,Validators.required],
      subject:['',Validators.required],
      body:['']
      
    })

  }
  onBack() {
    window.history.back();// <-- go back to previous location
  }
  cancel(){
    this.router.navigate(['homepage']);
  }
 
  // sendEmail={
  //   emailId:"",
  //   subject:"",
  //   body:""
  // }

sendLinkToEmail(){
  this.library.sendToEmail(this.jobId,this.userId,this.emailForm.value).subscribe(

    response =>{
      Swal.fire("Thank you..","Mail sent successfully","success"); 
      this.router.navigate(['myforms']);
     console.log(response);    
     
      
    },
    error =>{
      console.log(error);
    }
  )
  }


}

