import { Component, Inject, OnInit } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
  
})
export class MessagesComponent implements OnInit {

  constructor(
    
     @Inject(MAT_SNACK_BAR_DATA)public data: any,
     public snackBarRef:MatSnackBarRef<MessagesComponent>,
    
  ) {}

  ngOnInit(): void {    
  }

  
}
