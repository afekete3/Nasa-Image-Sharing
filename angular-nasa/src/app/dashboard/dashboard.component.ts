import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  collectionList = new Array();
  isLiked: boolean = new Array();
  constructor(private _dashboardService: DashboardService) {
    this._dashboardService.getCollections(this.onGetAllCollectionsResponse.bind(this));
    
  }
  // make it so the user collections dont show up
  onGetAllCollectionsResponse(res: string){
    this.collectionList = new Array();
    for(var i = 0; i < res.length; i ++){
      if(res[i]['ispublic'] == true){
        if (res[i]['Collection'].length != 0){
          console.log(res[i]['name'])
          this.collectionList.push(res[i]);
        }
      }
    }
    this.isLiked = new Array();
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
  openPhotos(){
    console.log('opening images');
  }
  checkLike(username,name, i){
    console.log(username, name, i);
  
    this._dashboardService.setLike(this.onGetAllCollectionsResponse.bind(this), username, name);
  
  }
  ngOnInit() {
  }

}
