export interface User {
	id?: number;
	nombre?: string;
	apellidos?: string;
	password?: string;
}

export interface accesoUsuario {
	email: string;
	password: string;
}
