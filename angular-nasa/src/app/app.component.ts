import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = localStorage.getItem('user') != null ;
  admin =  localStorage.getItem('user') == "admin";
  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('editCollection');
  }
}
