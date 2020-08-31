import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.scss']
})
export class SplashscreenComponent implements OnInit {

  @Input() fullName:string;
  
  constructor() { }

  ngOnInit() {}

}
