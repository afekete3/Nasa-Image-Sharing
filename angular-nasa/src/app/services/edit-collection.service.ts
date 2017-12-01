import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class EditCollectionService {
  body = {username: '', collectionName: '',description: "", privacy: false, deleteImage: ""};
  constructor(private http: HttpClient) {
  }
  getCollectionData(callback_fun){
      console.log('in get collection data');
      
       this.body['username'] = localStorage.getItem('user');
       this.body['collectionName'] = localStorage.getItem('editCollection');
        this.http.post('/api/collectiondata',this.body ).subscribe(data => {
        
          callback_fun(data);
      });
  } 
  setCollectionData(callback_fun, description: string, privacy: boolean){
       this.body['description'] = description;
       this.body['privacy'] = privacy;
        this.http.put('/api/collectionupdate',this.body ).subscribe(data => {
        
          callback_fun(data);
      });
  }
   setImageCollectionData(callback_fun, link: string){
       console.log('link');
       this.body['deleteImage'] = link;
        this.http.put('/api/collectiondata',this.body ).subscribe(data => {
        
          callback_fun(data);
      });
  }
}