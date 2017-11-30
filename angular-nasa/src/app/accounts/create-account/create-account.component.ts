import { Component, OnInit } from '@angular/core';
import {CreateAccountService} from '../../services/create-account.service'

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

   response = '';
  
  constructor(private _createAccountService: CreateAccountService ) { }

  ngOnInit() {
  }
  
  onClick(user, pass) {
    // Call the service method, passing the onResponse as the callback
    // binding 'this' is required to avoid "this is undefined error"
    console.log('inon click function');
    this._createAccountService.getData(this.onResponse.bind(this),  user , pass);
  }
  
  /*
   * The HTTP request is aynchronous.
   * Therefore a callback function is required to get back the response.
   */
  onResponse(res: string) {
    this.response = res;
  }
}
