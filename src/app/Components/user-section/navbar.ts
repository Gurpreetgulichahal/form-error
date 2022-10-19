import { Injectable,EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'any',
})
export class FormNavbar {
  isCandidateFormsState:boolean=true;
  isAssessmentFormsState = false;
  isHiringManagerFormsState = false;

  // isCandidateFormsState= new BehaviorSubject(true);
  // isAssessmentFormsState =  new BehaviorSubject(false);
  // isHiringManagerFormsState =new BehaviorSubject(false);
  isMyFormsState = false;
  isRecentFormsState: boolean = false;

  constructor(private router: Router){}

  navbarDataAdmin = [
    {
      func: () => this.setCandidateFormsState(),
      routeLink: '/homepage',
      srce: 'assets/icons/Candidate_forms_icon.svg',
      label: 'Candidate Forms',
      
    },

    {func: () => this.setAssessmentFormsState(),
      routeLink: '/homepage',
      srce: 'assets/icons/Assessment_forms_icon.svg',
      label: 'Assesment Forms',
      
    },
    { func: () => this.setHiringManagerFormsState(),
      routeLink: '/homepage',
      srce: 'assets/icons/Hiring_manager_forms.svg',
      label: 'Hiring Manager Forms',
     
    },

    {
      routeLink: '/myforms',
      srce: 'assets/icons/My_Forms_icon.svg',
      label: 'My Forms',
    },

    {
      routeLink: '/recentform',
      srce: 'assets/icons/Recent_forms_icon.svg',
      label: 'Recent Forms',
    },
    {
      routeLink: '/usersection',
      srce: 'assets/icons/User_Managment_icon.svg',
      label: 'User management',
    },
    {
      routeLink: '/formpage',
      srce: 'assets/icons/Form_Managment_icon.svg',
      label: 'Forms Management',
    },
  ];

  navbarDataUser = [
    {func: () => this.setCandidateFormsState(),
      routeLink: '/homepage',
      srce: 'assets/icons/Candidate_forms_icon.svg',
      label: 'Candidate Forms',
      
    },

    {func: () => this.setAssessmentFormsState(),
      routeLink: '/homepage',
      srce: 'assets/icons/Assessment_forms_icon.svg',
      label: 'Assesment Forms',
      
    },
    { func: () => this.setHiringManagerFormsState(),
      routeLink: '/homepage',
      srce: 'assets/icons/Hiring_manager_forms.svg',
      label: 'Hiring Manager Forms',
     
    },

    {
      routeLink: '/myforms',
      srce: 'assets/icons/My_Forms_icon.svg',
      label: 'My Forms',
    },

    {
      routeLink: '/recentform',
      srce: 'assets/icons/Recent_forms_icon.svg',
      label: 'Recent Forms',
    },
  ];

  setCandidateFormsState() {
    
    this.isCandidateFormsState=true;
    this.isAssessmentFormsState=false;
    this.isHiringManagerFormsState=false;
    this.router.navigate(['/homepage']);
    console.log('inside setCandidateTemplatesState');
  }
  setAssessmentFormsState() {
    this.isCandidateFormsState=false;
    this.isAssessmentFormsState=true;
    this.isHiringManagerFormsState=false;
    // this.isAssessmentFormsState.next(true);
    // this.isHiringManagerFormsState.next(false);
    // this.isCandidateFormsState.next(false);
    this.router.navigate(['/homepage']);
    console.log('inside setAssessmentTemplatesState');
  }
  setHiringManagerFormsState() {
    this.isCandidateFormsState=false;
    this.isAssessmentFormsState=false;
    this.isHiringManagerFormsState=true;
    // this.isHiringManagerFormsState.next(true);
    // this.isAssessmentFormsState.next(false);
    // this.isCandidateFormsState.next(false);
    this.router.navigate(['/homepage']);
    console.log('inside setHiringManagerTemplatesState');
  }
  // resetFormsState() {
  //   this.isHiringManagerFormsState.next(false);
  //   this.isAssessmentFormsState.next(false);
  //   this.isCandidateFormsState.next(false);
  // }
  getFormsStates() {
    return of([this.isCandidateFormsState,this.isAssessmentFormsState,this.isHiringManagerFormsState]);
  }

  
 
}
