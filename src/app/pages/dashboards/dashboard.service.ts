import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/app/config/environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  blogPosts: any[] = [];
  
  detailId: string = '';

  private url = environment.domain

  constructor(private http: HttpClient, private router: Router) { }
  getAllDataForm(){
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/congtrinh-diadiem`,{headers: headers });
    return response.pipe(
      tap((res)=>{
      
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }

  getAllDataNhapKho(){
   
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.http.get<any>(`${this.url}/nhap-kho`,{headers: headers });
    return response.pipe(
      tap((res)=>{
      
      }),
      catchError((error) => {
        console.log(error.statusText);
        if (error.statusText === 'Unauthorized') {
          localStorage.clear();
          this.router.navigate(['/authentication/login']);
        }
        return throwError(() => error);
      })
    )
  }
 

 

  

}