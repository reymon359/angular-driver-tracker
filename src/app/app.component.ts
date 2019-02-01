import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { log } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lat: number;
  lng: number;
  title = 'trackerDesk';
  init = false;

  // taxistas: Observable<any[]>;
  taxistas: Taxista[] = [];
  siguiendoA: string = null;
  siguiendoNombre: string = null;
  constructor(db: AngularFirestore) {
    // this.taxistas = db.collection('usuarios').valueChanges();
    db.collection('usuarios').valueChanges()
      .subscribe((data: Taxista[]) => {
        this.taxistas = data;
        if (!this.init) { // este if solo se ejecuta la primera vez
          this.lat = data[0].lat;
          this.lng = data[0].lng;
          this.init = true;
        }
        if (this.siguiendoA) {
          data.forEach(taxista => {
            if (taxista.clave === this.siguiendoA) {
              this.lat = taxista.lat;
              this.lng = taxista.lng;
            }
          });
        }
      });
  }
  seguir(taxista: Taxista) {
    this.siguiendoA = taxista.clave;
    this.siguiendoNombre = taxista.nombre;

    this.lat = taxista.lat;
    this.lng = taxista.lng;

  }
  dejarDeSeguir() {
    this.siguiendoA = null;
    this.siguiendoNombre = null;
  }
}

interface Taxista {
  nombre: string;
  clave: string;
  lat: number;
  lng: number;
}