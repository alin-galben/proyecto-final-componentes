import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';
import { InsertarProductoComponent } from './componentes/insertar-producto/insertar-producto.component';
import { VerProductoComponent } from './componentes/ver-producto/ver-producto.component';
import { ListarProductosComponent } from './componentes/listar-productos/listar-productos.component';
import { ListarProductosCategoriaComponent } from './componentes/listar-productos-categoria/listar-productos-categoria.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'registro', component: RegistroComponent },
	{ path: 'insertar-productos', component: InsertarProductoComponent },
	{ path: ':nombre', component: VerProductoComponent },
	{ path: 'productos', component: ListarProductosComponent },
	{ path: 'productos/:tipo', component: ListarProductosCategoriaComponent },
	{ path: '**', component: HomeComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
