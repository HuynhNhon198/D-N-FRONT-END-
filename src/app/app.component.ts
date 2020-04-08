import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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

  ngOnInit() {
    this.loadScript('https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image');
  }

  public loadScript(url: string) {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
