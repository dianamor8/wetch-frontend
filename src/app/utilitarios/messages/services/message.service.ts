import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MessagesComponent } from '../components/messages.component';

export interface Message{
  message: string;
  title: string;
  buttonText:string;
  messageType: 'error' | 'success' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {  

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  messages:Message[]=[];
  
  timeOut = 1000;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addMessage(message:Message){
    this.messages.push(message);
  }

  removeMessage(message:string){
    this.messages=this.messages.filter((e)=>e.message!=message);
  }
  
  showNotification(message:string, title:string, buttonText:string, messageType:'error'|'success'|'warning', duration:number) {
    
    this.addMessage({message, title, buttonText, messageType});
    this.messages.forEach((element, index) => {
      setTimeout(() => {        
        let snackBarRef = this._snackBar.openFromComponent(MessagesComponent, {
          data:{
            message:element.message,
            title:element.title,
            buttonText:element.buttonText,
            type: element.messageType
          },
          duration: duration,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: element.messageType
        })
        snackBarRef.afterDismissed().subscribe(() => {          
          this.removeMessage(element.message);          
        });
      }, index * (this.timeOut+4000));        
    });
    
  }

}
