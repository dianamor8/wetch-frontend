import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Contacto } from '../../models/contacto';
import { ContactoService } from '../../services/contacto.service';
import { ContactoDeleteComponent } from '../contacto-delete/contacto-delete.component';

@Component({
  selector: 'app-contacto-list',
  templateUrl: './contacto-list.component.html',
  styleUrls: ['./contacto-list.component.scss']
})
export class ContactoListComponent implements OnInit {

  contactos:Contacto[]=[];
  contactoSelected:Contacto;
  displayedColumnsTable: string[] = ['id', 'fecha', 'email', 'asunto', 'actions'];

  constructor(
    private contactoService: ContactoService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.contactoService.getAllContactos().subscribe(contactos=>{
      if(contactos){
        this.contactos = contactos;
      }else{
        console.log(contactos);
      }      
    });    
    this.contactoSelected = new Contacto();
    this.contactoSelected.asunto ='';
    this.contactoSelected.email = '';
    this.contactoSelected.message ='';
    this.contactoSelected.nombre = '';
  }

  onSelectEdit(contacto:Contacto):void{
    this.contactoSelected =contacto;
    if(!this.contactoSelected.visto){
      this.contactoSelected.visto = true;
      this.contactoService.updateContacto(this.contactoSelected).subscribe(contact=>{
        this.contactos = this.contactos.map(c=>{          
          if(c.id === contact.id){
            let c_ = {...c};
            c_.visto = contact.visto;
            return c_;
          }else{
            return c;
          }
        });
      });
    }
    
  }

  deleteElement(contacto:Contacto):void{
    this.contactoSelected = contacto;
    const dialogRef = this.dialog.open(ContactoDeleteComponent, {      
      data: {contacto:this.contactoSelected},
      panelClass: 'widthDialog'
    });  
    dialogRef.afterClosed().subscribe(result => {
      this.contactoService.getAllContactos().subscribe(contactos=>{
        this.contactos = contactos;
        this.contactoSelected = new Contacto();
        
      });
    });
  }

}
