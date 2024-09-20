import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Moment } from '../model/moment';
import { api } from '../environment/environment';
import {Response} from '../model/response'

@Injectable({
  providedIn: 'root'
})

export class MomentService {
  private baseApiUrl:string = api;
  private apiUrl:string = `${this.baseApiUrl}/api/moments`;

  constructor(private http:HttpClient) { }

  createMoment(formData:FormData):Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getMoments():Observable<Response<Moment[]>>{
    return this.http.get<Response<Moment[]>>(this.apiUrl)
  }

  getMoment(id:number):Observable<Response<Moment>>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Response<Moment>>(url);
  }

  updateMoment(id:number, formData:FormData):Observable<FormData>{
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }

  remove(id:number){
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Response<Moment>>(url);
  }
}
