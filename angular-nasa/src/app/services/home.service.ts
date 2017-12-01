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
addtoCollection(username, img, collectionName){
     this.http.post('/api/addtocollection', { 'user' : username, 'img' : img, 'name' : collectionName}).subscribe(data=>{
        console.log(data); 
     })
 }
 getCollections(callback_fun, username: string){
      this.http.post('/api/getCollections', { 'username' : username }).subscribe(data=>{
        callback_fun(data);
     }); 
 }
}
