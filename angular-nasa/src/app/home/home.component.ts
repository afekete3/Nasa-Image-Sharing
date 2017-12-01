import { Component, OnInit, ViewEncapsulation,ElementRef, ViewChild  } from '@angular/core';
import { HomeService } from '../services/home.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response = '';
  photoCollection = [];
  collections = []; 
  isCollection = false; 
  res = ''; 

  @ViewChild('rankedCollections') rankedCollections: ElementRef;
   
  constructor(private _homeService: HomeService) {
  
    // Call the service method, passing the onResponse as the callback
    // binding 'this' is required to avoid "this is undefined error"
    console.log('in constructor for home');
    
  }
ngOnInit() {
    this._homeService.getCollections(this.loadCollections.bind(this), localStorage.getItem('user'));
  }
  
  loadCollections(data){ 
    for(var i = 0; i < data.length; i++){
      this.collections.push(data[i]['name']); 
      this.isCollection = true; 
    }
    console.log(this.collections); 
  }
   ShowImageCollection(){
    console.log('showing images');
  }
  SetCollectionList(){
     this.rankedCollections.nativeElement.innerHTML = "";
       for (var i = 0; i < this.photoCollection.length ; i++){
      $('#pictures').append("<li style='float:left;padding: 0.5cm 0.25cm 0.5cm 0.25cm;' >"
      + "<img id="+i+" style='height:400px; width: 400px' src ='" 
      + this.photoCollection[i] + "'></li>");
      $("#"+i).click({img:$("#"+i).attr('src')}, this.imgClick); 
    }
  }
 
 
  searchImages(keyWord: string){
    this._homeService.getSearchData(this.onSearchResponse.bind(this), keyWord);
  }
  onSearchResponse(res: string){
    this.photoCollection = new Array();
      for(var i =0; i < res.length; i++){
        if (res[i]['links'] != null){
          if (res[i]['links'][0]['render'] == "image"){
            console.log(res[i]['links'][0]['href'])
            this.photoCollection.push(res[i]['links'][0]['href']);
          }
        }
    }
    
     
       this.SetCollectionList();
  }
  imgClick(event){
    if(($('#wrap').children().length) > 0){
      $('#selectedImg').attr('src', event.data.img); 
      $('#myModal').css('display', 'block'); 
    }
  }
  close(){
    $('#myModal').css('display', 'none');
  }
  
  addPic(){
    console.log($('#wrap input[name=collection]:checked').val());
    $('#myModal').css('display', 'none');
    this._homeService.addtoCollection(localStorage.getItem('user'),  $('#selectedImg').attr('src'), $('#wrap input[name=collection]:checked').val()); 
  }

}
