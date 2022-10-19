import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgxCaptchaService} from  '@binssoft/ngx-captcha'
import { LibraryService } from '../library.service';
import { SharedService } from 'src/app/shared/shared.service';

// npm install @binssoft/ngx-captcha --force    to install ngx-captcha run this command
declare const userDetails :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  captchaStatus:any = null;
  captchaConfig:any = {
    // textType:'C',
    // textCase:'M',
    type:2,
     length:6,
     cssClass:'custom',
     back: {
       stroke:"#2F9688",
       solid:"#f2efd2"
     } ,
     font:{
      color:"#000000",
      size:"35px"
     }
   };


 

LoginForm!:FormGroup;
hide = true;
SubmitButton:boolean=false;
emailButton:boolean=true;
otpButton:boolean=false;
passwordButton:boolean=false;
otp:boolean=false;
newPassword:boolean=false;
mainForm:boolean=true;
myform!: FormGroup;
forgotPasswordForm:boolean=false;
constructor(private router :Router,private captchaService:NgxCaptchaService,private library: LibraryService,private shared:SharedService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.LoginForm=this.fb.group({
      emailId:['gkishorekumar961@gmail.com',Validators.required],
      password:['Admin123#',Validators.required]
    });


    this.captchaService.captchStatus.subscribe((status)=>{
      this.captchaStatus= status;
      if (status == false)
      {
        this.SubmitButton=false;
        alert("Please Enter The Captcha Correctly");
       
      }
      if (status == true) 
      {
        if (!this.LoginForm.valid) {
          this.SubmitButton=false;

         alert("Captcha is Valid.But all the feilds are required");
         }
        else{
          this.SubmitButton=true;
        }
      }
    });

  }

Login()
{
  this.library.sendData(this.LoginForm.value).subscribe(
            response =>{
              console.log(response);
              
              this.shared.setResponse(response);
              // alert("Login Successfull!!");
            this.router.navigate(['/homepage'])//,{queryParams:{data:this.LoginForm.get('emailId')?.value},skipLocationChange:true}
            },
            error =>{
              console.log(error);
              alert(error.error.message);
            }
          );
}


 clearEmailId()
 {
  this.LoginForm.get('emailId')?.reset();
 }

 changePassword={
  emailId:"",
  sentotp:"",
  setNewPassword:""
}
sendOTPToEmail(){
      this.library.sendOTP(this.changePassword.emailId).subscribe(
        response=>{
          this.emailButton=false;
          this.otpButton=true;
          this.otp=true;
          
          console.log("otp received");
        },
        error =>{
      console.log(error);
      alert(error.error.message);
        }
      );
  }
  verifyOTP(){
    this.library.verifyOTP(this.changePassword.sentotp).subscribe(
      response=>{
        this.otpButton=false;
        this.newPassword=true;
        this.passwordButton=true;
        console.log("otp verified");
      },
      error =>{
    console.log(error);
    alert("Invalid OTP");
      }
    );
  }

  emptyString={

  }
  updatePassword(){
    this.library.setNewPassword(this.changePassword.emailId ,this.changePassword.setNewPassword,this.emptyString).subscribe(
      response=>{
        alert("Password Changed Successfully");
        let ref = document.getElementById('close123');
          ref?.click();
      // this.mainForm=false;
      location.reload();
      },
      error =>{
              console.log(error);
              alert(error.error.message);
      }
    );
  }

  fadeout(){
    this.mainForm=false;
  }

  display(){
    this.mainForm=true;
  }
}
