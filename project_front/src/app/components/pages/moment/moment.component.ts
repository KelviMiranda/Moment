import { MessagesService } from './../../../services/messages.service';
import { Component, OnInit } from '@angular/core';
import { MomentService } from '../../../services/moment.service';
import { Moment } from '../../../model/moment';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from '../../../environment/environment'
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms'
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../model/comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrl: './moment.component.css'
})

export class MomentComponent implements OnInit{

  moment?:Moment;
  baseUrl:string = api;

  commentForm!:FormGroup;
  constructor(private route:ActivatedRoute,
              private momentService:MomentService,
              private messagesService:MessagesService,
              private router:Router,
              private commentService:CommentService
  ){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.momentService.getMoment(id).subscribe(item => this.moment = item.data);

    this.commentForm = new FormGroup({
      text:new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required])
    });
  }


  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async removeHandler(moment:Moment){
    await this.momentService.remove(moment.id!).subscribe();
    this.messagesService.showMessage("Momento excluido com sucesso");
    this.router.navigateByUrl('/');
  }

   async onSubmit(formDirective:FormGroupDirective){

      if(this.commentForm.invalid){
        return
      }

      const data:Comment = this.commentForm.value;
      data.momentId = Number(this.moment!.id);

      await this.commentService.createComment(data).subscribe(comment => {
        this.moment!.comments!.push(comment.data);
      });

      this.messagesService.showMessage("Comentário adicionado com sucesso!");

      this.commentForm.reset();
      formDirective.resetForm();
  }
}
