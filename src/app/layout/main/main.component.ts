import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
import * as M from './../../../../node_modules/materialize-css';
'./assets'

const CAROUSEL_DATA_ITEMS:ICarouselItem[] =[
  { id: 1,
    title: {
        first:'WILSON TAPIA  ',
        second:'   | Arquitecto',
    },
    subtitle:'Gerente',
    link:'/',
    image:'assets/images/proyecto1.png'    
  },
  { id: 2,
    title: {
        first:'CREANDO ',
        second:'SOLUCIONES',
    },
    subtitle:'Para una vida mejor',
    link:'/',
    image:'assets/images/proyecto3.png'    
  },
  { id: 3,
    title: {
        first:'ASESORAMIENTO',
        second:' INMEDIATO',
    },
    subtitle:'Nuestro equipo técnico te atenderá',
    link:'/',
    image:'assets/images/proyecto4.png'    
  },
  { id: 4,
    title: {
        first:'TECNOLOGÍAS ',
        second:'DE LA CONSTRUCCIÓN',
    },
    subtitle:'Tu proyecto con la tecnología constructiva más conveniente',
    link:'/',
    image:'assets/images/proyecto5.png'    
  }


];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit{

  // options = { fullWidth: true, indicators: true, duration:200};
  // items = [ "/assets/images/proyecto2.png", "/assets/images/proyecto1.png", "/assets/images/proyecto3.png", "/assets/images/proyecto2.png"];
  // hrefs = ['one', 'two', 'three', 'four'];
  
  public carouselDATA:ICarouselItem[]=CAROUSEL_DATA_ITEMS;

  constructor() { }
  
  ngAfterViewInit(): void {  
    // setTimeout(() => {
    //   let elems = document.querySelectorAll('.carousel'); 
    //   this.instances = M.Carousel.init(elems, this.options);

    //   var elemsParalax = document.querySelectorAll('.parallax');
    //   var instances = M.Parallax.init(elemsParalax, {responsiveThreshold:0});
    // },1000);          
  }

  ngOnInit(): void {    
  }

  }
