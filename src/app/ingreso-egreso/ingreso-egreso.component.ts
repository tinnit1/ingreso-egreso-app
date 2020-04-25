import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {IngresoEgresoService} from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {Subscription} from 'rxjs';
import * as ui from '../shared/ui.actions';
import {stopLoading} from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  type = 'ingreso';
  loading = false;
  loadingSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.loadingSubscription = this.store.select('ui')
      .subscribe(({isLoading}) => this.loading = isLoading);
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  save() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    const {description, amount} = this.ingresoForm.value;
    console.log(this.ingresoForm.value);
    const ingresoEgreso = new IngresoEgreso(description, amount, this.type);
    this.ingresoEgresoService.createIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(stopLoading());
        Swal.fire('Registro creado', description, 'success');
      })
      .catch(err => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
