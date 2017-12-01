import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MyCollectionService {

  constructor(private http: HttpClient) { }
 getCollections(callback_fun, username: string){
   console.log('getting collections');
      this.http.post('/api/getCollections', { 'username' : username }).subscribe(data=>{
        console.log(data);
        callback_fun(data);
     }); 
 }
}
