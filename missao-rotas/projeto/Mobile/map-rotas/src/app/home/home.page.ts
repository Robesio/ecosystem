import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { PontoDTO } from '../models/ponto.dto';
import { HttpConfigService } from '../services/http-config.service';
import { AlertController } from '@ionic/angular'; 



declare var google;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  
  pontos:PontoDTO[];
  localizacaoReferencia:any;
  pontosmeio : Array<PontoDTO>= [];
  constructor(private geolocation: Geolocation,private httpConfigService: HttpConfigService,
    public alertCtrl: AlertController) {}

    ionViewWillEnter(){ //Ao entrar ná página

      const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        zoom: 10,
        disableDefaultUI: false
      });
  
      //Obter as informações do ponto do backend
      this.httpConfigService.getLocalizacaoPontos("?id=0")
      .subscribe((resposta: PontoDTO[])=>{
  
        this.pontos = resposta;
  
        //Imprime os marcadores no mapa
        for(let i=0;i<this.pontos.length;i++){
          const localizacaoBackEnd = { lat: Number(this.pontos[i].lat), lng: Number(this.pontos[i].longi) };
          this.directionsDisplay.setMap(map);
          const marker = new google.maps.Marker({
            position: localizacaoBackEnd,
            map: map,
      
            //Titulo
            title: this.pontos[i].id,
      
            //Animção
            animation: google.maps.Animation.DROP, // BOUNCE
      
            //Icone
            //icon: 'assets/placeholder.png'
      
            
          }); 
          
        }
      for(var j = 0 ; j < this.pontos.length; j++){
        if(j != 0 && j != this.pontos.length-1){
          this.pontosmeio.push(this.pontos[j]);
        }
      }
      var estruturaPontos;
      var vetorEstruturaPontos : Array<any> = [];
      for(var i = 0; i < this.pontosmeio.length; i++){
        estruturaPontos = {
          location:{lat: Number(this.pontosmeio[i].lat),lng: Number(this.pontosmeio[i].longi)},
          stopover: true
        }
        vetorEstruturaPontos.push(estruturaPontos);
      }
      var request = {
        origin:{lat: Number(this.pontos[0].lat), lng: Number(this.pontos[0].longi)},
        destination:{lat: Number(this.pontos[this.pontos.length-1].lat), lng: Number(this.pontos[this.pontos.length-1].longi)},
        waypoints: vetorEstruturaPontos,
        optimizeWaypoints:true,
        provideRouteAlternatives: false,
        travelMode: 'DRIVING'
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
      });
      this.directionsDisplay.setMap(map);
      
      this.geolocation.getCurrentPosition().then((resp) => {
    
      // Localização do atual Latitude Longitude
      this.localizacaoReferencia = {  lat: resp.coords.latitude, lng: resp.coords.longitude};
  
        map.setCenter(this.localizacaoReferencia);
  
        const marker = new google.maps.Marker({
          position: this.localizacaoReferencia,
          map: map,
    
          //Titulo
          title: 'Localização Atual',
    
          //Animção
          animation: google.maps.Animation.BOUNCE, // BOUNCE
    
          //Icone
          icon: 'assets/placeholder.png'
    
          
        }); 
  
      }).catch((error) => {
        console.log('Error getting location', error);
      });
      //Direcao
      
    }
    traceRoute(service: any, display: any, request: any) {
      service.route(request, function (result, status) {
        if (status == 'OK') {
          display.setDirections(result);
        }
      });
    }
}
