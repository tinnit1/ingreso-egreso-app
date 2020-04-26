import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IngresoEgreso} from '../../models/ingreso-egreso.model';
import {MultiDataSet, Label} from 'ng2-charts';
import {AppStateWithIngreso} from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

  ingresos = 0;
  egresos = 0;
  totalEgresos = 0;
  totalIngresos = 0;

  public doughnutChartLabels: Label[] = ['Egresos', 'Ingresos'];
  public doughnutChartData: MultiDataSet = [
    []
  ];

  constructor(private store: Store<AppStateWithIngreso>) {
  }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(({items}) => {
        this.generateStadistics(items);
      });
  }

  generateStadistics(items: IngresoEgreso[]) {
    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;
    for (const item of items) {
      if (item.type === 'ingreso') {
        this.totalIngresos += item.amount;
        this.ingresos++;
      } else {
        this.totalEgresos += item.amount;
        this.egresos++;
      }
    }

    this.doughnutChartData = [[this.totalEgresos, this.totalIngresos]];
  }

}
