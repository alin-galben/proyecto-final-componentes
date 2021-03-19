import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';
import { InsertarProductoComponent } from './componentes/insertar-producto/insertar-producto.component';
import { VerProductoComponent } from './componentes/ver-producto/ver-producto.component';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { ListarProductosCategoriaComponent } from './componentes/listar-productos-categoria/listar-productos-categoria.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { HomeComponent } from './componentes/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegistroComponent,
		InsertarProductoComponent,
		VerProductoComponent,
		ListarProductosComponent,
		ListarProductosCategoriaComponent,
		NavegacionComponent,
		HomeComponent
	],
	imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
