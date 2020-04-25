import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe(uiStore => this.loading = uiStore.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // })
    this.authService.login(this.loginForm.value)
      .then(credenciales => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }

}
