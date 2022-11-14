import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/data-structures/interfaces/producto';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { ClienteApiService } from 'src/app/Services/cliente-api.service';
import { ProductoApiService } from 'src/app/Services/producto-api.service';

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

  mobSoloNumero = "^([0-9])*$"

  constructor(private _fb: FormBuilder,private _productoService : ProductoApiService,
              private _clienteService : ClienteApiService) { this.createForm(); }

  async ngOnInit(): Promise<void> {
    await this.getParametersInfo();
  }

  createForm() {
    this.formClient = this._fb.group({      
      idProducto: ['', Validators.required],
      idCliente: ['', Validators.required],  
      valorUnitario: [''],
      cantidad: ['', [this.noWhitespaceValidator,Validators.required,Validators.pattern(this.mobSoloNumero)]],
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
      this.llenarControles();      
  }

  llenarControles(){
    this.formClient.patchValue({valorUnitario:this.productoModel?.valorUnitario ?? null});
  }

}
