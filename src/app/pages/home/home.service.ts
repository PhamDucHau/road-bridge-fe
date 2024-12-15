import { Injectable } from "@angular/core";
import { CourseListModel } from "./model/course-list.model";
import { BehaviorSubject, catchError, Observable, tap, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/app/config/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class HomeService {
  // private url = 'https://elearning-be-h3lj.onrender.com'
  // private url = 'http://localhost:3000';
  private url = environment.domain

constructor(public httpClient: HttpClient, private router: Router) {
}

private sourceListDisplay =
  new BehaviorSubject<CourseListModel | null>(null);
public sourceList$: Observable<CourseListModel | null> =
  this.sourceListDisplay.asObservable();

private sourceListProminentDisplay =
  new BehaviorSubject<CourseListModel | null>(null);
public sourceListProminent$: Observable<CourseListModel | null> =
  this.sourceListProminentDisplay.asObservable();

getListProminentCourse() {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('tokens')}`
  });
  const response = this.httpClient.get<any>(`${this.url}/course/get-course-prominent`,{ headers: headers });
  return response.pipe(
    tap((res)=>{
      this.sourceListProminentDisplay.next(res.data);
    }),
    catchError((error) => {
      if (error.statusText === 'Unauthorized') {
        localStorage.clear();
        this.router.navigate(['/authentication/login']);
      }
      console.log(error.statusText);
      return throwError(() => error);
    })
  )
}

  getAllCourse() {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('tokens')}`
    });
    const response = this.httpClient.get<any>(`${this.url}/course/search-by-filter`,{ headers: headers });

    return response.pipe(
      tap((res)=>{
        // console.log('res', res)
        // this.sourceList.convertDataFromAPI(res.data);
        this.sourceListDisplay.next(res.data);
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