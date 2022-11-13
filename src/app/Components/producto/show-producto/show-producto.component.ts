import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/data-structures/interfaces/producto';
import { BasicResponse } from 'src/app/data-structures/shared/basic-response';
import { ProductoApiService } from 'src/app/Services/producto-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-producto',
  templateUrl: './show-producto.component.html',
  styleUrls: ['./show-producto.component.css']
})
export class ShowProductoComponent implements OnInit {

  PRODUCTOS?: Partial<BasicResponse<Producto[]>>;
  modalTitle: string = '';
  activateAddEditProductoComponent: boolean = false;
  producto:any;
  productoModel? : Partial<BasicResponse<boolean>>;

  constructor(private _productoService: ProductoApiService) { }

  ngOnInit(): void {
    this.getProductos();
  }

  async getProductos(){
    this['PRODUCTOS'] = await this._productoService.getProductos();
  }

  modalAdd(){
    this.producto = {
      id:         0,
      nombre:   '',
      valorUnitario: 0     
    }
    this.modalTitle = 'Add producto';
    this.activateAddEditProductoComponent = true;
  }

  async modalClose(){
    this.activateAddEditProductoComponent = false;
    this.getProductos();
  }

  modalEdit(item:any){
    this.producto = item;
    this.modalTitle = 'Edit productos';
    this.activateAddEditProductoComponent = true;
  }

  async delete(item:any){
    if(confirm(`Esta seguro de eliminar el producto ${item.id}`)){
      this.productoModel = await this._productoService.deleteById(item.id);
      if(this.productoModel.objectResponse !== null){      
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

      this.getProductos();

    }
    else{
      Swal.fire({
        title: 'Productos',
        text: this.productoModel.message[0],
        icon: 'warning',
        confirmButtonText: 'ok',
        confirmButtonColor: "#40798C"
      })     
    }
    }
  }

}
