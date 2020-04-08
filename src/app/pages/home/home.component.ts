import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'link'],

      [{ header: 1 }, { header: 2 }],               // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }, 'formula'],      // superscript/subscript
      [{ align: [] }, { indent: '-1' }, { indent: '+1' }],          // outdent/indent

      [{ header: [1, 2, 3, 4, 5, 6, false] }],       // custom dropdown

      [{ color: [] }, { background: [] }],          // dropdown with defaults from theme
      [{ font: [] }],
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  test() {
    document.getElementById('test').innerHTML = this.data || '';
  }
}
