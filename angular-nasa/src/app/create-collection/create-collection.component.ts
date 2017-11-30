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
  constructor(private _createCollectionService: CreateCollectionService, private router: Router) { }

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
    if(res['message'] == 'collection created!'){
      localStorage.setItem('editCollection', res['username'])
      this.router.navigate(['editcollection']);
    }
    this.response = res['message'];
  }
}
