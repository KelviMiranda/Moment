import { Component, OnInit, Input } from '@angular/core';
import { Moment } from '../../../model/moment'
import { ActivatedRoute, Router } from '@angular/router';
import { MomentService } from '../../../services/moment.service';
import { MessagesService } from '../../../services/messages.service';
@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrl: './edit-moment.component.css'
})
export class EditMomentComponent implements OnInit{

  moment!:Moment;
  numero:number = 10;
  btnText:string = "Editar";

  constructor(private route:ActivatedRoute,
              private router:Router,
              private momentService:MomentService,
              private messageService:MessagesService
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);
  }



  async editHandler(moment:Moment){
    const id = this.moment.id;
    const formData = new FormData();
    formData.set('title', moment.title);

    if(moment.image){
      formData.append('image', moment.image)
    }

    await this.momentService.updateMoment(this.moment.id!, formData).subscribe()
    this.messageService.showMessage(`O momento ${id} foi alterado com sucesso`);
    this.router.navigateByUrl('/');
  }


}
