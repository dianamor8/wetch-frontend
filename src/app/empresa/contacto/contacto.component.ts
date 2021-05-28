import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/utilitarios/messages/services/message.service';
import { Contacto } from '../models/contacto';
import { ContactoService } from '../services/contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {

  contactoForm:FormGroup;
  contacto:Contacto;
  
  nombre:FormControl;
  email:FormControl;
  asunto:FormControl;
  message:FormControl;

  constructor(
    private formBuilder:FormBuilder,
    private messageService:MessageService,
    private contactoService:ContactoService
  ) { }

  ngOnInit(): void {
    this.contacto = new Contacto();
    this.nombre = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.asunto = new FormControl('', [Validators.required, Validators.maxLength(250), Validators.minLength(10)]);
    this.message = new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(10)]);
    this.contactoForm = this.formBuilder.group({
      nombre:this.nombre,
      email:this.email,
      asunto:this.asunto,
      message:this.message,
    });   
  }

  save():void{
    if(this.contactoForm.valid){
      this.contacto = new Contacto();
      this.contacto.email = this.contactoForm.get('email').value;
      this.contacto.asunto = this.contactoForm.get('asunto').value;
      this.contacto.message = this.contactoForm.get('message').value;
      this.contacto.nombre = this.contactoForm.get('nombre').value;
      this.contacto.visto = false;
      this.contactoService.addContacto(this.contacto).subscribe(contacto=>{
        if(contacto){          
          this.messageService.showNotification('Gracias por escribirnos, pronto nos pondremos en contacto contigo', 'Éxito','Ok', 'success', 4000);                                     
          this.contactoForm.reset();
          Object.keys(this.contactoForm.controls).forEach(key => {
            this.contactoForm.controls[key].setErrors(null)
          });          
        }
      });      
    }
  }
}
