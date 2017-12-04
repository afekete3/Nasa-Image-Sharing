import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service'
import * as $ from 'jquery';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  collectionList = new Array();
  imgCollection = []; 
  isLiked= new Array();
  constructor(private _dashboardService: DashboardService) {
    this._dashboardService.getCollections(this.onGetAllCollectionsResponse.bind(this));
    
  }
  // make it so the user collections dont show up
  onGetAllCollectionsResponse(res: string){
    this.collectionList = new Array();
    // for loop pushes the collections to the array
    for(var i = 0; i < res.length; i ++){
      if(res[i]['username'] != localStorage.getItem('user')){
         if(res[i]['ispublic'] == true){
          if (res[i]['Collection'].length != 0){
            console.log(res[i]['name'])
            this.collectionList.push(res[i]);
          }
        }
      }
    }
    this.isLiked = new Array();
    // makes an array of boolean and check is the collection is already liked by user
    for(var  i = 0; i < this.collectionList.length; i++){
      console.log(i);
      if(this.collectionList[i]['rank'].indexOf(localStorage.getItem('user')) > -1){
        this.isLiked.push(true);
      }else{
        this.isLiked.push(false);
      }
      
    }
    console.log(this.isLiked);
  }
//gets called when the check box for like is changed
  checkLike(username,name, i){
    console.log(username, name, i);
    this._dashboardService.setLike(this.onGetAllCollectionsResponse.bind(this), username, name);
  }
  ngOnInit() {
  }
  // sets up modal
  openPhotos(photos){
    console.log(photos);
    this.imgCollection = photos; 
    $('#selectedImg').attr('src', photos[0]); 
    $('#selectedImg').attr('value', 0); 
    $('#myModal').css('display', 'block'); 
  }
  // when exit button is click for modal
  close(){
    $('#myModal').css('display', 'none');
    this.imgCollection = []; 
  }
  // diplays nexty photo in collection when clicked
  next(){
    console.log(this.imgCollection); 
    var index = (parseInt($('#selectedImg').attr('value')) + 1)% this.imgCollection.length; 
    $('#selectedImg').attr('src', this.imgCollection[index]); 
    $('#selectedImg').attr('value', index); 
  
  }
}
