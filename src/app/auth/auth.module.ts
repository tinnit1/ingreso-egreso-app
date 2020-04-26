import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// modulos angular
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

// Components
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class AuthModule { }
