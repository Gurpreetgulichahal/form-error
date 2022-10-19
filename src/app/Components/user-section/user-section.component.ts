import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../library.service';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';
// import { navbarData } from './nav-data';
import { FormNavbar } from './navbar';
import { SharedService } from 'src/app/shared/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';





interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

export class Friend {
  constructor(
    public userId: number,
    public emailId: string,
    public password: string,
    public role: string,
    public mfapin: string,
    public token: string,
    public userBlocked: boolean
  ) {
  }
}

declare var validate: any;
declare var closingNav: any;
declare var passwordVisible: any;
declare var ChangeBlockBackground: any;
// declare var block:any
@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms',
          style({ opacity: 1 })
        )
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms',
          style({ opacity: 0 })
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]

})
export class UserSectionComponent implements OnInit {

  emailId: any;
  p: number = 1;

  friends: Friend[] = [];
  editForm!: FormGroup;

  showMeErrors: boolean = false;
  loginResponse:any;
baseUrl!:any;

  deleteId!: string;
  constructor(private httpClient: HttpClient, private router: Router, private formbuilder: FormBuilder, private library: LibraryService, private shared: SharedService, private fb: FormBuilder, private modalService: NgbModal,private formNavbar:FormNavbar) { }
  value = '';
  value1 = '';
  value2 = '';

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navbarDataAdmin = this.formNavbar.navbarDataAdmin;
  navDataUser = this.formNavbar.navbarDataUser;

  userSection: boolean = true
  createUser: boolean = false
  editUser: boolean = false
  usersList: boolean = true
  hometemplate: boolean = false
  CreateUser!: FormGroup;



  userBar() {
    this.userSection = true
  }
  toggleTag() {
    this.createUser = true
    this.usersList = false;
    this.editUser = false;
    // this.editUser =! this.editUser
  }

  toggleTag2() {
    this.editUser = true
    this.createUser = false;
    this.usersList = false;
  }

  toggleTag3() {
    this.usersList = true;
    this.createUser = false;
    this.editUser = false;
  }


  ngOnInit(): void {
    this.baseUrl=this.library.getbaseUrl();
    this.getFriends();
    console.log("finding id of user");
    console.log(this.friends)
    
    this.editForm = this.fb.group({
      id:[''],
      emailId: [''],
      // password: [''],
      role: ['']
    });
    this.screenWidth = window.innerWidth;
    this.loginResponse = this.shared.getResponse();
    console.log("MyLoginResponse",this.loginResponse.role);
    

    this.CreateUser = this.fb.group({

      emailId: ['', Validators.required],

      password: ['', Validators.required],

      role: ['', Validators.required]

    });
  }
  user = {

    emailId: "",
    password: "",
    role: ""

  }


  // data ={

  //   emailId: "",
  //   password: "",


  // }

  showPassword() {
    passwordVisible();
  }

  edit = {
    emailId: "",
    password: ""
  }

  goToNewform(pageName: string): void {
    this.router.navigate([`${pageName}`])
  }
  goToCreateUserForm(pageName: string): void {
    this.router.navigate([`${pageName}`])
  }


  // list of users
  getFriends() {
    this.httpClient.get<any>(this.baseUrl+'/users').subscribe(
      response => {
        // console.log(response);
        this.friends = response;
        // location.reload();
        console.log("display friends");
        console.log(this.friends);
      }
    );
  }// list of users End



  // Update User details
  openEdit(targetModal: any, friend: Friend) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.editForm.patchValue({
      id: friend.userId, 
      emailId: friend.emailId,
      // password: friend.password,
      role: friend.role,

    });
  }

  onUpdate() {
    const editURL = this.baseUrl+'/update'+'/'+this.editForm.value.id;
    console.log(this.editForm.value);
    this.httpClient.put(editURL, this.editForm.value, { responseType: 'text' as 'json' })
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        let ref = document.getElementById('close1234');
        ref?.click();
      });
  }// Update User details End

  refresh(): void {
    window.location.reload();
  }

  // change password
  editPassword() {

    this.library.changePassword(this.edit).subscribe(

      response => {
        console.log(this.edit);
        console.log(response);
        alert("Password Changed Successfully");


      },
      error => {
        console.log(this.edit);
        console.log("error");
        console.log(error);
      }
    )
  }// change password End

  //  create User
  // newUser() {

  //   this.library.newUser(this.user).subscribe(

  //     response => {
  //       console.log(this.user);
  //       console.log(response);
  //       // alert("Password Changed Successfully");


  //     },
  //     error => {
  //       console.log(this.user);
  //       console.log("error");
  //       console.log(error);
  //     }
  //   )
  // }//  create User End


  createNewUser() {

    this.library.sendUserData(this.CreateUser.value).subscribe(

      res => {

        console.log(res);

        alert("User created Successfully!!");

        this.CreateUser.reset();

      },

      error => {

        console.log(error);

        alert(error.error.message);

      }

    );
  }

  
  // delete User code

  openDelete(targetModal: any, friend: Friend) {
    console.log("delte button")
    this.deleteId = friend.emailId;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onDelete() {
    const deleteURL = this.baseUrl+'/delete/' + this.deleteId;
    this.httpClient.delete(deleteURL, { responseType: 'text' as 'json' })
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        let ref = document.getElementById('close123');
        ref?.click();
      });
  }// delete User code end


  // block User code

  openBlock(targetModal: any, friend: Friend) {
    console.log("block button")
    this.deleteId = friend.emailId;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }

  onBlock() {
    const deleteURL = this.baseUrl+'/user/block/' + this.deleteId;
    console.log(deleteURL);
    this.httpClient.put(deleteURL, "")
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        let ref = document.getElementById('close2');
        ref?.click();
      });
  }//  block User code end

  // unblock user code
  openActivate(targetModal: any, friend: Friend) {
    console.log("Activate Button")
    this.deleteId = friend.emailId;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
  onActivate() {
    const activateURL = this.baseUrl+'/user/activate/' + this.deleteId;
    console.log(activateURL);
    this.httpClient.put(activateURL, "")
      .subscribe((results) => {
        this.ngOnInit();
        this.modalService.dismissAll();
        let ref = document.getElementById('close3');
        ref?.click();
      });
  }
  //unblock user code end



  //search users
  search() {
    if (this.emailId == "") {
      this.ngOnInit();
    } else {
      this.friends = this.friends.filter(res => {
        return res.emailId.toLocaleLowerCase().match(this.emailId.toLocaleLowerCase());
      });
    }
  }

  // password error methods
  passwordErrors() {
    this.showMeErrors = true;
  }

  passwordStrength() {
    validate();
  }
  // password error methods ends


  CallChangeBlockBackground() {
    ChangeBlockBackground();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // console.log(this.screenWidth)
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  toggleCollapse(): void {
    // console.log(this.screenWidth)
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    // console.log(this.screenWidth)
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-right-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-right-md-screen'
    }
    return styleClass;
  }




}