import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-candidate-login',
  templateUrl: './candidate-login.component.html',
  styleUrls: ['./candidate-login.component.css']
})
export class CandidateLoginComponent implements OnInit {

  LoginForm!:FormGroup;
  hidedata:boolean=false;
  hidesubmit:boolean=false;
  SubmitButton:boolean=false;
  getJobId: any;
  getCandidateEmail: any;
  openId: any;
  constructor( private library:LibraryService,private shared:SharedService,private route: ActivatedRoute,private httpClient: HttpClient,private fb:FormBuilder,private router:Router) {
    this.route.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.getJobId=params['jobId'];
      this.getCandidateEmail=params['emailId'];
      this.openId=params['id'];
    });
   }

  ngOnInit(): void {
    this.LoginForm=this.fb.group({
      emailId:[this.getCandidateEmail,Validators.required],
      otp:['']
  })

}
body={

}


verifyotp(){
  this.library.verifyOTPOfCandidate(this.LoginForm.value.otp,this.body).subscribe(

    res => {

      console.log(res);

      if(res==="Candidate Verififed Successfully"){
        // alert("OTP verification is successful,you can login");
        Swal.fire({
          icon: 'success',
          text: 'OTP verification is successful,you can login',
          
        })
        this.SubmitButton=true;
        this.hidesubmit=true
      }
      else{
        // alert("Entered OTP is incorrect,Please enter correctly!!");
        Swal.fire({
          icon: 'error',
          text: 'Entered OTP is incorrect,Please enter correctly!!',
          
        })
        
      }
    },

    error => {

      console.log(error);
      

      alert(error.error.message);

    }

  );

}
submit(){
  this.router.navigate(['CandidateForm'],{ queryParams: { jobId:this.getJobId,emailId:this.getCandidateEmail}});
}

candidateVerification(){

  this.library.candidateVerification(this.getJobId,this.getCandidateEmail).subscribe(

    res => {

      console.log("verification of candidate")
      console.log(res);
      if(res===false){

        this.library.sendOTPToCandidate(this.getJobId,this.getCandidateEmail,this.body).subscribe(

          res => {
      
            // alert("otp sent successfully to your emailId");
            Swal.fire("Thank you..","OTP sent Successfully to your emailId","success");
            console.log(res);
            
            
            this.hidedata=true;

            
          },
      
        //   error => {
      
        //     console.log(error);
      
        //     alert(error.error.message);
      
        //   }
      
         );

      }
      else{
        
        Swal.fire({
          icon: 'success',
          text: 'You are already verified.You can login directly',
          
        })
        this.SubmitButton=true;
        this.hidedata=false;
        this.hidesubmit=true;
        

      }
     
      
      
      
      
    },

    error => {

      console.log(error);
      console.log("not verified")
      Swal.fire({icon: 'error',
      title: 'Oops...',
      text: error.error.message
    });
      // alert(error.error.message);
      
        this.SubmitButton=true;
        this.hidedata=false;
        this.hidesubmit=false;
      
      

    }

  );


}


}
