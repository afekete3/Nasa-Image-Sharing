import { Component, OnInit } from '@angular/core';
import { CreateCollectionService } from '../services/create-collection.service'
import {  Router } from '@angular/router';
@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  response= "";
  privacyCollection: boolean;
  constructor(private _createCollectionService: CreateCollectionService, private router: Router) {
    // default privacy is private
    this.privacyCollection = false;
    
  }

  ngOnInit() {
  }
  createCollection(name: string, description: string ){
    if(name != ""){
     console.log('in on click function for login');
      this._createCollectionService.getData(this.onCreateCollectionResponse.bind(this),  name , description, this.privacyCollection);
    }else{
      this.response = "Can't have an empty name"
    }
  }
  /*
   * The HTTP request is aynchronous.
   * Therefore a callback function is required to get back the response.
   */
  onCreateCollectionResponse(res: string) {
    // is the collection waas successful 
    if(res['message'] == 'collection created!'){
    
      this.router.navigate(['mycollections']);
    }
    this.response = res['message'];
  }
  newPrivacy(){
    // toggle privacy value
     this.privacyCollection = ! this.privacyCollection ;
  }
}
