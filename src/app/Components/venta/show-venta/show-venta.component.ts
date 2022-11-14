import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/data-structures/interfaces/producto';
import { Venta } from 'src/app/data-structures/interfaces/venta';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { ClienteApiService } from 'src/app/Services/cliente-api.service';
import { ProductoApiService } from 'src/app/Services/producto-api.service';
import { VentaApiService } from 'src/app/Services/venta-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-venta',
  templateUrl: './show-venta.component.html',
  styleUrls: ['./show-venta.component.css']
})
export class ShowVentaComponent implements OnInit {

  public formClient!: FormGroup;
  public listCliente: any = new Array();
  public listProducto: any = new Array();
  productoModel? : Producto;
  ventaModel? : Partial<BasicResponse<Venta>>;

  mobSoloNumero = "^([0-9])*$"

  constructor(private _fb: FormBuilder,private _productoService : ProductoApiService,
              private _clienteService : ClienteApiService, private _ventaService : VentaApiService) 
              { this.createForm(); }

  async ngOnInit(): Promise<void> {
    await this.getParametersInfo();
  }

  createForm() {
    this.formClient = this._fb.group({      
      idProducto: ['', Validators.required],
      idCliente: ['', Validators.required],  
      valorUnitario: [''],
      cantidad: ['', [this.noWhitespaceValidator,Validators.required,Validators.pattern(this.mobSoloNumero)]],
      valorTotal: [''],
    });
  }

  public noWhitespaceValidator(control: FormControl) {     
    if(control.value && control.value.length > 0){
      const isWhitespace = (control.value || '').trimStart().length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }      
    return false;       
  }

  async getParametersInfo() {

    let cli = await this._clienteService.getClientes();
    this.listCliente = cli.objectResponse;   

    let prod = await this._productoService.getProductos();
    this.listProducto = prod.objectResponse;    
  }

  public async getProducto(productoId: string) {   
      let prod = await this._productoService.getbyIdProducto(Number(productoId));
      this.productoModel = prod.objectResponse;      
      this.formClient.patchValue({valorUnitario:this.productoModel?.valorUnitario ?? null});
  } 

  public async getTotal() {   
       let total = this.formClient.get('valorUnitario')?.value * this.formClient.get('cantidad')?.value;
       this.formClient.patchValue({valorTotal:total ?? null});
  }

  public llenarVenta(){
    const VentaAdd: Venta = {
      id: 0,
      cantidad: this.formClient.get('cantidad')?.value,
      valorTotal: this.formClient.get('valorTotal')?.value, 
      id_cliente: this.formClient.get('idCliente').value,
      id_producto: this.formClient.get('idProducto').value,     
    }
    return VentaAdd;
  }

  async addVenta(){
    const ventaSave = this.llenarVenta();    
    this.ventaModel = await this._ventaService.registerVenta(ventaSave);
    if(this.ventaModel.objectResponse !== null){
      Swal.fire({
        title: 'Venta',
        text: 'Registro agregado exitosamente',
        icon: 'success',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      }) 
      this.limpiarFormulario();
    }
    else{
      Swal.fire({
        title: 'Venta',
        text: 'Error al guardar',
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      }) 
    }
  }

  limpiarFormulario(){
    this.formClient.reset('cantidad');
    this.formClient.reset('valorTotal'); 
    this.formClient.reset('idCliente');
    this.formClient.reset('idProducto');
  }

}
