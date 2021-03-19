import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: [ './registro.component.css' ]
})
export class RegistroComponent implements OnInit {
	formRegistro = this.fb.group({
		email: [ '', [ Validators.required, Validators.email ] ],
		password: [ '', [ Validators.required ] ],
		password2: [ '', [ Validators.required ] ]
	});
	mensaje_error: string = '';
	constructor(private fb: FormBuilder, private servicioUsuario: UserService, private irHacia: Router) {}

	ngOnInit(): void {}

	submit(): void {
		if (this.formRegistro.value.password == this.formRegistro.value.password2) {
			this.servicioUsuario.registrar(this.formRegistro.value).subscribe((respuesta) => {
				console.log(respuesta);
				this.servicioUsuario.guardarToken(respuesta);
				this.irHacia.navigate([ '/insertar-productos' ]);
			}, (error) => (this.mensaje_error = error));
		} else this.mensaje_error = 'Las contraseñas no coinciden';
	}
}
