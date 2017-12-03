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
 deleteCollection(callback_fun, id){
         this.http.delete("/api/deletecollection/" + id ).subscribe(data=>{
        console.log(data);
        callback_fun(data);
     }); 
 }
 updateCollectionName(callback_fun, newName, id){
      this.http.put('/api/collectionname', { 'name' : newName, 'id': id, 'username': localStorage.getItem('user')}).subscribe(data=>{
        console.log(data);
        callback_fun(data);
     }); 
 }
}
