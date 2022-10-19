import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css']
})
export class CandidateFormComponent implements OnInit {

  getJobId: any;
  getCandidateEmail: any;
  FormName: any;
  openId: any;
  FormId: any;
  FormData: any;
  LoginForm!:FormGroup;
  hidedata:boolean=false;
  SubmitButton:boolean=false;
  formName!:any;
  categories!:any;
  baseUrl!: string;
  constructor( private library:LibraryService,private shared:SharedService,private route: ActivatedRoute,private httpClient: HttpClient,private fb:FormBuilder) {
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.getJobId=params['jobId'];
      this.getCandidateEmail=params['emailId'];
      this.openId=params['id'];
    });
   }

  ngOnInit(): void {
   
  this.baseUrl=this.library.getbaseUrl();

    // this.getJobId=this.shared.getJobId();
    // this.getCandidateEmail=this.shared.getCandidateEmail();
    // console.log(this.getCandidateEmail);
    // console.log(this.getJobId);
    this.getCheckedQuestions();
    this.getform();
    // this.FormName=this.shared.getformName();
    
  }
  
  getCheckedQuestions(){
    console.log("getquestions");
    console.log(this.getCandidateEmail);
    console.log(this.getJobId);

    this.library.getCheckedQuestions(this.getJobId,this.getCandidateEmail).subscribe(
  
      res => {
  
        console.log(res);
        this.formName=res.formName;
        this.categories=res.categories;
        // this.checkedform=res;
        
  
        
          
        
  
      },
  
      error => {
  
        console.log(error);
  
        alert(error.error.message);
  
      }
  
    );
  
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

  body={

  }

  sendOtp(){
    this.library.sendOTPToCandidate(this.getJobId,this.getCandidateEmail,this.body).subscribe(

      res => {
  
        console.log(res);
        
        this.hidedata=true;
        
  
         
        
  
      },
  
      error => {
  
        console.log(error);
  
        alert(error.error.message);
  
      }
  
    );
  
  }
  verifyotp(){
    this.library.verifyOTPOfCandidate(this.LoginForm.value.otp,this.body).subscribe(

      res => {
  
        console.log(res);

        if(res==="Invalid OTP"){
          alert("invalid otp");
        }
        else{
          alert("otp success")
          this.SubmitButton=true;
        }

        
        
        
        
  
         
        
  
      },
  
      error => {
  
        console.log(error);
        alert("Please Enter The otp Correctly");
  
        alert(error.error.message);
  
      }
  
    );
  
  }
  
  

}
