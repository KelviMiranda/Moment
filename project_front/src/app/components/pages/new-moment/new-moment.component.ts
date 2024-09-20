import { Component, OnInit } from '@angular/core';
import { Moment } from '../../../model/moment';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrl: './new-moment.component.css'
})

export class NewMomentComponent implements OnInit {

  constructor(private momentService:MomentService,
              private messageSeervice:MessagesService,
              private router:Router
  ){};
  ngOnInit(): void {

  }

  valueText:string = 'Compartilhar'

  async createHandler(moment:Moment){
    const formData = new FormData();
    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if(moment.image){
      formData.append('image', moment.image);
    }

    //Todo ;

    //Enviar para o serviço ;
    await this.momentService.createMoment(formData).subscribe();
    //Exibir msg ;
    this.messageSeervice.showMessage("Momento adicionado com sucesso");
    //redirect ;
    this.router.navigateByUrl('/');
  }
}
