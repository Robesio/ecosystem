import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpConfigService {

  base_path = "https://projetorrw.000webhostapp.com/src/controll/routes/route.pontos.php";

  constructor(private http: HttpClient) { }

  getLocalizacaoPontos(params:string){
    console.log(this.base_path + params);
    return this.http.get(this.base_path + params);
  }
}
