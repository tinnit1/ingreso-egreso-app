import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {IngresoEgreso} from '../models/ingreso-egreso.model';
import {AuthService} from './auth.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) {
  }

  createIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.authService.user.uid;
    return this.firestore.collection(uid).doc('ingresos-egresos')
      .collection('items')
      .add({...ingresoEgreso});
  }

  initIngresosEgresosListener(uid: string) {
    return this.firestore.collection(uid).doc('ingresos-egresos')
      .collection('items')
      .snapshotChanges()
      .pipe(
        map((snaphot) => snaphot.map((doc) => {
            const {description, amount, type} = doc.payload.doc.data();
            const tempIE = new IngresoEgreso(description, amount, type);
            tempIE.uid = doc.payload.doc.id;
            return tempIE;
          }
        )));
  }

  borrarIngresoEgreso( uidItem: string ) {
    console.log(uidItem);
    const uid = this.authService.user.uid;
    return this.firestore.collection(uid).doc('ingresos-egresos')
      .collection('items')
      .doc(uidItem)
      .delete();
  }
}
