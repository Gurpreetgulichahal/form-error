import { Injectable } from '@angular/core';
import{HttpClient} from'@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private baseUrl:string= "http://localhost:9090/iRecruit"
//   private baseUrl:string= "https://irecruitdev.spectraforce.com:8443/iRecruit-Backend-0.0.1-SNAPSHOT/iRecruit"
// //     private baseUrl:string= "http://localhost:9090/iRecruit"

  constructor(private http: HttpClient) { }

  getbaseUrl(){
    return this.baseUrl;
    

  }

  sendData(data:any){
    console.log("postmapping");
    return this.http.post(`${this.baseUrl}/login`,data);
  }

  createDefaultForm(data:any,name:any){
    console.log("Creating Default Forms");
    return this.http.post(`${this.baseUrl}/createform/`+name,data);
  }

  createSection(section:any,DefaultFormId:any){
    console.log("Create sections");
    return this.http.post(`${this.baseUrl}/createcategory/`+DefaultFormId,section,{ responseType: 'text' as 'json' });
  }

  updateQuestion(editQuestion:any,QuestionId:any){
    return this.http.put(`${this.baseUrl}/editquestion/`+QuestionId,editQuestion,{ responseType: 'text' as 'json' });
  }

  deleteQuestion(QuestionId:any){
    return this.http.delete(`${this.baseUrl}/deletequestionwithitsoptions/`+QuestionId,{ responseType: 'text' as 'json' });
  }

  deleteCategory(categoryId:any){
    return this.http.delete(`${this.baseUrl}/deletewholecategory/`+categoryId,{ responseType: 'text' as 'json' });
  }
  
  editCategory(categoryId:any,ediiCategoryName:any){
    return this.http.put(`${this.baseUrl}/renamecategory/`+categoryId,ediiCategoryName,{ responseType: 'text' as 'json' });
  }

  updateOptions(editOptions:any,optionsId:any){
    
    return this.http.put(`${this.baseUrl}/updateoption/`+optionsId,editOptions,{ responseType: 'text' as 'json' });
  }

  addOptions(QuestionId:any,addOptions:any){
    return this.http.post(`${this.baseUrl}/addoption/`+QuestionId,addOptions,{ responseType: 'text' as 'json' });
  }

  getQuestion(QuestionId:any){
    return this.http.get<any>(`${this.baseUrl}/getquestion/`+QuestionId);
  }

  getOptions(QuestionId:any){
    return this.http.get(`${this.baseUrl}/getalloptions/`+QuestionId,{ responseType: 'text' as 'json' });
  }

  createQuestions(quetype:any,categoryId:any,addQuestion:any){
    return this.http.post(`${this.baseUrl}/createquestion/`+quetype+`/`+categoryId,addQuestion,{ responseType: 'text' as 'json' });
  }
  // +qtype+`/`
  sendUserData(user:any){
    return this.http.post(`${this.baseUrl}/register`,user);
  }
  sendCandidateData(candidateData:any,userId:any,FormName:any){
    return this.http.post(`${this.baseUrl}/candidate/`+userId+`/`+FormName,candidateData);
  }

  changePassword(edit:any){
    console.log("changePassword")
    return this.http.put(`${this.baseUrl}/update`,edit,{responseType: 'text' as 'json'});
  }

  newUser(user:any){
    console.log("postmapping");
    return this.http.post(`${this.baseUrl}/register`,user);
  }

  deleteUser(name:any){
    console.log("deletemapping");
    // return this.http.delete(`${this.baseUrl}/delete`,name);
    return this.http.delete(this.baseUrl+"/delete/"+name);
  }

  sendToEmail(jobId:any,userId:any,sendEmail:any){
    console.log("sending link to candidate");
    return this.http.post(`${this.baseUrl}/sendlink/`+jobId+`/`+userId,sendEmail,{ responseType: 'text' as 'json' });
  }

  sentResponse(jobId:any,candidateEmail:any,sentoptionId:any){
    console.log("sending responses");
    return this.http.post(`${this.baseUrl}/addresponse/`+jobId+`/`+candidateEmail+`/`+sentoptionId,{ responseType: 'text' as 'json' });
  }

  sendAnswers(jobId:any,candidateEmail:any,QuestionId:any,response:any){
    return this.http.post(`${this.baseUrl}/textresponse/`+jobId+`/`+candidateEmail+`/`+QuestionId,response,{ responseType: 'text' as 'json' });

  }
  updateOptionsWithQuestion(questionId:any,options:any){
    return this.http.put(`${this.baseUrl}/updatequestion/`+questionId,options,{ responseType: 'text' as 'json' });
  
  }
  // sendForget(changePassword:any){
  //   console.log("before post")
   
  //   return this.http.post(`${this.baseUrl}/forgotpassword`,changePassword)
  createFormNotes(jobId:any,candidateEmail:any,formnotesdata:any){

    console.log("creating form notes");

    return this.http.post(`${this.baseUrl}/formnote/`+jobId+`/`+candidateEmail,formnotesdata);

  }

  deleteFormNote(formNoteId:any){

    console.log("deleting formnotes");

    return this.http.delete(this.baseUrl+"/formnote/"+formNoteId,{ responseType: 'text' as 'json' });



  }
  
  sendOTP(emailId:any){
    console.log("send otp to email ");
    return this.http.get<any>(`${this.baseUrl}/forgot-password/`+emailId,{ responseType: 'text' as 'json' });
    
  }
  verifyOTP(otp:any){
    console.log("send otp to email ")
    return this.http.get<any>(`${this.baseUrl}/verify-otp/`+otp,{ responseType: 'text' as 'json' });
    
  }
  setNewPassword(email:any,newPassword:any,emptyString:any){
    console.log("send otp to email ")
    return this.http.put(`${this.baseUrl}/reset-password/`+email+`/`+newPassword,emptyString,{ responseType: 'text' as 'json' });
    
  }


  getCheckedQuestions(jobId:any,candidateEmail:any){
    console.log("getting checked questions")
    return this.http.get<any>(`${this.baseUrl}/getshared/`+jobId+`/`+candidateEmail);
  }
  sendOTPToCandidate(jobId:any,candidateEmail:any,body:any){
    console.log("sending otp");
    return this.http.post(`${this.baseUrl}/sendotp/`+jobId+`/`+candidateEmail,body,{ responseType: 'text' as 'json' });
  }
  verifyOTPOfCandidate(otp:any,body:any){
    console.log("verifying otp");
    return this.http.post(`${this.baseUrl}/verifyotp/`+otp,body,{ responseType: 'text' as 'json' });
  }
  candidateVerification(jobId:any,candidateEmail:any){
    console.log("candidate verification")
    return this.http.get<any>(`${this.baseUrl}/candidate-verified/`+jobId+`/`+candidateEmail);
  }
}
