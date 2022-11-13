import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/data-structures/interfaces/producto';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { ProductoApiService } from 'src/app/Services/producto-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-producto',
  templateUrl: './add-edit-producto.component.html',
  styleUrls: ['./add-edit-producto.component.css']
})
export class AddEditProductoComponent implements OnInit {

  constructor(private _productoService: ProductoApiService,private fb: FormBuilder) { }

  public formClient!: FormGroup;
  productoModel? : Partial<BasicResponse<Producto>>;

  mobSoloLetras = "[a-zA-Z ]{2,254}";  
  mobSoloNumero = "^([0-9])*$"

  @Input() producto:any;
  id: number = 0;
  nombre: string = "";  
  valorUnitario: number = 0;  

  ngOnInit(): void {
    this.id = this.producto.id;
    this.nombre = this.producto.nombre;
    this.valorUnitario = this.producto.valorUnitario;    
    this.createForm(); 
    if(this.producto.id !=0){
      this.LlenarFormulario();
    }
  }

  createForm() {    
    this.formClient = this.fb.group({
      nombre: ['', [this.noWhitespaceValidator,Validators.required]],                   
      valorUnitario: ['', [this.noWhitespaceValidator,Validators.required,Validators.pattern(this.mobSoloNumero)]],            
    });
  }

  LlenarFormulario()
  {
    this.formClient.setValue({nombre:this.producto.nombre,valorUnitario: this.producto.valorUnitario});
  }

  public noWhitespaceValidator(control: FormControl) {     
    if(control.value && control.value.length > 0){
      const isWhitespace = (control.value || '').trimStart().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }      
    return false;       
  }

  public llenarProducto(){
    const productoAdd: Producto = {
      id: 0,
      nombre: this.formClient.get('nombre')?.value,
      valorUnitario: this.formClient.get('valorUnitario')?.value,      
    }
    return productoAdd;
  }

  async addProducto(){
    const productoSave = this.llenarProducto();    
    this.productoModel = await this._productoService.registerProductos(productoSave);
    if(this.productoModel.objectResponse !== null){      
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
        title: 'Producto',
        text: this.productoModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
  }

  async UpdateProducto(){
    const productoSave = this.llenarProducto();    
    productoSave.id = this.id;
    this.productoModel = await this._productoService.updateProductos(productoSave);
    if(this.productoModel.objectResponse !== null){      
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
        title: 'Producto',
        text: this.productoModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
  }

}
