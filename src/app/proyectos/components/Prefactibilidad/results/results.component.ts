import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { Prefactibilidad, Proyecto } from 'src/app/proyectos/models/proyecto';
import { getProyectoById } from 'src/app/proyectos/selectors';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  prefactibilidad:Prefactibilidad;
  proyecto:Proyecto;
  user: User;

  idProyecto:number;
  idPrefactibilidad:number;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.store.select('authApp').subscribe((authStore) => {
      if (authStore.userAuth) {
        this.user = Object.assign(new User(), authStore.userAuth);
      } else {
        this.user = authStore.userAuth;
      }
    });

    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((route) => {
      this.idProyecto = +route.get('idProyecto');
      this.idPrefactibilidad = +route.get('id');      
    });
    this.store.select(getProyectoById(this.idProyecto)).subscribe((proy: Proyecto) => {
      this.proyecto = proy;
      let arrPref = this.proyecto.prefactibilidads.filter((prefact:Prefactibilidad) => prefact.id === this.idPrefactibilidad);
      if(arrPref.length>0){
        this.prefactibilidad = {...arrPref[0]};
      }
    });
  }

}
