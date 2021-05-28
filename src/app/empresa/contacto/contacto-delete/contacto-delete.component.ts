import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contacto-delete',
  templateUrl: './contacto-delete.component.html',
  styleUrls: ['./contacto-delete.component.scss']
})
export class ContactoDeleteComponent implements OnInit {

  contacto:Contacto;

  constructor(
    private contactoService:ContactoService,
    private messageService:MessageService,
    public dialogRef: MatDialogRef<ContactoDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {contacto: Contacto}
  ) {
    this.contacto = data.contacto;
   }

  ngOnInit(): void {
  }

  delete():void{
    if(this.contacto){
      this.contactoService.deleteContacto(this.contacto).subscribe(message=>{
        this.messageService.showNotification('Eliminado con éxito', 'Éxito','Ok', 'success', 4000);                                     
        this.dialogRef.close();
      });      
    }
  }

}
