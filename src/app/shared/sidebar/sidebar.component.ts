import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  name = '';
  userSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('user')
      .pipe(
        filter(({user}) => user !== null)
      )
      .subscribe(({user}) =>  this.name = user.name);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logout() {
    Swal.fire({
      title: 'Cerrando sesion',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService.logout()
      .then(() => {
        Swal.close();
        this.router.navigate(['/login']);
      })
      .catch(err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      }));
  }
}
