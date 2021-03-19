import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
	formLogin = this.fb.group({
		password: [ '', [ Validators.required ] ],
		email: [ '', [ Validators.required, Validators.email ] ]
	});
	mensaje: string = '';
	constructor(private fb: FormBuilder, private servicioUsuario: UserService, private irHacia: Router) {}

	ngOnInit(): void {
		if (this.servicioUsuario.isLogged()) {
			this.irHacia.navigate([ '/insertar-productos' ]);
		}
	}
	submit(): void {
		this.servicioUsuario.acceso(this.formLogin.value).subscribe(
			(respuesta) => {
				console.log(respuesta);
				this.servicioUsuario.guardarToken(respuesta);
				this.irHacia.navigate([ '/insertar-productos' ]);
			},
			(error) => {
				console.log(error);
				this.mensaje = error.error;
			}
		);
	}
}
