import { Component, OnInit } from '@angular/core';
import { MyCollectionService } from '../services/my-collection.service'
import {  Router } from '@angular/router';
@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {
  collection = new Array();
  
  constructor(private _myCollectionService: MyCollectionService, private router: Router) { 
    console.log('in my collection');
    this._myCollectionService.getCollections(this.onGetCollectionResponse.bind(this), localStorage.getItem('user'));
  }

  ngOnInit() {
  }
  onGetCollectionResponse(res: string){
   if (res != null){
     this.setCollections(res);
   }
  }
  setCollections(res){
    this.collection = new Array();
    for(var i = 0; i < res.length; i++){
      console.log(res[i]['name']);
      this.collection.push(res[i]['name']);
    }
  }
  displayCollection(name){
    localStorage.setItem('editCollection', name);
     this.router.navigate(['editcollection']);
    
  }
  
}
