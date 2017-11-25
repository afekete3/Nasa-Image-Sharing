import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CreateAccountService {

  
  constructor(private http: HttpClient) { }
  
  /*
  * This function receives a callback funtion to send back the aynchronous response from the server. also pass in password and username
  */
  getData(callback_fun,user, pass) {
    console.log(user, pass)
      this.http.post('/api/create', user, pass).subscribe(data => {
          console.log(data);
          callback_fun(data['message']);
      });
  }

}
