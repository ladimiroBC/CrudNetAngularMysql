//***Servicios***
/* 
1)Realizar las peticiones Http al backend
2)Reutilizar codigo
3)Comunicacion entre componentes
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

 private UrlApi = 'https://localhost:7077/';
 private GetUrlApi = 'api/comentario/';

  constructor(private http:HttpClient) { }

  getListComment():Observable<any>{
    return this.http.get(this.UrlApi+this.GetUrlApi);
  }

  deleteComment(id:number):Observable<any>{
    return this.http.delete(this.UrlApi+this.GetUrlApi+id)
  }
}
