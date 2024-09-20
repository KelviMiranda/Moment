import { Component, OnInit } from '@angular/core';
import { api } from '../../../environment/environment';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../model/moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  allMoments:Moment[] = []; // Pegar a lista do banco de dados
  moments:Moment[] = []; // Fazer o filtro com dados de usuário
  baseApiUrl:string = api;

  searchTerm:string = "r";


  constructor(private momentService:MomentService){}
  ngOnInit(): void {
    this.getmoments();
  }

  //Todo Search
  getmoments(){
    this.momentService.getMoments().subscribe(items => {
      const data = items.data;

      data.map(item => {
        item.created_at = new Date(item.created_at!).toLocaleDateString('pt-Br')
      });

      this.allMoments = data;
      this.moments= data;
    })
  }

  /* Search function  */
  search(event:Event){
      const target = event.target as HTMLInputElement;
      const value = target.value;

      this.moments = this.allMoments.filter(moment => {
        return moment.title.toLocaleLowerCase().includes(value)
      });
  }
}

