import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HttpClient } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { AddEditProductoComponent } from './Components/producto/add-edit-producto/add-edit-producto.component';
import { ShowProductoComponent } from './Components/producto/show-producto/show-producto.component'
import { ProductoApiService } from './Services/producto-api.service';
import { ClienteComponent } from './Components/cliente/cliente.component';
import { ShowClienteComponent } from './Components/cliente/show-cliente/show-cliente.component';
import { AddEditClienteComponent } from './Components/cliente/add-edit-cliente/add-edit-cliente.component';
import { ClienteApiService } from './Services/cliente-api.service';
import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  { path: 'Producto', component: ProductoComponent },
  { path: 'Cliente', component: ClienteComponent },
  { path: '', redirectTo: '/Producto', pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AppComponent,   
    ProductoComponent,
    AddEditProductoComponent,
    ShowProductoComponent,
    ClienteComponent,
    ShowClienteComponent,
    AddEditClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ProductoApiService,ClienteApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
