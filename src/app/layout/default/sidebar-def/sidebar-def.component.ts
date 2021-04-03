import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-def',
  templateUrl: './sidebar-def.component.html',
  styleUrls: ['./sidebar-def.component.scss']
})
export class SidebarDefComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onSidenavClose = () =>{
    this.sidenavClose.emit();
  }

}
