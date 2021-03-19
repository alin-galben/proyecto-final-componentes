import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Producto } from 'src/app/clases/producto';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
	selector: 'app-insertar-producto',
	templateUrl: './insertar-producto.component.html',
	styleUrls: [ './insertar-producto.component.css' ]
})
export class InsertarProductoComponent implements OnInit {
	productos: any;
	formProducto = this.fb.group({
		tipo: new FormControl('', [ Validators.required ]),
		nombre: new FormControl('', [ Validators.required ]),
		precio: new FormControl('', [ Validators.required ]),
		descripcion: new FormControl('', [ Validators.required ])
	});

	constructor(private servicioProducto: ProductoService, private fb: FormBuilder, private irHacia: Router) {}

	ngOnInit(): void {
		this.obtenerProductos();
	}

	obtenerProductos(): void {
		this.servicioProducto.listarProductos().subscribe(
			(respuesta) => {
				console.log(respuesta);
				this.productos = respuesta;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	submit(): void {
		this.servicioProducto.insertar(this.formProducto.value).subscribe(
			(respuesta) => {
				console.log(respuesta);
				this.irHacia.navigate([ '/insertar-productos' ]);
			},
			(error) => console.log(error)
		);
	}
}
