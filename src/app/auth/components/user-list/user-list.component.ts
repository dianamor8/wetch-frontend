import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { getAllUsersSystem } from '../../actions';
import { User, UserSystem } from '../../models/user';
import { UserActiveComponent } from '../user-active/user-active.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users:UserSystem[];
  userSelected:UserSystem;
  dataSource: MatTableDataSource<UserSystem>;

  displayedColumns: string[] = ['id', 'name', 'email', 'admin', 'planificador','cliente' , 'active' , 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    public dialog: MatDialog,
    private store:Store<AppState>    
  ) { 
    this.store.select('authApp').subscribe(authStore=>{ 
      this.users = authStore.usersSystem
      this.dataSource = new MatTableDataSource(authStore.usersSystem);    
    });  
  }

  ngOnInit(): void {
    this.store.dispatch(getAllUsersSystem());
  }

  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelectEdit(userSystem:UserSystem): void {
    this.userSelected = userSystem;    
  }

  deleteElement(userSystem: UserSystem){
    this.userSelected = userSystem;    
    const dialogRef = this.dialog.open(UserDeleteComponent, {      
      data: {userSystem:this.userSelected},
      panelClass: 'widthDialog'
    });       
  }

  activeElement(userSystem: UserSystem){
    this.userSelected = userSystem;    
    const dialogRef = this.dialog.open(UserActiveComponent, {      
      data: {userSystem:this.userSelected},
      panelClass: 'widthDialog'
    });       
  }

  changeToText(value:boolean):string{
    return value ? 'Si':'No';
  }
}
