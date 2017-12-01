import { Component, OnInit, ViewEncapsulation,ElementRef, ViewChild } from '@angular/core';
import { EditCollectionService } from '../services/edit-collection.service'
@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  action='deleteImage';
  nameCollection= "";
  descriptionCollection = "";
  imageCollection = new Array();
  privacyCollection: boolean;
  //@ViewChild('collectionImages') collectionImages: ElementRef;
  constructor(private _editCollectionService: EditCollectionService) {
    this.nameCollection = localStorage.getItem('editCollection');
    this._editCollectionService.getCollectionData(this.onGetCollectionResponse.bind(this))
  }
   ngOnInit() {
  }
  updateCollection(description: string){
     this._editCollectionService.setCollectionData(this.onGetCollectionResponse.bind(this),description, this.privacyCollection)
  }
  setImages(images){
   this.imageCollection = new Array();
      for(var i =0; i < images.length; i++){
          console.log('setting images')
            console.log(images[i])
            this.imageCollection.push(images[i]);
      }
    //this.displayImages();
  }
  displayImages(){
  
 //   this.collectionImages.nativeElement.innerHTML = "";
  //  console.log(this.imageCollection.length)
    for (var i = 0; i < this.imageCollection.length ; i++){
    /*    console.log('displaying images')
        console.log(this.imageCollection[i]);
       this.collectionImages.nativeElement.innerHTML +=
       "<li style='float:left;padding: 0.5cm 0.25cm 0.5cm 0.25cm;'>"
       + "<div class='container'>"
       + "<img #'" + this.imageCollection[i] + "'style='height:400px; width: 400px' src ='" + this.imageCollection[i] 
      + "'>  <div class='bottom-left'> <button (click)='this[action]()'> Delete Image </button> </div> </li>"; 
      };*/
    }
  }
  deleteImage(link){
    console.log(link);
    this._editCollectionService.setImageCollectionData(this.onGetCollectionResponse.bind(this), link)
  }
  onGetCollectionResponse(res: string){
    
    if (res[0]['Collection'] != null){
      console.log('has phtots in collection');
      this.setImages(res[0]['Collection']);
    }
    this.privacyCollection = res[0]['ispublic'];
   console.log(this.privacyCollection)
    this.descriptionCollection = res[0]['desc'];
  }
  newPrivacy(value){
     this.privacyCollection = ! this.privacyCollection ;
  }
}
