import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
// import { CandidateFormGalleryComponent } from './candidate-form-gallery/candidate-form-gallery.component';
import { AddresponseComponent } from './Components/addresponse/addresponse.component';
// import { AssessmentFormsComponent } from './Components/assessment-forms/assessment-forms.component';
import { EditPageComponent } from './Components/edit-page/edit-page.component';
import { DefaultformComponent } from './Components/defaultform/defaultform.component';
import { EmailsendComponent } from './Components/emailsend/emailsend.component';
import { FormManagementComponent } from './Components/form-management/form-management.component';
// import { HiringmanagerFormsComponent } from './Components/hiringmanager-forms/hiringmanager-forms.component';
import { HomepageComponent } from './Components/homepage/homepage.component';
// import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyformsComponent } from './Components/myforms/myforms.component';

import { UserSectionComponent } from './Components/user-section/user-section.component';
import { FormpageComponent } from './formpage/formpage.component';
import { UserAuthGuard } from './user-auth.guard';
import { ShowresponsesComponent } from './Components/showresponses/showresponses.component';
import { CandidateLoginComponent } from './Components/candidate-login/candidate-login.component';
import { CandidateFormComponent } from './Components/candidate-form/candidate-form.component';
// import { ViewformComponent } from './Components/viewform/viewform.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // },
  { path: 'homepage', component: HomepageComponent },
  // { path: 'formpage', component: FormpageComponent },
  { path: 'formpage', component: FormManagementComponent },
  // { path: 'assessmentforms', component: AssessmentFormsComponent },
  // { path: 'hiringmanagerforms', component:HiringmanagerFormsComponent },
  { path: 'myforms', component:MyformsComponent },
  // {path: 'candidate',component:CandidateFormGalleryComponent},
  {path:'addresponse',component:AddresponseComponent},
  {path:'emailsend',component:EmailsendComponent},
  {path:'openform',component:FormpageComponent},
  {path:'recentform',component:MyformsComponent},
  {path:'responsePage',component:ShowresponsesComponent},
  {path:'defaultform',component:DefaultformComponent},

  {path:'editPage',component:EditPageComponent},
  {path:'CandidateLogin',component:CandidateLoginComponent},
  {path:'CandidateForm',component:CandidateFormComponent},




  { path: 'usersection', component: UserSectionComponent },  // canActivate:[AuthGuard]
  // {path:'**',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}