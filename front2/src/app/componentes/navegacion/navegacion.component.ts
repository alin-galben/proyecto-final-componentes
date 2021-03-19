import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
	selector: 'app-navegacion',
	templateUrl: './navegacion.component.html',
	styleUrls: [ './navegacion.component.css' ]
})
export class NavegacionComponent implements OnInit {
	enlaceSeleccionado: string = 'active';
	fnLogged = this.servicioUsuario.isLogged;

	constructor(private servicioUsuario: UserService, private irHacia: Router) {}
	ngOnInit(): void {}
	doLogout(): void {
		this.servicioUsuario.logOut();
		this.irHacia.navigate([ '' ]);
	}
}
