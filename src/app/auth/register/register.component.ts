import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.registroForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    })
    this.authService.createUser(this.registroForm.value)
      .then(credenciales =>
        {
          console.log(credenciales);
          Swal.close();
          this.router.navigate(['/']);
        }
      )
      .catch(err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      }));
  }
}
