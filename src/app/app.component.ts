import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  route: string;

  constructor(
    private location: Location,
    private router: Router,
    private fbSV: FirebaseService
  ) {
    router.events.subscribe((val) => {
      this.route = location.path();
      if (location.path().includes('/login')) {
        this.route = '/login';
      }
    });
  }
  isCollapsed = false;
}
