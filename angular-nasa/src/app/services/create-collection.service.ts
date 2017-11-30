import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class CreateCollectionService {
 body = {name: '', description: '',username: ''};
  constructor(private http: HttpClient) { }
  
  /*
  * This function receives a callback funtion to send back the aynchronous response from the server. also pass in password and username
  */
  getData(callback_fun,name,description) {
    this.body['name'] = name;
    this.body['description'] = description;
    this.body['username'] = localStorage.getItem('user');
    console.log(this.body['username'])
      this.http.post('/api/createcollection',this.body ).subscribe(data => {
          console.log(data);
          callback_fun(data);
      });
  }
}