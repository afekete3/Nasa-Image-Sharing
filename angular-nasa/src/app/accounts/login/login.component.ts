import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../login.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {

   response = '';
  
  constructor(private _loginService: LoginService) { }

  ngOnInit() {
  }
 onClick(user, pass) {
    // Call the service method, passing the onResponse as the callback
    // binding 'this' is required to avoid "this is undefined error"
    console.log('in on click function for login');
    this._loginService.getData(this.onResponse.bind(this),  user , pass);
  }
  /*
   * The HTTP request is aynchronous.
   * Therefore a callback function is required to get back the response.
   */
  onResponse(res: string) {
    this.response = res;
  }
}
