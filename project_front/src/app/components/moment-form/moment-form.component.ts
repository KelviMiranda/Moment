import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Moment } from '../../model/moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrl: './moment-form.component.css'
})
export class MomentFormComponent implements OnInit{

  @Input() btnText!:string;
  @Output() onSubmit:EventEmitter<Moment> = new EventEmitter();
  @Input() momentData:Moment | null = null;
  moment!:FormGroup;

  ngOnInit():void{
    this.moment = new FormGroup({
      id:new FormControl(this.momentData? this.momentData.id: ''),
      title:new FormControl(this.momentData ? this.momentData.title : '', [Validators.required]),
      description:new FormControl(this.momentData ? this.momentData.description : '', [Validators.required]),
      image:new FormControl(this.momentData ? this.momentData.image : '', [Validators.required])
    })
  }

  get title(){
    return this.moment.get('title')!
  }

  get description(){
    return this.moment.get('description')!
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    this.moment.patchValue({image:file})
  }

  submit(){
    if(!this.moment.valid) return;
    this.onSubmit.emit(this.moment.value);
  }

}
