import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contacto } from '../../models/contacto';

@Component({
  selector: 'app-contacto-detail',
  templateUrl: './contacto-detail.component.html',
  styleUrls: ['./contacto-detail.component.scss']
})
export class ContactoDetailComponent implements OnInit {

  @Input() contacto:Contacto;
  contactoForm:FormGroup; 
  
  nombre:FormControl;
  email:FormControl;
  asunto:FormControl;
  message:FormControl;

  constructor(
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.nombre = new FormControl({value:this.contacto.nombre , disabled:'true'}, [Validators.required, Validators.maxLength(250), Validators.minLength(10)]);
    this.email = new FormControl({value:this.contacto.email , disabled:'true'}, [Validators.required, Validators.email]);
    this.asunto = new FormControl({value: this.contacto.asunto, disabled:'true'}, [Validators.required, Validators.maxLength(250), Validators.minLength(10)]);
    this.message = new FormControl({value: this.contacto.message, disabled:'true'}, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]);
    this.contactoForm = this.formBuilder.group({
      nombre:this.nombre,
      email:this.email,
      asunto:this.asunto,
      message:this.message,
    }); 
  }
  
}
