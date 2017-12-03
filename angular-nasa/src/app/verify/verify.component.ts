import { Component, OnInit } from '@angular/core';
import { CreateAccountService } from '../services/create-account.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

   //initialize response with empty string
  response = ''; 

  constructor(private _createAccountService: CreateAccountService, private router:Router) { }

  ngOnInit() {
  }
  
  verify(secretToken){
    this._createAccountService.verifyEmail(this.onResponse.bind(this), secretToken);
  }
  
  onResponse(res: string){
    this.response = res; 
    if(res == "verification success"){
      this.router.navigate(['/login']); 
    }
  }

}
  

