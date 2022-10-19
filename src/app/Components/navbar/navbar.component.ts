import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

// import 'jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle';
declare const userDetails: any;
import 'bootstrap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private route: ActivatedRoute,private shared:SharedService) { }
  name: any;
  // role: any;

  loginResponse:any;

  ngOnInit(): void {

    this.loginResponse = this.shared.getResponse()
    this.name = this.loginResponse.emailId;
  //   this.route.queryParams.subscribe((params: any) => {
  //     console.log(params)
  //     this.name = params.data;
  //     this.role = params.role;
  //     console.log(this.name);
  //     console.log(this.role);
  //   })
   }

}
