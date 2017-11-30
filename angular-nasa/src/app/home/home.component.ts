import { Component, OnInit, ViewEncapsulation,ElementRef, ViewChild  } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  response = '';
  photoCollection: string[] = new Array();
  @ViewChild('rankedCollections') rankedCollections: ElementRef;
   
  constructor(private _homeService: HomeService) {
  
    // Call the service method, passing the onResponse as the callback
    // binding 'this' is required to avoid "this is undefined error"
    console.log('in constructor for home');
    
  }

  ngOnInit() {
  }
   ShowImageCollection(){
    console.log('showing images');
  }
  SetCollectionList(){
     this.rankedCollections.nativeElement.innerHTML = "";
    for (var i = 0; i < this.photoCollection.length ; i++){
        console.log(this.photoCollection[i]);
       this.rankedCollections.nativeElement.innerHTML += "<li style='float:left;padding: 0.5cm 0.25cm 0.5cm 0.25cm;' >"
       + "<img style='height:400px; width: 400px' src ='" 
       + this.photoCollection[i] + "'></li>" 
        //this.rankedCollections.nativeElement.innerHTML += "<li style='Text-align:center;'>"+ "top ranked collection" +"</li>"  + "<button (click)='ShowImageCollection()'>"+ "see colleciton" + "</button>";
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
}
