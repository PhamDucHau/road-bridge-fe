import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { CourseListModel } from '../../dashboard/model/course-list.model';
import { environment } from 'src/app/config/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class SideLoginService { 
 
  constructor(public httpClient: HttpClient) {
  }

  public getLogin(data:any){
    const body = {
      email: data.uname,
      password: data.password
    };
    const response = this.httpClient.post<any>(`${environment.domain}/auth/login`,body);

    return response
    

    
  }


  

  


  

  

}