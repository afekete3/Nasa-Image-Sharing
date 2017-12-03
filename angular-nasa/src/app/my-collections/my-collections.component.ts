import { Component, OnInit } from '@angular/core';
import { MyCollectionService } from '../services/my-collection.service'
import {  Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {
  collection = new Array();
  response ="";
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
      console.log(res[i]);
      if(res[i]['username'] == localStorage.getItem('user')){
      this.collection.push(res[i]);
      }
    }
  }
  displayCollection(name){
    localStorage.setItem('editCollection', name);
     this.router.navigate(['editcollection']);
  }
  deleteCollection(id){
     this._myCollectionService.deleteCollection(this.onGetCollectionResponse.bind(this), id);
  }
  changeNameCollection(account){
    this.response = "";
     $('#collectionName').attr('value', account.name); 
     $('#collectionName').attr('name', account._id); 
      $('#myModal').css('display', 'block'); 
  }
  close(){
    $('#myModal').css('display', 'none');
  }
  save(){
    console.log( $('#collectionName').attr('name'))
    console.log( $('#collectionName').val())
      this._myCollectionService.updateCollectionName(this.onSaveResponse.bind(this), $('#collectionName').val(), $('#collectionName').attr('name')); 
  }
  onSaveResponse(res: string){
    if (res != null && res['message'] == null){
     this.setCollections(res);
     this.response = "Name updated!";
   }else{
     console.log('all good')
     this.response = res['message'];
   }
  }
  
  
}
