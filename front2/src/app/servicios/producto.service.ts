import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../clases/producto';
const url = 'http://localhost//proyecto-final-componentes/back/producto/';
@Injectable({
	providedIn: 'root'
})
export class ProductoService {
	constructor(private http: HttpClient) {}

	insertar(producto: Producto): Observable<any> {
		return this.http.post(url, producto);
	}

	listarProductos(): Observable<any> {
		return this.http.get(url);
	}
}
