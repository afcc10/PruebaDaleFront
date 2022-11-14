import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { Cliente } from '../data-structures/interfaces/cliente';
import { BasicResponse } from '../data-structures/shared/basic-response';
import { ENDPOINTS } from '../utils/commons/web-constants';
import { handleError } from '../utils/helpers/error-handler';

@Injectable({
  providedIn: 'root'
})
export class ClienteApiService {

  constructor(private http: HttpClient) { }

  async getClientes() : Promise<Partial<BasicResponse<Cliente[]>>> {
    return await this.http.get<Partial<BasicResponse<Cliente[]>>>(ENDPOINTS.getClientes()).pipe(
      retry(1), 
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async registerClientes(cliente : Cliente):Promise<Partial<BasicResponse<Cliente>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(cliente);
    return await this.http.post<BasicResponse<Cliente>>(ENDPOINTS.registerClientes(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async updateClientes(cliente : Cliente):Promise<Partial<BasicResponse<Cliente>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(cliente);
    return await this.http.put<BasicResponse<Cliente>>(ENDPOINTS.updateClientes(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async getbyIdCliente(id : number): Promise<Partial<BasicResponse<Cliente>>>{    
    return await this.http.get<BasicResponse<Cliente>>(ENDPOINTS.getByIdClientes(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }

  async deleteById(id : number): Promise<Partial<BasicResponse<boolean>>>{    
    return await this.http.delete<BasicResponse<boolean>>(ENDPOINTS.deleteByIdCliente(id)).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }
}
