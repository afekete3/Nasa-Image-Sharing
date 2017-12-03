import { Component, OnInit } from '@angular/core';
import {CreateAccountService} from '../../services/create-account.service'
import * as $ from 'jquery';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

   response = '';
  
  constructor(private _createAccountService: CreateAccountService, private router: Router ) { }

  ngOnInit() {
  }
  
  onClick(user, pass) {
    this.response = "";
    // Call the service method, passing the onResponse as the callback
    // binding 'this' is required to avoid "this is undefined error"
    console.log('inon click function');
    if (user == ''){
      this.response = "please enter username";
    }else if (pass== ""){
      this.response = 'please enter password';
    }else{
    this._createAccountService.getData(this.onResponse.bind(this),  user , pass);
    }
  }
  
  /*
   * The HTTP request is aynchronous.
   * Therefore a callback function is required to get back the response.
   */
  onResponse(res: string) {
    if (res == "Account created"){
      this.router.navigate(['verify']);
    }
    this.response = res;
     $('#password').val(''); 
      $('#username').val(''); 
    }
  }

