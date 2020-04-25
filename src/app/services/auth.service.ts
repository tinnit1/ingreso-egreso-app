import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import {Subscription} from 'rxjs';
import {unSetItems} from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription;
  private _user: User;

  get user() {
    return this._user;
  }

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private store: Store
  ) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.collection(firebaseUser.uid).doc('usuario').valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = User.fromFirebase(firestoreUser);
            this._user = user;
            this.store.dispatch(authActions.setUser({user}));
          });
      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(unSetItems());
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  createUser({name, email, password}) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
      const newUser = new User(user.uid, name, user.email);
      return this.firestore.doc(`${user.uid}/usuario`)
        .set({...newUser});
    });
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    );
  }
}
