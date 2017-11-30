import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LoginService {

  body = {username: '', password: ''};
  constructor(private http: HttpClient) { }
  
  /*
  * This function receives a callback funtion to send back the aynchronous response from the server. also pass in password and username
  */
  getData(callback_fun,user, pass) {
    this.body['username'] = user;
    this.body['password'] = pass;
    console.log(this.body['username'])
      this.http.post('/api/login',this.body ).subscribe(data => {
          console.log(data);
          callback_fun(data);
      });
  }

}
