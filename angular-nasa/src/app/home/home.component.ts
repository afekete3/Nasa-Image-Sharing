import { Component, OnInit, ViewEncapsulation,ElementRef, ViewChild  } from '@angular/core';
import { HomeService } from '../services/home.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage= 0;
  numPages = 0;
  pages = [[],[],[],[], [], []];
  response = '';
  photosCollection = [];
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
 updatedPhotos(x){
      this.rankedCollections.nativeElement.innerHTML = "";
      for (var i = x; i<20+x && i < this.photosCollection.length ; i++){
        $('#pictures').append("<li style='float:left;padding: 0.5cm 0.25cm 0.5cm 0.25cm;' >"
        + "<img id="+i+" style='height:400px; width: 400px' src ='" 
        + this.photosCollection[i] + "'></li>");
        $("#"+i).click({img:$("#"+i).attr('src')}, this.imgClick); 

      }
    }
 
  searchImages(keyWord: string){
    this._homeService.getSearchData(this.onSearchResponse.bind(this), keyWord);
  }
  onSearchResponse(res: string){
    this.photosCollection = new Array();
           for(var i =0; i < res.length; i++){
          if (res[i]['links'] != null){
            if (res[i]['links'][0]['render'] == "image"){
              this.photosCollection.push(res[i]['links'][0]['href']);
            }
          }
      
      }
      this.numPages= Math.floor(((this.photosCollection.length)/20));
        if(this.photosCollection.length%20 !=0){
          this.numPages++;
        }
      console.log(this.numPages);
      console.log(this.photosCollection.length)
      this.updatedPhotos(0);
      
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
  pageUpClick(){
      if (this.currentPage!= (this.numPages-1)){
        this.currentPage++;
        var startIndex= this.currentPage* 20;
        this.updatedPhotos(startIndex);
        console.log(startIndex);
      }
    }
      pageDownClick(event){
      if (this.currentPage!= 0){
        this.currentPage--;
        var startIndex= this.currentPage* 20;
        this.updatedPhotos(startIndex);
        console.log(startIndex);
      }
    }

}
