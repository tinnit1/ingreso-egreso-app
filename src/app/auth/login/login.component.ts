import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    })
    console.log(this.loginForm.invalid);
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value)
      .then( credenciales => {
        Swal.close();
        console.log(credenciales);
        this.router.navigate(['/']);
      })
      .catch(err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      }));
  }

}
