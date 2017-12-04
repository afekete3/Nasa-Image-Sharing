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
// gets called when user clicks the save changes button
  updateCollection(description: string){
     this._editCollectionService.setCollectionData(this.onGetCollectionResponse.bind(this),description, this.privacyCollection)
  }
  // sets all the images of the atrray
  setImages(images){
   this.imageCollection = new Array();
      for(var i =0; i < images.length; i++){
          console.log('setting images')
            console.log(images[i])
            this.imageCollection.push(images[i]);
      }
    //this.displayImages();
  }
 // gets called when the user deletes a photo. takes in the link of the photo
  deleteImage(link){
    console.log(link);
    this._editCollectionService.setImageCollectionData(this.onGetCollectionResponse.bind(this), link)
  }
  // call back function getting all the info for the collection 
  onGetCollectionResponse(res: string){
    if (res[0]['Collection'] != null){
      console.log('has phtots in collection');
      this.setImages(res[0]['Collection']);
    }
    this.privacyCollection = res[0]['ispublic'];
   console.log(this.privacyCollection)
    this.descriptionCollection = res[0]['desc'];
  }
  // gets called when the privacy radio button change values
  newPrivacy(){
     this.privacyCollection = ! this.privacyCollection ;
  }
}
