import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/data-structures/interfaces/cliente';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { ClienteApiService } from 'src/app/Services/cliente-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-cliente',
  templateUrl: './add-edit-cliente.component.html',
  styleUrls: ['./add-edit-cliente.component.css']
})
export class AddEditClienteComponent implements OnInit {

  constructor(private _clienteService: ClienteApiService,private fb: FormBuilder) { }

  public formClient!: FormGroup;
  clienteModel? : Partial<BasicResponse<Cliente>>;

  mobSoloLetras = "[a-zA-Z ]{2,254}";  
  mobSoloNumero = "^([0-9])*$"

  @Input() cliente:any;
  id: number = 0;
  cedula: string = "";
  nombre: string = "";  
  apellido: string = ""; 
  telefono: string = "";

  ngOnInit(): void {
    this.id = this.cliente.id;
    this.cedula = this.cliente.cedula;
    this.nombre = this.cliente.nombre;
    this.apellido = this.cliente.apellido;    
    this.telefono = this.cliente.telefono;
    this.createForm(); 
    if(this.cliente.id !=0){
      this.LlenarFormulario();
    }
  }

  createForm() {    
    this.formClient = this.fb.group({
      cedula: ['', [this.noWhitespaceValidator,Validators.required]],                   
      nombre: ['', [this.noWhitespaceValidator,Validators.required]],                   
      apellido: ['', [this.noWhitespaceValidator,Validators.required]],                   
      telefono: ['', [this.noWhitespaceValidator,Validators.required]],                   
    });
  }

  LlenarFormulario()
  {
    this.formClient.setValue({nombre:this.cliente.nombre,cedula: this.cliente.cedula,
                              apellido:this.cliente.apellido,telefono:this.cliente.telefono});
  }

  public noWhitespaceValidator(control: FormControl) {     
    if(control.value && control.value.length > 0){
      const isWhitespace = (control.value || '').trimStart().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }      
    return false;       
  }

  public llenarCliente(){
    const clienteAdd: Cliente = {
      id: 0,
      cedula: this.formClient.get('cedula')?.value,
      nombre: this.formClient.get('nombre')?.value,
      apellido: this.formClient.get('apellido')?.value,    
      telefono: this.formClient.get('telefono')?.value,    
    }
    return clienteAdd;
  }

  async addCliente(){
    const clienteSave = this.llenarCliente();    
    this.clienteModel = await this._clienteService.registerClientes(clienteSave);
    if(this.clienteModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

    }
    else{
      Swal.fire({
        title: 'Cliente',
        text: this.clienteModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
  }

  async UpdateCliente(){
    const clienteSave = this.llenarCliente();    
    clienteSave.id = this.id;
    this.clienteModel = await this._clienteService.updateClientes(clienteSave);
    if(this.clienteModel.objectResponse !== null){      
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('update-success-alert');
      if(showAddSuccess){
        showAddSuccess.style.display = "block";
      }

      setTimeout(function(){
        if(showAddSuccess){
          showAddSuccess.style.display = "none";
        }
      },4000)

    }
    else{
      Swal.fire({
        title: 'Cliente',
        text: this.clienteModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
  }
}
