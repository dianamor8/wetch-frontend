import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as M from './../../../../node_modules/materialize-css';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor() { }
  
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     var elemsParalax = document.querySelectorAll('.parallax');
  //     var instances = M.Parallax.init(elemsParalax, {responsiveThreshold:0});
  //   },1000);
  // }

  ngOnInit(): void {
  }

}
