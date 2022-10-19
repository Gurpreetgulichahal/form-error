import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SharedService {
  
  response: any;
  details:any;
    constructor() { }
  setResponse(data: any) {
    this.response = {userId:data.userId,emailId:data.emailId,role:data.role};
    localStorage.setItem('details', JSON.stringify(this.response));
  }
  getResponse() {
    this.details=localStorage.getItem('details');
    this.response=JSON.parse(this.details);
    return this.response;
  }

   //formpage code



   formData!:any;

   formName!:any;
 
   formId!:any;
 
   candidateEmail!:any;
   jobId!:any;
   
   setformData(data: any) {
 
     this.formData = data;
 
   }
 
   getformData() {
 
     return this.formData;
 
   }
 setformId(data: any) {
 
     this.formId = data;
 
   }
 
   getformId() {
 
     return this.formId;
 
   }
  setformName(data: any) {
 
     this.formName = data;
 
   }
 
   getformName() {
 
     return this.formName;
 
   }

   setCandidateEmail(data: any) {
 
    this.candidateEmail = data;

  }

  getCandidateEmail() {

    return this.candidateEmail;

  }

  setJobId(data:any){
    this.jobId=data;
  }
  getJobId(){
    return this.jobId;
  }

  getOptionsToCheck!:any;
  sendOptionsToCheck(data:any){
    this.getOptionsToCheck=data;
    console.log("getting options to check : "+this.getOptionsToCheck);
  }
  getOptions(){
    return this.getOptionsToCheck;
  }
}
