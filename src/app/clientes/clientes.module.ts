import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaClienteComponent } from './components/alta-cliente/alta-cliente.component';
import { ListadoClienteComponent } from './components/listado-cliente/listado-cliente.component';



@NgModule({
  declarations: [AltaClienteComponent, ListadoClienteComponent],
  imports: [
    CommonModule
  ]
})
export class ClientesModule { }
