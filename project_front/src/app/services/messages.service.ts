import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar:MatSnackBar) { }

  showMessage(message:string, isError:boolean = false):void{
    this.snackBar.open(message, 'x', {
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top',
      panelClass:isError ? ['msg-error']:['msg-success']
    });
  }
}
