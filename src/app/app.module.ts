// import * as $ from 'jquery'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './Components/navbar/navbar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxCaptchaModule } from '@binssoft/ngx-captcha';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';

// import { ViewformComponent } from './viewform/viewform.component';
// import { ViewformComponent } from './Components/viewform/viewform.component';
import { UserSectionComponent } from './Components/user-section/user-section.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgPreventCutCopyPasteModule } from 'ng-prevent-cut-copy-paste';
import { HomepageComponent } from './Components/homepage/homepage.component';
import { FormpageComponent } from './formpage/formpage.component';
import { FormManagementComponent } from './Components/form-management/form-management.component';
// import { AssessmentFormsComponent } from './Components/assessment-forms/assessment-forms.component';
// import { HiringmanagerFormsComponent } from './Components/hiringmanager-forms/hiringmanager-forms.component';
import { MyformsComponent } from './Components/myforms/myforms.component'
import {MatTabsModule} from '@angular/material/tabs';

import {MatTableModule} from '@angular/material/table';
// import { CandidateFormGalleryComponent } from './candidate-form-gallery/candidate-form-gallery.component';
import { EmailsendComponent } from './Components/emailsend/emailsend.component';

import { EditPageComponent } from './Components/edit-page/edit-page.component';

import { AddresponseComponent } from './Components/addresponse/addresponse.component';
import { DefaultformComponent } from './Components/defaultform/defaultform.component';
import { ShowresponsesComponent } from './Components/showresponses/showresponses.component';
import { CandidateLoginComponent } from './Components/candidate-login/candidate-login.component';
import { CandidateFormComponent } from './Components/candidate-form/candidate-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HomeComponent,
   
    NavbarComponent,
   
    //  ViewformComponent,
    UserSectionComponent,
    HomepageComponent,
    FormpageComponent,
    FormManagementComponent,
    // AssessmentFormsComponent,
    // HiringmanagerFormsComponent,
    MyformsComponent,
    // CandidateFormGalleryComponent,
    EmailsendComponent,

    EditPageComponent,

    AddresponseComponent,
    DefaultformComponent,
    ShowresponsesComponent,
    CandidateLoginComponent,
    CandidateFormComponent,
   
    

   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    NgxCaptchaModule,
    NgbModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    NgPreventCutCopyPasteModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
