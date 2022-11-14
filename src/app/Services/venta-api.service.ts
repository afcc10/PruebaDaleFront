import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs';
import { Venta } from '../data-structures/interfaces/venta';
import { BasicResponse } from '../data-structures/shared/basic-response';
import { ENDPOINTS } from '../utils/commons/web-constants';
import { handleError } from '../utils/helpers/error-handler';

@Injectable({
  providedIn: 'root'
})
export class VentaApiService {

  constructor(private http: HttpClient) { }

  async registerVenta(venta : Venta):Promise<Partial<BasicResponse<Venta>>>{    
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(venta);
    return await this.http.post<BasicResponse<Venta>>(ENDPOINTS.registerVentas(),body,httpOptions).pipe(
      retry(1),
      catchError(handleError)
    ).toPromise().then(data => data);
  }
}
