import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// modulos angular
import {ReactiveFormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';


// components
import {DashboardComponent} from '../dashboard/dashboard.component';
import {IngresoEgresoComponent} from './ingreso-egreso.component';
import {EstadisticaComponent} from './estadistica/estadistica.component';
import {DetalleComponent} from './detalle/detalle.component';

// pipes
import {OrdenIngresoPipe} from '../pipes/orden-ingreso.pipe';
import {SharedModule} from '../shared/shared.module';

// Routes
import {DashboardRoutesModule} from '../dashboard/dashboard-routes.module';
import {StoreModule} from '@ngrx/store';
import {ingresoEgresoReducer} from './ingreso-egreso.reducer';



@NgModule({
  declarations: [
    // components
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    // pipes
    OrdenIngresoPipe
  ],
  imports: [
    // modulos angular
    CommonModule,
    StoreModule.forFeature('ingresosEgresos', ingresoEgresoReducer),
    ReactiveFormsModule,
    // modulos
    ChartsModule,
    SharedModule,
    // routes
    DashboardRoutesModule
  ]
})
export class IngresoEgresoModule { }
