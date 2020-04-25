import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth: AngularFireAuth,
    public firestore: AngularFirestore
  ) {
  }

  initAuthListener() {
    this.auth.authState.subscribe(firebaseUser => console.log(firebaseUser));
  }

  login({email, password}) {
    console.log(email);
    console.log(password);
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  createUser({name, email, password}) {
    return this.auth.createUserWithEmailAndPassword(email, password).then( ({ user }) => {
      const newUser = new User( user.uid, name, user.email);
      return this.firestore.doc(`usuario/${user.uid}`)
        .set({...newUser});
    });
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( firebaseUser => firebaseUser != null)
    );
  }
}
