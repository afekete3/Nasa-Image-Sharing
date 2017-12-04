import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service'
import * as $ from 'jquery';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
 collectionList = new Array();
  imgCollection = []; 
  constructor(private _dashboardService: DashboardService) {
    this._dashboardService.getCollections(this.onGetAllCollectionsResponse.bind(this));
    
  }
  // make it so the user collections dont show up
  onGetAllCollectionsResponse(res: string){
    this.collectionList = new Array();
    // for loop pushes the collections to the array
    for(var i = 0; i < res.length; i ++){
         if(res[i]['ispublic'] == true){
            console.log(res[i]['name'])
            this.collectionList.push(res[i]);
          
        }
    }
  
  }
  deleteCollection(collection){
     if (confirm('Are you sure you want to delete this collection')) {
     this._dashboardService.deleteCollection(this.onGetAllCollectionsResponse.bind(this), collection._id);
     }
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
