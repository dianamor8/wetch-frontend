import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/auth/models/user';
import { Prefactibilidad, Proyecto } from 'src/app/proyectos/models/proyecto';
import { getProyectoById } from 'src/app/proyectos/selectors';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  prefactibilidad:Prefactibilidad;
  proyecto:Proyecto;
  user: User;
  
  chartOptions:{};
  Highcharts = Highcharts;

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

    this.chartOptions = {      
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares in January, 2018'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 61.41,
                sliced: true,
                selected: true
            }, {
                name: 'Internet Explorer',
                y: 11.84
            }, {
                name: 'Firefox',
                y: 10.85
            }, {
                name: 'Edge',
                y: 4.67
            }, {
                name: 'Safari',
                y: 4.18
            }, {
                name: 'Sogou Explorer',
                y: 1.64
            }, {
                name: 'Opera',
                y: 1.6
            }, {
                name: 'QQ',
                y: 1.2
            }, {
                name: 'Other',
                y: 2.61
            }]
        }]
    }  
  }

}
