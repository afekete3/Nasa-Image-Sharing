import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service'
import * as $ from 'jquery';
@Component({
  selector: 'app-unauth-dashboard',
  templateUrl: './unauth-dashboard.component.html',
  styleUrls: ['./unauth-dashboard.component.css']
})
export class UnauthDashboardComponent implements OnInit {

   collectionList = new Array();
  sortedCollection = new Array();
  imgCollection = []; 
  constructor(private _dashboardService: DashboardService) {
    this._dashboardService.getCollections(this.onGetAllCollectionsResponse.bind(this));
    
  }
  
  // make it so the user collections dont show up
  onGetAllCollectionsResponse(res: string){
    this.collectionList = new Array();
    var size=0;
    for(var i = 0; i < res.length; i ++){
         if(res[i]['ispublic'] == true){
          if (res[i]['Collection'].length != 0){
            console.log(res[i]['name'])
            this.collectionList.push(res[i]);
              size++;
              if(size==10){
                break;
              }
          }
        }
      
    }
      this.sortedCollection= new Array();
      console.log(this.collectionList);
      this.sortedCollection= this.bubbleSort(this.collectionList);
    
  }
  bubbleSort(arr){
    var len = arr.length;
     for (var i = len-1; i>=0; i--){
       for(var j = 1; j<=i; j++){
         if(arr[j-1]['rank'].length<arr[j]['rank'].length){
             var temp = arr[j-1];
             arr[j-1] = arr[j];
             arr[j] = temp;
          }
       }
     }
     return arr;
  }
 
  
  ngOnInit() {
  }
 openPhotos(photos){
    console.log(photos);
    this.imgCollection = photos; 
    $('#selectedImg').attr('src', photos[0]); 
    $('#selectedImg').attr('value', 0); 
    $('#myModal').css('display', 'block'); 
  }
  
  close(){
    $('#myModal').css('display', 'none');
    this.imgCollection = []; 
  }
  next(){
    console.log(this.imgCollection); 
    var index = (parseInt($('#selectedImg').attr('value')) + 1)% this.imgCollection.length; 
    $('#selectedImg').attr('src', this.imgCollection[index]); 
    $('#selectedImg').attr('value', index); 
  
  }
}
