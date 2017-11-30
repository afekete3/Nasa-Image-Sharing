import { Component, OnInit } from '@angular/core';
import { EditCollectionService } from '../services/edit-collection.service'
@Component({
  selector: 'app-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {
  nameCollection= "";
  descriptionCollection = "";
  privacyCollection: boolean;
  constructor(private _editCollectionService: EditCollectionService) {
    this.nameCollection = localStorage.getItem('editCollection');
    this._editCollectionService.getCollectionData(this.onGetCollectionResponse.bind(this))
  }

  ngOnInit() {
  }
  updateCollection(description: string){
     this._editCollectionService.setCollectionData(this.onGetCollectionResponse.bind(this),description, this.privacyCollection)
  }
  onGetCollectionResponse(res: string){
    this.privacyCollection = res[0]['ispublic'];
    console.log(this.privacyCollection)
    this.descriptionCollection = res[0]['desc'];
  }
  newPrivacy(value){
     this.privacyCollection = ! this.privacyCollection ;
  }
}
