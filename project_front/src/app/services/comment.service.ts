import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../environment/environment';
import { Observable } from 'rxjs';
import { Response } from '../model/response';
import {Comment } from '../model/comment'
@Injectable({
  providedIn: 'root'
})

export class CommentService {

  private baseUrl:string = api
  private apiUrl:string = `${this.baseUrl}/api/moments`;
  constructor(private http:HttpClient) { }

  createComment(data:Comment):Observable<Response<Comment>>{
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.http.post<Response<Comment>>(url,data)
  }
}
