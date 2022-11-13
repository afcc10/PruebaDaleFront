import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { Producto } from '../data-structures/interfaces/producto';
import { BasicResponse } from '../data-structures/shared/basic-response';
import { ENDPOINTS } from '../utils/commons/web-constants';
import { handleError } from '../utils/helpers/error-handler';

@Injectable({
  providedIn: 'root'
})
export class ProductoApiService {

  constructor(private http: HttpClient) { }

  async getProductos() : Promise<Partial<BasicResponse<Producto[]>>> {
    return await this.http.get<Partial<BasicResponse<Producto[]>>>(ENDPOINTS.getProductos()).pipe(
      retry(1), 
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async registerProductos(student : Producto):Promise<Partial<BasicResponse<Producto>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(student);
    return await this.http.post<BasicResponse<Producto>>(ENDPOINTS.registerProductos(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async updateProductos(cliente : Producto):Promise<Partial<BasicResponse<Producto>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(cliente);
    return await this.http.put<BasicResponse<Producto>>(ENDPOINTS.updateProductos(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async getbyIdProducto(id : number): Promise<Partial<BasicResponse<Producto>>>{    
    return await this.http.get<BasicResponse<Producto>>(ENDPOINTS.getByIdProductos(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async deleteById(id : number): Promise<Partial<BasicResponse<boolean>>>{    
    return await this.http.delete<BasicResponse<boolean>>(ENDPOINTS.deleteByIdProductos(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }
}
