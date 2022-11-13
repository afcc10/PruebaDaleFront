import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/data-structures/interfaces/cliente';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { ClienteApiService } from 'src/app/Services/cliente-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-cliente',
  templateUrl: './show-cliente.component.html',
  styleUrls: ['./show-cliente.component.css']
})
export class ShowClienteComponent implements OnInit {

  CLIENTES?: Partial<BasicResponse<Cliente[]>>;
  modalTitle: string = '';
  activateAddEditClienteComponent: boolean = false;
  cliente:any;
  clienteModel? : Partial<BasicResponse<boolean>>;

  constructor(private _clienteService: ClienteApiService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  async getClientes(){
    this['CLIENTES'] = await this._clienteService.getClientes();
  }

  modalAdd(){
    this.cliente = {
      id:         0,
      cedula:   '',
      nombre:   '',
      apellido: '',
      telefono: ''     
    }
    this.modalTitle = 'Add cliente';
    this.activateAddEditClienteComponent = true;
  }

  async modalClose(){
    this.activateAddEditClienteComponent = false;
    this.getClientes();
  }

  modalEdit(item:any){
    this.cliente = item;
    this.modalTitle = 'Edit clientes';
    this.activateAddEditClienteComponent = true;
  }

  async delete(item:any){
    if(confirm(`Esta seguro de eliminar el cliente ${item.id}`)){
      this.clienteModel = await this._clienteService.deleteById(item.id);
      if(this.clienteModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('delete-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

      this.getClientes();

    }
    else{
      Swal.fire({
        title: 'Clientes',
        text: this.clienteModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
    }
  }

}
