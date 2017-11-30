import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class HomeService {
    apiRoot= 'https://images-api.nasa.gov/search?q=';
   constructor(private http: HttpClient) { }
  
  /*
  * This function receives a callback funtion to send back the aynchronous response from the server. also pass in password and username
  */
   
  getSearchData(callback_fun, keyWord: string) {
     if(keyWord != ""){
      this.http.get(this.apiRoot + encodeURI(keyWord)).subscribe(data => {
          console.log('getting collection');
          callback_fun(data['collection']['items']);
      });
     }
  }

}
