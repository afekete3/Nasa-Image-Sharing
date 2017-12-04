import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class DashboardService {

  constructor(private http: HttpClient) { }
  
    getCollections(callback_fun){
         this.http.get('/api/collections' ).subscribe(data => {
         console.log(data);
          callback_fun(data);
      });
    }
    setLike(callback_fun, username, name){
        var usernameAccount = localStorage.getItem('user');
          this.http.put('/api/addLike', { 'usernameCollection' : username,  'name' : name, 'usernameAccount' : usernameAccount}).subscribe(data=>{
        console.log(data);
        callback_fun(data);
     })
    }
  deleteCollection(callback_fun, id){
         this.http.delete("/api/deletecollection/" + id ).subscribe(data=>{
        console.log(data);
        callback_fun(data);
     }); 
 }
}
