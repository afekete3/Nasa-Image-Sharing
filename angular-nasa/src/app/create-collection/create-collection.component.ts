import { Component, OnInit } from '@angular/core';
import { CreateCollectionService } from '../services/create-collection.service'
@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  response= "";
  constructor(private _createCollectionService: CreateCollectionService) { }

  ngOnInit() {
  }
  createCollection(name: string, description: string ){
   console.log('in on click function for login');
    this._createCollectionService.getData(this.onCreateCollectionResponse.bind(this),  name , description);
  }
  /*
   * The HTTP request is aynchronous.
   * Therefore a callback function is required to get back the response.
   */
  onCreateCollectionResponse(res: string) {
  
    this.response = res['message'];
  }
}
